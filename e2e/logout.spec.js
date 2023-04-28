import { test, expect } from "./fixtures/authenticated";

test.describe("TS_07 - Logout", () => {
    test("can log out", async ({ todoAppPage, page }) => {
        await todoAppPage.logout();

        await expect(page.getByText("Login")).toBeVisible();
    });
});
