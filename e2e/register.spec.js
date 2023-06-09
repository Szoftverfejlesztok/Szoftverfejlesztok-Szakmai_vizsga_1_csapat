// @ts-check
const { test, expect } = require("@playwright/test");

test.describe("TS_01 - Registration", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/#/register");
    });

    test("TC_01 - can register", async ({ page }, testInfo) => {
        await page.getByLabel("Name").fill("Test User");
        await page
            .getByLabel("Email")
            .fill(`test_playwright_${testInfo.project.name}1@example.com`);
        await page.getByLabel("Password", { exact: true }).fill("password");
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Hello Test User")).toBeVisible();
    });

    test("TC_02 - can not register without name", async ({
        page,
    }, testInfo) => {
        await page
            .getByLabel("Email")
            .fill(`test_playwright_${testInfo.project.name}2@example.com`);
        await page.getByLabel("Password", { exact: true }).fill("password");
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });

    test("TC_03 - can not register without email", async ({ page }) => {
        await page.getByLabel("Name").fill("Test User");
        await page.getByLabel("Password", { exact: true }).fill("password");
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });

    test("TC_04 - can not register without password", async ({
        page,
    }, testInfo) => {
        await page.getByLabel("Name").fill("Test User");
        await page
            .getByLabel("Email")
            .fill(`test_playwright_${testInfo.project.name}3@example.com`);
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });

    test("TC_05 - can not register with wrong email", async ({
        page,
    }, testInfo) => {
        await page.getByLabel("Name").fill("Test User");
        await page
            .getByLabel("Email")
            .fill(`test_playwright_${testInfo.project.name}6`);
        await page.getByLabel("Password", { exact: true }).fill("password");
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });

    test("TC_06 - can not register with weak password", async ({
        page,
    }, testInfo) => {
        await page.getByLabel("Name").fill("Test User");
        await page
            .getByLabel("Email")
            .fill(`test_playwright_${testInfo.project.name}4@example.com`);
        await page.getByLabel("Password", { exact: true }).fill("p");
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("p");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });

    test("TC_07 - can not register with mismatching password", async ({
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

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });

    test("TC_08 - can not register with registered email", async ({ page }) => {
        await page.getByLabel("Name").fill("Test User");
        await page.getByLabel("Email").fill(`test@example.com`);
        await page.getByLabel("Password", { exact: true }).fill("password");
        await page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await page.getByText("Register", { exact: true }).click();

        await expect(page.getByText("Failed to register")).toBeVisible();
    });
});
