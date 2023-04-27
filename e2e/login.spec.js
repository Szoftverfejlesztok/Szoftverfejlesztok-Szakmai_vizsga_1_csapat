// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/");
});

test("can log in", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("password");

    await page.getByText("Login").click();

    await expect(page.getByText("Hello Test User")).toBeVisible();
});

test("can not log in with wrong email", async ({ page }) => {
    await page.getByLabel("Email").fill("testwrong@example.com");
    await page.getByLabel("Password").fill("password");

    await page.getByText("Login").click();

    await expect(page.getByText("Failed to log in")).toBeVisible();
});

test("can not log in with wrong password", async ({ page }) => {
    await page.getByLabel("Email").fill("test@example.com");
    await page.getByLabel("Password").fill("wrongpassword");

    await page.getByText("Login").click();

    await expect(page.getByText("Failed to log in")).toBeVisible();
});
