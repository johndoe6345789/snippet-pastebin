import { expect, test } from "./fixtures"

test.describe("home page", () => {
  test("renders key sections without console errors", async ({ page }) => {
    const consoleErrors: string[] = []
    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text())
      }
    })

    await page.goto("/")

    await expect(page.getByRole("heading", { name: "My Snippets" })).toBeVisible()
    await expect(
      page.getByText("Save, organize, and share your code snippets", { exact: true })
    ).toBeVisible()
    await expect(page.locator("header")).toBeVisible()
    await expect(page.locator("main")).toBeVisible()
    await expect(page.locator("footer")).toBeVisible()

    // Filter out expected/known errors (IndexedDB, network, etc.)
    const criticalErrors = consoleErrors.filter((e) => {
      const text = e.toLowerCase()
      if (text.includes("indexeddb") || text.includes("constrainterror")) return false
      if (text.includes("failed to load") || text.includes("network")) return false
      return true
    })
    expect(criticalErrors).toEqual([])
  })

  test("stays within viewport on mobile (no horizontal overflow)", async ({ page }, testInfo) => {
    test.skip(!testInfo.project.name.includes("mobile"), "mobile-only check")

    await page.goto("/")

    const overflow = await page.evaluate(() =>
      Math.max(document.documentElement.scrollWidth - window.innerWidth, 0)
    )

    expect(overflow).toBeLessThanOrEqual(1)
    await expect(page.getByRole("heading", { name: "My Snippets" })).toBeVisible()
  })
})
