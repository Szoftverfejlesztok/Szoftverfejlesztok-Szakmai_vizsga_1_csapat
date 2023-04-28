import { test, expect } from "./fixtures/authenticated";

test("can log out", async ({ todoAppPage, page }) => {
    await todoAppPage.logout();

    await expect(page.getByText("Login")).toBeVisible();
});
