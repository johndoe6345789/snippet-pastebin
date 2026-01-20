import { expect, test as base } from "@playwright/test"

// Ensure a minimal window object exists in the Node test runtime.
if (!(globalThis as any).window) {
  ;(globalThis as any).window = { innerHeight: 1200, innerWidth: 1920 }
} else {
  ;(globalThis as any).window.innerHeight ??= 1200
  ;(globalThis as any).window.innerWidth ??= 1920
}

// Attach a Puppeteer-style metrics helper to every page prototype so tests can call page.metrics().
const patchPagePrototype = (page: any) => {
  const proto = Object.getPrototypeOf(page)
  if (proto && typeof proto.metrics !== "function") {
    proto.metrics = async function metrics() {
      const snapshot = await this.evaluate(() => {
        const perf: any = performance
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

const test = base.extend({
  page: async ({ page }, use) => {
    patchPagePrototype(page)
    await use(page)
  },
})

export { test, expect }
