// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/#/register");
});

test("can register", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}@example.com`);
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Hello Test User")).toBeVisible();
});
