// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("TS_02 - Login", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("TC_01 - can log in", async ({ page }) => {
        await page.getByLabel("Email").fill("test@example.com");
        await page.getByLabel("Password").fill("password");

        await page.getByText("Login").click();

        await expect(page.getByText("Hello Test User")).toBeVisible();
    });

    test("TC_02 - can not log in with wrong email", async ({ page }) => {
        await page.getByLabel("Email").fill("testwrong@example.com");
        await page.getByLabel("Password").fill("password");

        await page.getByText("Login").click();

        await expect(page.getByText("Failed to log in")).toBeVisible();
    });

    test("TC_03 - can not log in with wrong password", async ({ page }) => {
        await page.getByLabel("Email").fill("test@example.com");
        await page.getByLabel("Password").fill("wrongpassword");

        await page.getByText("Login").click();

        await expect(page.getByText("Failed to log in")).toBeVisible();
    });
});
