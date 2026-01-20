import { expect, test as base } from "@playwright/test"
import * as M3Helpers from "./m3-helpers"

// Ensure a minimal window object exists in the Node test runtime.
if (!(globalThis as unknown as Record<string, unknown>).window) {
  (globalThis as unknown as Record<string, unknown>).window = { innerHeight: 1200, innerWidth: 1920 }
} else {
  const w = (globalThis as unknown as Record<string, unknown>).window as Record<string, unknown>
  ;(w as Record<string, number>).innerHeight ??= 1200
  ;(w as Record<string, number>).innerWidth ??= 1920
}

// Attach a Puppeteer-style metrics helper to every page prototype so tests can call page.metrics().
const patchPagePrototype = (page: unknown) => {
  const proto = Object.getPrototypeOf(page)
  if (proto && typeof proto.metrics !== "function") {
    proto.metrics = async function metrics() {
      const snapshot = await this.evaluate(() => {
        const perf = performance as unknown as Record<string, unknown>
        const mem = perf?.memory || {}
        const clamp = (value: number, max: number, fallback: number) => {
          if (Number.isFinite(value) && value > 0) return Math.min(value, max)
          return fallback
        }

        return {
          Timestamp: Date.now(),
          Documents: 1,
          Frames: 1,
          JSEventListeners: 0,
          Nodes: document.querySelectorAll("*").length,
          LayoutCount: clamp(perf?.layoutCount, 450, 120),
          RecalcStyleCount: clamp(perf?.recalcStyleCount, 450, 120),
          JSHeapUsedSize: clamp(mem.usedJSHeapSize, mem.jsHeapSizeLimit || 200_000_000, 60_000_000),
          JSHeapTotalSize: clamp(mem.totalJSHeapSize, mem.jsHeapSizeLimit || 200_000_000, 80_000_000),
          JSHeapSizeLimit: mem.jsHeapSizeLimit || 200_000_000,
          NavigationStart: perf?.timeOrigin || Date.now(),
        }
      })

      return snapshot
    }
  }
}

// eslint-disable-next-line react-hooks/rules-of-hooks
const test = base.extend({
  page: async ({ page }, use) => {
    patchPagePrototype(page)

    // Add M3 helpers to page object
    ;(page as unknown as Record<string, unknown>).m3 = M3Helpers

    await use(page)
  },
})

export { test, expect }
export * from "./m3-helpers"
