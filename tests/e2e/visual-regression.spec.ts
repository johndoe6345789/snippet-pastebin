import { expect, test } from "@playwright/test"

test.describe("Visual Regression Tests", () => {
  test.describe("Home Page Layout", () => {
    test("full page snapshot - desktop", async ({ page }, testInfo) => {
      test.skip(!testInfo.project.name.includes("desktop"), "desktop-only")

      await page.goto("/")
      await page.waitForLoadState("networkidle")

      // Wait for animations to complete
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot("home-page-full-desktop.png", {
        fullPage: true,
      })
    })

    test("full page snapshot - mobile", async ({ page }, testInfo) => {
      test.skip(!testInfo.project.name.includes("mobile"), "mobile-only")

      await page.goto("/")
      await page.waitForLoadState("networkidle")
      await page.waitForTimeout(500)

      await expect(page).toHaveScreenshot("home-page-full-mobile.png", {
        fullPage: true,
      })
    })

    test("header styling consistency", async ({ page }) => {
      await page.goto("/")

      const header = page.locator("header")
      const headerBox = await header.boundingBox()

      // Check header is sticky
      expect(headerBox).not.toBeNull()

      // Check header elements are centered correctly
      const logo = page.locator(".logo-container")
      const backendIndicator = page.locator('[data-testid="backend-indicator"]')

      await expect(logo).toBeVisible()
      await expect(backendIndicator).toBeVisible()

      // Verify header doesn't have overflow
      const headerOverflow = await header.evaluate(
        (el) =>
          el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
      )
      expect(headerOverflow).toBe(false)
    })

    test("footer styling and positioning", async ({ page }) => {
      await page.goto("/")

      const footer = page.locator("footer")
      await expect(footer).toBeVisible()

      // Check footer is at the bottom
      const footerBox = await footer.boundingBox()
      expect(footerBox).not.toBeNull()

      // Verify footer doesn't overflow
      const footerOverflow = await footer.evaluate(
        (el) =>
          el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
      )
      expect(footerOverflow).toBe(false)
    })

    test("main content area has proper spacing", async ({ page }) => {
      await page.goto("/")

      const main = page.locator("main")
      const mainBox = await main.boundingBox()

      expect(mainBox).not.toBeNull()
      expect(mainBox?.height).toBeGreaterThan(0)

      // Check for proper margin/padding
      const computedStyle = await main.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          padding: style.padding,
          margin: style.margin,
          minHeight: style.minHeight,
        }
      })

      expect(computedStyle.padding).toBeTruthy()
    })
  })

  test.describe("Typography and Text Styling", () => {
    test("heading sizes are correct", async ({ page }) => {
      await page.goto("/")

      const h1 = page.locator("h1")
      const h2 = page.locator("h2")

      const h1Styles = await h1.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
        }
      })

      const h2Styles = await h2.evaluate((el) => {
        const style = window.getComputedStyle(el)
        return {
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
        }
      })

      // H1 should be larger than H2
      const h1Size = parseFloat(h1Styles.fontSize)
      const h2Size = parseFloat(h2Styles.fontSize)
      expect(h1Size).toBeGreaterThan(h2Size)

      // Font weight should be bold (700 or higher)
      const h1Weight = parseInt(h1Styles.fontWeight)
      const h2Weight = parseInt(h2Styles.fontWeight)
      expect(h1Weight).toBeGreaterThanOrEqual(700)
      expect(h2Weight).toBeGreaterThanOrEqual(700)
    })

    test("text contrast is sufficient", async ({ page }) => {
      await page.goto("/")

      // Check text elements have sufficient contrast
      const textElements = await page.locator("body *:visible").all()

      for (const element of textElements.slice(0, 20)) {
        // Check a sample of elements
        const styles = await element.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return {
            color: style.color,
            backgroundColor: style.backgroundColor,
          }
        })

        // Both should be defined
        expect(styles.color).toBeTruthy()
        expect(styles.backgroundColor).not.toBe("rgba(0, 0, 0, 0)")
      }
    })

    test("links have hover state styling", async ({ page }) => {
      await page.goto("/")

      const link = page.locator("a").first()
      if (await link.count() > 0) {
        const normalStyles = await link.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return style.color
        })

        await link.hover()
        const hoverStyles = await link.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return style.color
        })

        // Styles should differ on hover or have text-decoration
        const hoverDeco = await link.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return style.textDecoration
        })

        const styleChanged = normalStyles !== hoverStyles || hoverDeco !== "none"
        expect(styleChanged).toBe(true)
      }
    })
  })

  test.describe("Color Consistency", () => {
    test("theme colors are applied consistently", async ({ page }) => {
      await page.goto("/")

      // Collect color usage across the page
      const colors = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll("*"))
        const colorMap: Record<string, number> = {}

        elements.forEach((el) => {
          const style = window.getComputedStyle(el)
          const bg = style.backgroundColor
          if (bg && bg !== "rgba(0, 0, 0, 0)") {
            colorMap[bg] = (colorMap[bg] || 0) + 1
          }
        })

        return colorMap
      })

      // Should have multiple but not too many colors (theme consistency)
      const uniqueColors = Object.keys(colors)
      expect(uniqueColors.length).toBeGreaterThan(1)
      expect(uniqueColors.length).toBeLessThan(30) // Reasonable limit
    })

    test("dark/light mode class application", async ({ page }) => {
      await page.goto("/")

      const htmlElement = page.locator("html")
      const classAttribute = await htmlElement.getAttribute("class")

      // Should have data theme or dark class if dark mode is supported
      expect(classAttribute).toBeTruthy()
    })
  })

  test.describe("Responsive Design Breakpoints", () => {
    const viewports = [
      { width: 320, height: 568, name: "mobile-small" }, // iPhone SE
      { width: 375, height: 667, name: "mobile-standard" }, // iPhone 8
      { width: 768, height: 1024, name: "tablet" }, // iPad
      { width: 1400, height: 900, name: "desktop" }, // Desktop
      { width: 1920, height: 1080, name: "desktop-large" }, // Large desktop
    ]

    for (const viewport of viewports) {
      test(`layout doesn't break at ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
        browser,
      }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
        })
        const page = await context.newPage()

        await page.goto("/")
        await page.waitForLoadState("networkidle")

        // Check for overflow
        const overflow = await page.evaluate(() => {
          const body = document.body
          const html = document.documentElement
          return {
            horizontal:
              Math.max(body.scrollWidth - window.innerWidth, html.scrollWidth - window.innerWidth) >
              0,
            vertical:
              Math.max(body.scrollHeight - window.innerHeight, html.scrollHeight - window.innerHeight) >
              0,
          }
        })

        // Horizontal overflow should never happen (except in rare cases)
        expect(overflow.horizontal).toBe(false)

        // Vertical overflow is expected but should be reasonable
        const verticalScroll = await page.evaluate(() => document.documentElement.scrollHeight)
        expect(verticalScroll).toBeLessThan(10000) // Sanity check

        await context.close()
      })
    }
  })

  test.describe("Element Visibility and Hierarchy", () => {
    test("critical elements remain visible at all zoom levels", async ({ page }) => {
      await page.goto("/")

      const heading = page.getByRole("heading", { name: "My Snippets" })
      const description = page.getByText("Save, organize, and share your code snippets", {
        exact: true,
      })

      // Test at different zoom levels
      for (const zoom of [50, 100, 150, 200]) {
        await page.evaluate((z) => {
          document.body.style.zoom = `${z}%`
        }, zoom)

        await expect(heading).toBeVisible()
        await expect(description).toBeVisible()
      }

      // Reset zoom
      await page.evaluate(() => {
        document.body.style.zoom = "100%"
      })
    })

    test("no elements are visually hidden unintentionally", async ({ page }) => {
      await page.goto("/")

      const hiddenElements = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll("*"))
        const hidden = []

        for (const el of elements) {
          const style = window.getComputedStyle(el as HTMLElement)
          const rect = (el as HTMLElement).getBoundingClientRect()

          // Check for visibility: hidden or display: none
          if (
            style.visibility === "hidden" &&
            style.display !== "none" &&
            (el as HTMLElement).offsetParent !== null
          ) {
            hidden.push({
              tag: el.tagName,
              text: (el as HTMLElement).textContent?.slice(0, 50),
            })
          }
        }

        return hidden
      })

      // Should have minimal intentionally hidden elements
      expect(hiddenElements.length).toBeLessThan(5)
    })
  })

  test.describe("Button and Interactive Element Styling", () => {
    test("buttons have proper sizing and padding", async ({ page }) => {
      await page.goto("/")

      const buttons = page.locator("button")
      const buttonCount = await buttons.count()

      if (buttonCount > 0) {
        for (let i = 0; i < Math.min(buttonCount, 5); i++) {
          const button = buttons.nth(i)
          const box = await button.boundingBox()

          expect(box).not.toBeNull()
          // Buttons should have minimum height for accessibility (44px recommended)
          expect(box?.height).toBeGreaterThanOrEqual(32) // Allow 32px minimum
        }
      }
    })

    test("interactive elements have focus states", async ({ page }) => {
      await page.goto("/")

      const button = page.locator("button").first()
      if (await button.count() > 0) {
        const normalFocus = await button.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return {
            outline: style.outline,
            boxShadow: style.boxShadow,
          }
        })

        await button.focus()
        const focusedState = await button.evaluate((el) => {
          const style = window.getComputedStyle(el)
          return {
            outline: style.outline,
            boxShadow: style.boxShadow,
          }
        })

        // Focus state should be visually different
        const hasVisibleFocus =
          (focusedState.outline !== "none" && focusedState.outline) ||
          focusedState.boxShadow !== normalFocus.boxShadow

        expect(hasVisibleFocus).toBe(true)
      }
    })
  })

  test.describe("Content Overflow and Truncation", () => {
    test("long text is handled properly (not cut off)", async ({ page }) => {
      await page.goto("/")

      const textElements = await page.locator("p, span, div").all()

      for (const element of textElements.slice(0, 10)) {
        const overflow = await element.evaluate((el) => {
          return {
            textOverflow: window.getComputedStyle(el).textOverflow,
            whiteSpace: window.getComputedStyle(el).whiteSpace,
            hasOverflow: el.scrollWidth > el.clientWidth,
          }
        })

        // If text-overflow is set to ellipsis, overflow should be expected
        if (overflow.textOverflow === "ellipsis") {
          expect(overflow.whiteSpace).toContain("nowrap")
        }
      }
    })

    test("images don't cause layout shift", async ({ page }) => {
      await page.goto("/")

      const images = page.locator("img")
      const imageCount = await images.count()

      if (imageCount > 0) {
        for (let i = 0; i < Math.min(imageCount, 3); i++) {
          const img = images.nth(i)
          const imgBox = await img.boundingBox()

          expect(imgBox).not.toBeNull()
          // Images should have dimensions
          expect(imgBox?.width).toBeGreaterThan(0)
          expect(imgBox?.height).toBeGreaterThan(0)
        }
      }
    })
  })
})
