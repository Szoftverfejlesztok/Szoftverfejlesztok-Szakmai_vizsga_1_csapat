// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
    await page.goto("/#/register");
});

test("can register", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}1@example.com`);
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Hello Test User")).toBeVisible();
});

test("can not register without name", async ({ page }, testInfo) => {
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}2@example.com`);
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});

test("can not register without email", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});

test("can not register without password", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}3@example.com`);
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});

test("can not register with weak password", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}4@example.com`);
    await page.getByLabel("Password", { exact: true }).fill("p");
    await page.getByLabel("Password confirmation", { exact: true }).fill("p");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});

test("can not register with mismatching password", async ({
    page,
}, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}5@example.com`);
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("otherpassword");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});

test.skip("can not register with wrong email", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page
        .getByLabel("Email")
        .fill(`test_playwright_${testInfo.project.name}6`);
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});

test("can not register with registered email", async ({ page }, testInfo) => {
    await page.getByLabel("Name").fill("Test User");
    await page.getByLabel("Email").fill(`test@example.com`);
    await page.getByLabel("Password", { exact: true }).fill("password");
    await page
        .getByLabel("Password confirmation", { exact: true })
        .fill("password");

    await page.getByText("Register").click();

    await expect(page.getByText("Failed to register")).toBeVisible();
});
