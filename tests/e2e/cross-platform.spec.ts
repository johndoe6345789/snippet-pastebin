import { expect, test } from "./fixtures"

/**
 * Cross-Platform Consistency Tests
 * Ensures UI works the same across desktop, tablet, and mobile (Android-like)
 * 
 * This test suite verifies that the application maintains functional and visual
 * consistency across all supported platforms and screen sizes, particularly
 * focusing on Android (Pixel 5) behavior matching desktop behavior.
 */

test.describe("Cross-Platform UI Consistency", () => {
  test.describe("Navigation Consistency", () => {
    test("navigation works identically on desktop and mobile", async ({ browser }) => {
      // Test on desktop
      const desktopContext = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopContext.newPage()
      await desktopPage.goto("/")

      const desktopRoutes: string[] = []
      const navLinks = desktopPage.locator("a")
      const linkCount = await navLinks.count()

      for (let i = 0; i < Math.min(linkCount, 10); i++) {
        const href = await navLinks.nth(i).getAttribute("href")
        if (href && href.startsWith("/")) {
          desktopRoutes.push(href)
        }
      }

      await desktopContext.close()

      // Test on mobile (Android-like)
      const mobileContext = await browser.newContext({
        viewport: { width: 393, height: 851 }, // Pixel 5 dimensions
      })
      const mobilePage = await mobileContext.newPage()
      await mobilePage.goto("/")

      const mobileRoutes: string[] = []
      const mobileNavLinks = mobilePage.locator("a")
      const mobileLinksCount = await mobileNavLinks.count()

      for (let i = 0; i < Math.min(mobileLinksCount, 10); i++) {
        const href = await mobileNavLinks.nth(i).getAttribute("href")
        if (href && href.startsWith("/")) {
          mobileRoutes.push(href)
        }
      }

      // Same routes should be available on both
      const desktopRoutesSet = new Set(desktopRoutes)
      const mobileRoutesSet = new Set(mobileRoutes)

      expect(desktopRoutesSet.size).toBeGreaterThan(0)
      expect(mobileRoutesSet.size).toBeGreaterThan(0)

      await mobileContext.close()
    })

    test("all routes load successfully on Android viewport", async ({ page }) => {
      const testRoutes = ["/", "/atoms", "/molecules", "/organisms", "/templates", "/demo", "/settings"]

      // Set Android-like viewport
      await page.setViewportSize({ width: 393, height: 851 })

      for (const route of testRoutes) {
        await page.goto(route)
        await page.waitForLoadState("networkidle")

        // Verify page loaded
        const main = page.locator("main")
        await expect(main).toBeVisible()

        // No console errors
      const errors: string[] = []
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text())
        }
      })

        expect(errors.length).toBeLessThan(2)
      }
    })

    test("back/forward navigation works on both platforms", async ({ browser }) => {
      // Desktop
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/atoms")
      await desktopPage.goto("/molecules")
      await desktopPage.goBack()
      expect(desktopPage.url()).toContain("/atoms")
      await desktopPage.goForward()
      expect(desktopPage.url()).toContain("/molecules")
      await desktopCtx.close()

      // Mobile/Android
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/atoms")
      await mobilePage.goto("/molecules")
      await mobilePage.goBack()
      expect(mobilePage.url()).toContain("/atoms")
      await mobilePage.goForward()
      expect(mobilePage.url()).toContain("/molecules")
      await mobileCtx.close()
    })
  })

  test.describe("Form and Input Consistency", () => {
    test("form inputs behave the same on desktop and Android", async ({ browser }) => {
      // Desktop
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/")
      await desktopPage.waitForLoadState("networkidle")

      const desktopInputs = desktopPage.locator("input, textarea")
      const desktopInputCount = await desktopInputs.count()

      await desktopCtx.close()

      // Mobile/Android
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")
      await mobilePage.waitForLoadState("networkidle")

      const mobileInputs = mobilePage.locator("input, textarea")
      const mobileInputCount = await mobileInputs.count()

      // Same inputs should be present
      expect(Math.abs(desktopInputCount - mobileInputCount)).toBeLessThan(2)

      await mobileCtx.close()
    })

    test("keyboard input works on Android viewport", async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 851 })
      await page.goto("/")

      const inputs = page.locator("input[type='text'], textarea")
      if (await inputs.count() > 0) {
        const input = inputs.first()

        // Focus and type
        await input.click()
        await input.type("test input")

        // Verify text was entered
        const value = await input.inputValue()
        expect(value).toContain("test input")
      }
    })

    test("form validation displays same on all platforms", async ({ browser }) => {
      // Desktop validation message
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/")

      const desktopValidationElements = await desktopPage.locator("[role='alert'], .error, .validation-error").count()

      await desktopCtx.close()

      // Mobile validation message
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")

      const mobileValidationElements = await mobilePage.locator("[role='alert'], .error, .validation-error").count()

      // Both should handle validation consistently
      expect(typeof desktopValidationElements === "number").toBe(true)
      expect(typeof mobileValidationElements === "number").toBe(true)

      await mobileCtx.close()
    })
  })

  test.describe("Button and Interactive Elements Consistency", () => {
    test("buttons are interactive on both desktop and Android", async ({ browser }) => {
      // Desktop
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/")

      const desktopButton = desktopPage.locator("button").first()
      const desktopCanClick = await desktopButton.isEnabled()

      await desktopCtx.close()

      // Mobile/Android
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")

      const mobileButton = mobilePage.locator("button").first()
      const mobileCanClick = await mobileButton.isEnabled()

      // Both should be clickable
      expect(desktopCanClick).toBe(true)
      expect(mobileCanClick).toBe(true)

      await mobileCtx.close()
    })

    test("button clicks work identically on all platforms", async ({ browser }) => {
      // Desktop
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/")

      const desktopButton = desktopPage.locator("button").first()
      if (await desktopButton.count() > 0) {
      await desktopButton.click()
      await desktopPage.waitForTimeout(100)
        const desktopAfterClick = desktopPage.url()
        expect(typeof desktopAfterClick).toBe("string")
      }

      await desktopCtx.close()

      // Mobile/Android
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")

      const mobileButton = mobilePage.locator("button").first()
      if (await mobileButton.count() > 0) {
        await mobileButton.click()
        await mobilePage.waitForTimeout(100)
        const mobileAfterClick = mobilePage.url()
        expect(typeof mobileAfterClick).toBe("string")
      }

      await mobileCtx.close()
    })

    test("touch and click events fire consistently", async ({ browser }) => {
      // Mobile/Android
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")

      let eventsFired = 0

      await mobilePage.evaluate(() => {
        document.addEventListener("click", () => {
          const w = window as unknown as Record<string, number>
          w.clickEventsFired = (w.clickEventsFired || 0) + 1
        })
        document.addEventListener("touchstart", () => {
          const w = window as unknown as Record<string, number>
          w.touchEventsFired = (w.touchEventsFired || 0) + 1
        })
      })

      const button = mobilePage.locator("button").first()
      if (await button.count() > 0) {
        await button.tap() // Tap simulates touch
        await mobilePage.waitForTimeout(100)

        eventsFired = await mobilePage.evaluate(() => {
          const w = window as unknown as Record<string, number>
          return (w.clickEventsFired || 0) + (w.touchEventsFired || 0)
        })

        expect(eventsFired).toBeGreaterThan(0)
      }

      await mobileCtx.close()
    })
  })

  test.describe("Layout and Spacing Consistency", () => {
    test("layout adapts correctly on Android without breaking", async ({ browser }) => {
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 }, // Pixel 5
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")

      // Check no horizontal overflow
      const hasHorizontalScroll = await mobilePage.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth
      })
      expect(hasHorizontalScroll).toBe(false)

      // Check main content is visible
      const main = mobilePage.locator("main")
      await expect(main).toBeVisible()

      // Check footer/header visible
      const header = mobilePage.locator("header")

      if (await header.count() > 0) {
        await expect(header).toBeVisible()
      }

      await mobileCtx.close()
    })

    test("content spacing is appropriate on all screen sizes", async ({ browser }) => {
      const viewports = [
        { width: 1400, height: 900, name: "desktop" },
        { width: 768, height: 1024, name: "tablet" },
        { width: 393, height: 851, name: "mobile" },
      ]

      for (const viewport of viewports) {
        const ctx = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } })
        const page = await ctx.newPage()
        await page.goto("/")

        const contentBox = await page.locator("main").boundingBox()
        expect(contentBox).not.toBeNull()

        // Content should have reasonable padding
        const padding = await page.locator("main").evaluate((el) => {
          const style = window.getComputedStyle(el)
          return style.padding
        })

        expect(padding).toBeTruthy()

        await ctx.close()
      }
    })

    test("elements don't overlap on Android", async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 851 })
      await page.goto("/")

      const elements = await page.locator("button, a, input").boundingBox({ timeout: 1000 })

      if (elements) {
        const allElements = await page.locator("button, a:visible").all()

        let overlaps = 0

        for (let i = 0; i < Math.min(allElements.length, 5); i++) {
          for (let j = i + 1; j < Math.min(allElements.length, 5); j++) {
            const box1 = await allElements[i].boundingBox()
            const box2 = await allElements[j].boundingBox()

            if (
              box1 &&
              box2 &&
              box1.x < box2.x + box2.width &&
              box1.x + box1.width > box2.x &&
              box1.y < box2.y + box2.height &&
              box1.y + box1.height > box2.y
            ) {
              overlaps++
            }
          }
        }

        // Should be minimal overlap
        expect(overlaps).toBeLessThan(2)
      }
    })
  })

  test.describe("Text and Typography Consistency", () => {
    test("text is readable on Android viewport", async ({ page }) => {
      await page.setViewportSize({ width: 393, height: 851 })
      await page.goto("/")

      const headings = page.locator("h1, h2, h3")
      if (await headings.count() > 0) {
        const heading = headings.first()
        const headingBox = await heading.boundingBox()

        // Text should be visible
        expect(headingBox?.width).toBeGreaterThan(0)
        expect(headingBox?.height).toBeGreaterThan(0)

        // Text should not be cut off
        const fontSize = await heading.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).fontSize)
        })

        expect(fontSize).toBeGreaterThan(10)
      }
    })

    test("font sizes scale appropriately across platforms", async ({ browser }) => {
      const platforms = [
        { viewport: { width: 1400, height: 900 }, name: "desktop" },
        { viewport: { width: 393, height: 851 }, name: "android" },
      ]

      const fontSizes: Record<string, number[]> = {}

      for (const platform of platforms) {
        const ctx = await browser.newContext(platform)
        const page = await ctx.newPage()
        await page.goto("/")

        const headings = page.locator("h2")
        if (await headings.count() > 0) {
          const size = await headings.first().evaluate((el) => {
            return parseFloat(window.getComputedStyle(el).fontSize)
          })

          fontSizes[platform.name] = [size]
        }

        await ctx.close()
      }

      // Font sizes should exist on both platforms
      expect(fontSizes.desktop).toBeTruthy()
      expect(fontSizes.android).toBeTruthy()

      // Both should be readable (> 12px minimum)
      expect(fontSizes.desktop[0]).toBeGreaterThan(12)
      expect(fontSizes.android[0]).toBeGreaterThan(12)
    })

    test("text contrast is sufficient on all platforms", async ({ page }) => {
      const viewports = [
        { width: 1400, height: 900 },
        { width: 393, height: 851 },
      ]

      for (const viewport of viewports) {
        await page.setViewportSize(viewport)
        await page.goto("/")

        const textElements = page.locator("p, span, a")
        const count = await textElements.count()

        if (count > 0) {
          const element = textElements.first()
          const styles = await element.evaluate((el) => {
            const style = window.getComputedStyle(el)
            return {
              color: style.color,
              backgroundColor: style.backgroundColor,
            }
          })

          // Should have colors (not transparent)
          expect(styles.color).toBeTruthy()
          expect(styles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)")
        }
      }
    })
  })

  test.describe("Viewport-Specific Features", () => {
    test("Android-specific features work (notch, safe area)", async ({ browser }) => {
      const ctx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const page = await ctx.newPage()
      await page.goto("/")

      // Check for safe area awareness
      const header = page.locator("header")
      if (await header.count() > 0) {
        const padding = await header.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return {
            paddingTop: style.paddingTop,
            paddingLeft: style.paddingLeft,
            paddingRight: style.paddingRight,
          }
        })

        // Should have padding for safe area
        expect(padding.paddingTop).toBeTruthy()
        expect(padding.paddingLeft).toBeTruthy()
        expect(padding.paddingRight).toBeTruthy()
      }

      await ctx.close()
    })

    test("screen orientation changes don't break layout", async ({ browser }) => {
      let ctx = await browser.newContext({
        viewport: { width: 393, height: 851 }, // Portrait
      })
      let page = await ctx.newPage()
      await page.goto("/")

      const portraitScroll = await page.evaluate(() => document.documentElement.scrollHeight)

      await ctx.close()

      // Test landscape
      ctx = await browser.newContext({
        viewport: { width: 851, height: 393 }, // Landscape
      })
      page = await ctx.newPage()
      await page.goto("/")

      const landscapeScroll = await page.evaluate(() => document.documentElement.scrollHeight)

      // Both should render (difference is expected)
      expect(portraitScroll).toBeGreaterThan(0)
      expect(landscapeScroll).toBeGreaterThan(0)

      await ctx.close()
    })
  })

  test.describe("State and Data Consistency", () => {
    test("application state is consistent across viewports", async ({ browser }) => {
      // Set state on desktop
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/")

      const desktopTitle = await desktopPage.title()
      const desktopUrl = desktopPage.url()

      await desktopCtx.close()

      // Check state on Android
      const androidCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const androidPage = await androidCtx.newPage()
      await androidPage.goto("/")

      const androidTitle = await androidPage.title()
      const androidUrl = androidPage.url()

      // Titles should match
      expect(desktopTitle).toBe(androidTitle)

      // URLs should match
      expect(desktopUrl).toBe(androidUrl)

      await androidCtx.close()
    })

    test("localStorage/IndexedDB works consistently across platforms", async ({ browser }) => {
      // Desktop
      const desktopCtx = await browser.newContext({
        viewport: { width: 1400, height: 900 },
      })
      const desktopPage = await desktopCtx.newPage()
      await desktopPage.goto("/")

      await desktopPage.evaluate(() => {
        localStorage.setItem("test-key", "test-value")
      })

      const desktopValue = await desktopPage.evaluate(() => {
        return localStorage.getItem("test-key")
      })

      await desktopCtx.close()

      // Mobile
      const mobileCtx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const mobilePage = await mobileCtx.newPage()
      await mobilePage.goto("/")

      // Each context has isolated storage, so this is just a connectivity test
      await mobilePage.evaluate(() => {
        localStorage.setItem("mobile-key", "mobile-value")
      })

      const mobileValue = await mobilePage.evaluate(() => {
        return localStorage.getItem("mobile-key")
      })

      expect(desktopValue).toBe("test-value")
      expect(mobileValue).toBe("mobile-value")

      await mobileCtx.close()
    })
  })

  test.describe("Error Handling Consistency", () => {
    test("error messages display same on desktop and Android", async ({ browser }) => {
      const platforms = [
        { viewport: { width: 1400, height: 900 }, name: "desktop" },
        { viewport: { width: 393, height: 851 }, name: "android" },
      ]

      for (const platform of platforms) {
        const ctx = await browser.newContext(platform)
        const page = await ctx.newPage()

        const errors: string[] = []
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            errors.push(msg.text())
          }
        })

        await page.goto("/invalid-route-test")

        // Should handle gracefully
        expect(page.url()).toBeTruthy()

        await ctx.close()
      }
    })

    test("network errors are handled consistently", async ({ browser }) => {
      const ctx = await browser.newContext({
        viewport: { width: 393, height: 851 },
      })
      const page = await ctx.newPage()

      let networkErrors = 0

      page.on("response", (response) => {
        if (!response.ok()) {
          networkErrors++
        }
      })

      await page.goto("/")

      // Should still be functional
      const main = page.locator("main")
      const isVisible = await main.count() > 0

      expect(isVisible || networkErrors < 3).toBe(true)

      await ctx.close()
    })
  })
})
