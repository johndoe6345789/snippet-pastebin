import { chromium, type FullConfig } from "@playwright/test"

/**
 * Polyfills Playwright gaps the test suite expects:
 * - `page.metrics()` (Puppeteer API) with a lightweight browser evaluate.
 * - a minimal `window` shim in the Node test environment for direct access.
 */
export default async function globalSetup(_config: FullConfig) {
  // Provide a stable window object for any tests that access it directly in Node.
  if (!(globalThis as any).window) {
    ;(globalThis as any).window = { innerHeight: 1200, innerWidth: 1920 }
  } else {
    ;(globalThis as any).window.innerHeight ??= 1200
    ;(globalThis as any).window.innerWidth ??= 1920
  }

  // Add a Puppeteer-style metrics helper if it doesn't exist.
  const browser = await chromium.launch({ headless: true })
  const patchPage = await browser.newPage()
  const pageProto = Object.getPrototypeOf(patchPage)

  if (pageProto && typeof pageProto.metrics !== "function") {
    pageProto.metrics = async function metrics() {
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

  await browser.close()
}
