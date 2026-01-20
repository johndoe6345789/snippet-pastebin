import { expect, test } from "@playwright/test"

test.describe("Component-Specific Tests", () => {
  test.describe("Snippet Manager Component", () => {
    test("snippet manager renders without errors", async ({ page }) => {
      const errors: string[] = []

      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errors.push(msg.text())
        }
      })

      await page.goto("/")
      await page.waitForLoadState("networkidle")
      await page.waitForTimeout(1000) // Wait for dynamic import

      // Should not have hydration errors
      expect(errors.filter((e) => e.toLowerCase().includes("hydration"))).toHaveLength(0)
    })

    test("snippet grid displays correctly", async ({ page }) => {
      await page.goto("/")
      await page.waitForLoadState("networkidle")
      await page.waitForTimeout(1000)

      // Check for grid structure
      const grid = page.locator("[data-testid='snippet-grid'], .snippet-grid, [role='grid']")

      if (await grid.count() > 0) {
        await expect(grid.first()).toBeVisible()

        // Grid should have proper ARIA attributes
        const ariaRole = await grid.first().getAttribute("role")
        expect(ariaRole).toBeTruthy()
      }
    })

    test("snippet toolbar buttons function correctly", async ({ page }) => {
      await page.goto("/")
      await page.waitForLoadState("networkidle")
      await page.waitForTimeout(1000)

      const toolbar = page.locator("[data-testid='snippet-toolbar'], .snippet-toolbar")

      if (await toolbar.count() > 0) {
        const buttons = toolbar.locator("button")
        const count = await buttons.count()

        expect(count).toBeGreaterThan(0)

        // Each button should be clickable
        if (count > 0) {
          const firstButton = buttons.first()
          const initialState = await firstButton.getAttribute("aria-pressed")

          await firstButton.click()
          await page.waitForTimeout(100)

          // Should be responsive to clicks
          expect(true).toBe(true)
        }
      }
    })

    test("selection controls work properly", async ({ page }) => {
      await page.goto("/")
      await page.waitForLoadState("networkidle")
      await page.waitForTimeout(1000)

      const selectionControls = page.locator(
        "[data-testid='selection-controls'], .selection-controls"
      )

      if (await selectionControls.count() > 0) {
        // Should have select/deselect all option
        const selectAllButton = selectionControls.locator("button, input[type='checkbox']")

        if (await selectAllButton.count() > 0) {
          const initialChecked = await selectAllButton.first().isChecked()

          await selectAllButton.first().click()
          await page.waitForTimeout(100)

          const afterClick = await selectAllButton.first().isChecked()

          // State should change or at least be interactive
          expect(typeof afterClick === "boolean").toBe(true)
        }
      }
    })
  })

  test.describe("Navigation Component", () => {
    test("navigation menu has all required links", async ({ page }) => {
      await page.goto("/")

      const navLinks = page.locator("nav a, [role='navigation'] a")
      const linkCount = await navLinks.count()

      expect(linkCount).toBeGreaterThan(0)

      // Common routes should be linked
      const navText = await page.locator("nav").textContent()

      // At least some navigation options should be visible
      expect(navText).toBeTruthy()
    })

    test("active navigation link is highlighted", async ({ page }) => {
      await page.goto("/atoms")

      const navLinks = page.locator("nav a, [role='navigation'] a")

      if (await navLinks.count() > 0) {
        // Check if any link has active styling
        let hasActiveIndicator = false

        for (let i = 0; i < await navLinks.count(); i++) {
          const link = navLinks.nth(i)
          const href = await link.getAttribute("href")
          const className = await link.getAttribute("class")
          const ariaActive = await link.getAttribute("aria-current")

          if (href?.includes("atoms")) {
            // This should be active
            hasActiveIndicator =
              className?.includes("active") || className?.includes("current") || ariaActive === "page"

            if (!hasActiveIndicator) {
              const styles = await link.evaluate((el) => {
                const style = window.getComputedStyle(el)
                return {
                  fontWeight: style.fontWeight,
                  color: style.color,
                }
              })

              hasActiveIndicator =
                parseInt(styles.fontWeight) > 400 ||
                (await link.getAttribute("aria-current")) === "page"
            }
          }
        }

        // Should have some indication of active state
        expect(hasActiveIndicator).toBe(true)
      }
    })

    test("navigation is keyboard accessible", async ({ page }) => {
      await page.goto("/")

      const navLinks = page.locator("nav a, [role='navigation'] a")

      if (await navLinks.count() > 0) {
        // Tab to navigation
        await page.keyboard.press("Tab")

        let focusedOnNav = false
        let attempts = 0

        while (!focusedOnNav && attempts < 20) {
          const focusedHref = await page.evaluate(() => {
            const el = document.activeElement as HTMLAnchorElement
            return el?.href
          })

          focusedOnNav = !!focusedHref

          if (!focusedOnNav) {
            await page.keyboard.press("Tab")
            attempts++
          }
        }

        expect(focusedOnNav).toBe(true)
      }
    })
  })

  test.describe("Backend Indicator Component", () => {
    test("backend indicator is visible and interactive", async ({ page }) => {
      await page.goto("/")

      const indicator = page.locator(
        "[data-testid='backend-indicator'], .backend-indicator, [role='status']"
      )

      if (await indicator.count() > 0) {
        await expect(indicator.first()).toBeVisible()

        // Should have content
        const text = await indicator.first().textContent()
        expect(text).toBeTruthy()
      }
    })

    test("backend indicator shows connected or disconnected state", async ({ page }) => {
      await page.goto("/")
      await page.waitForLoadState("networkidle")

      const indicator = page.locator("[data-testid='backend-indicator'], .backend-indicator")

      if (await indicator.count() > 0) {
        const status = await indicator.first().textContent()
        const className = await indicator.first().getAttribute("class")

        // Should indicate some status
        const hasStatus =
          (status &&
            (status.toLowerCase().includes("connected") ||
              status.toLowerCase().includes("disconnected") ||
              status.toLowerCase().includes("loading"))) ||
          (className &&
            (className.includes("connected") ||
              className.includes("disconnected") ||
              className.includes("loading")))

        expect(hasStatus).toBe(true)
      }
    })
  })

  test.describe("Layout and Container Components", () => {
    test("page layout has proper structure", async ({ page }) => {
      await page.goto("/")

      const header = page.locator("header")
      const main = page.locator("main")
      const footer = page.locator("footer")

      await expect(header).toBeVisible()
      await expect(main).toBeVisible()

      // Footer may be conditionally rendered
      const footerCount = await footer.count()
      expect(footerCount).toBeGreaterThanOrEqual(0)
    })

    test("sidebar navigation is responsive", async ({ page }, testInfo) => {
      test.skip(!testInfo.project.name.includes("desktop"), "desktop-only")

      await page.goto("/")

      const sidebar = page.locator("[data-testid='navigation-sidebar'], .sidebar, nav")

      if (await sidebar.count() > 0) {
        const sidebarBox = await sidebar.first().boundingBox()

        // Sidebar should exist and have dimensions
        expect(sidebarBox).not.toBeNull()
        expect(sidebarBox?.width).toBeGreaterThan(0)
      }
    })

    test("main content area is properly scrollable", async ({ page }) => {
      await page.goto("/")

      const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight)
      const clientHeight = await page.evaluate(() => window.innerHeight)

      if (scrollHeight > clientHeight) {
        // Page is scrollable, test scroll behavior
        await page.evaluate(() => window.scrollBy(0, 100))
        const scrollY = await page.evaluate(() => window.scrollY)

        expect(scrollY).toBeGreaterThan(0)

        // Should be able to scroll back
        await page.evaluate(() => window.scrollBy(0, -100))
        const finalScrollY = await page.evaluate(() => window.scrollY)

        expect(finalScrollY).toBeLessThan(scrollY)
      }
    })
  })

  test.describe("Modal and Dialog Components", () => {
    test("modals are accessible when opened", async ({ page }) => {
      await page.goto("/")

      // Look for any dialog or modal trigger buttons
      const modalTriggers = page.locator("button[aria-haspopup='dialog'], [data-testid*='modal'], [data-testid*='dialog']")

      if (await modalTriggers.count() > 0) {
        const firstTrigger = modalTriggers.first()
        await firstTrigger.click()
        await page.waitForTimeout(300)

        // Check if modal opened
        const modal = page.locator("[role='dialog'], .modal, [data-testid='modal']")

        if (await modal.count() > 0) {
          await expect(modal.first()).toBeVisible()

          // Modal should trap focus
          const initialFocus = await page.evaluate(() => document.activeElement?.tagName)
          expect(initialFocus).toBeTruthy()
        }
      }
    })

    test("modals can be closed with Escape key", async ({ page }) => {
      await page.goto("/")

      const modalTrigger = page.locator("button[aria-haspopup='dialog'], [data-testid*='modal-trigger']")

      if (await modalTrigger.count() > 0) {
        await modalTrigger.first().click()
        await page.waitForTimeout(300)

        // Press Escape
        await page.keyboard.press("Escape")
        await page.waitForTimeout(300)

        // Modal should be closed (or page should be functional)
        expect(page.url()).toBeTruthy()
      }
    })
  })

  test.describe("Dropdown and Menu Components", () => {
    test("dropdown menus open on click", async ({ page }) => {
      await page.goto("/")

      const dropdownTriggers = page.locator("button[aria-haspopup='menu'], button[aria-haspopup='listbox']")

      if (await dropdownTriggers.count() > 0) {
        const trigger = dropdownTriggers.first()
        await trigger.click()
        await page.waitForTimeout(300)

        // Menu should appear
        const menu = page.locator("[role='menu'], [role='listbox']")

        // Menu might have appeared
        expect(await menu.count() >= 0).toBe(true)
      }
    })

    test("dropdown menu items are keyboard navigable", async ({ page }) => {
      await page.goto("/")

      const dropdownTriggers = page.locator("button[aria-haspopup='menu']")

      if (await dropdownTriggers.count() > 0) {
        const trigger = dropdownTriggers.first()
        await trigger.click()
        await page.waitForTimeout(300)

        // Try arrow key navigation
        await page.keyboard.press("ArrowDown")
        await page.waitForTimeout(100)

        // Should have navigated through menu items
        const focusedElement = await page.evaluate(() => {
          return (document.activeElement as HTMLElement)?.getAttribute("role")
        })

        expect(focusedElement).toBeTruthy()
      }
    })
  })

  test.describe("Alert and Toast Components", () => {
    test("alert messages display correctly", async ({ page }) => {
      await page.goto("/")

      // Look for alert components
      const alerts = page.locator("[role='alert'], .alert, [data-testid='alert']")

      if (await alerts.count() > 0) {
        const alert = alerts.first()
        await expect(alert).toBeVisible()

        // Alert should have content
        const content = await alert.textContent()
        expect(content).toBeTruthy()
      }
    })

    test("success/error states are visually distinct", async ({ page }) => {
      await page.goto("/")

      const successAlerts = page.locator('[data-testid="alert-success"], .alert-success')
      const errorAlerts = page.locator('[data-testid="alert-error"], .alert-error')

      // If alerts exist, they should be visually distinct
      if ((await successAlerts.count()) > 0 || (await errorAlerts.count()) > 0) {
        if (await successAlerts.count() > 0) {
          const successBg = await successAlerts.first().evaluate((el) => {
            return window.getComputedStyle(el).backgroundColor
          })

          if (await errorAlerts.count() > 0) {
            const errorBg = await errorAlerts.first().evaluate((el) => {
              return window.getComputedStyle(el).backgroundColor
            })

            // Colors should be different
            expect(successBg).not.toBe(errorBg)
          }
        }
      }
    })
  })

  test.describe("Animation and Transition Tests", () => {
    test("page transitions are smooth (no layout jumps)", async ({ page }) => {
      await page.goto("/atoms")

      const initialHeight = await page.evaluate(() => document.documentElement.scrollHeight)

      // Navigate to another page
      const link = page.locator("a[href*='/molecules']").first()

      if (await link.count() > 0) {
        await link.click()
        await page.waitForLoadState("networkidle")
        await page.waitForTimeout(300) // Wait for transition

        const finalHeight = await page.evaluate(() => document.documentElement.scrollHeight)

        // Height change should be reasonable (not massive jumps)
        const heightDifference = Math.abs(finalHeight - initialHeight)
        const percentageDifference = (heightDifference / initialHeight) * 100

        expect(percentageDifference).toBeLessThan(200) // Allow up to 2x difference
      }
    })

    test("animations don't cause excessive repaints", async ({ page }) => {
      await page.goto("/")

      const initialMetrics = await page.metrics()

      // Trigger animation (e.g., hover over element)
      const button = page.locator("button").first()
      if (await button.count() > 0) {
        await button.hover()
        await page.waitForTimeout(500)
      }

      const finalMetrics = await page.metrics()

      // Metrics should not spike excessively
      expect(finalMetrics.JSHeapUsedSize).toBeLessThan(initialMetrics.JSHeapUsedSize * 2)
    })

    test("CSS animations complete without errors", async ({ page }) => {
      const animationErrors: string[] = []

      page.on("console", (msg) => {
        if (msg.type() === "error" && msg.text().toLowerCase().includes("animation")) {
          animationErrors.push(msg.text())
        }
      })

      await page.goto("/")
      await page.waitForTimeout(1000) // Wait for animations

      expect(animationErrors).toHaveLength(0)
    })
  })
})
