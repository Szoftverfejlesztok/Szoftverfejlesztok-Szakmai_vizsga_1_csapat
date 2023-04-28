import { test, expect } from "./fixtures/authenticated";

test("can delete task", async ({ todoAppPage, page }) => {
    await todoAppPage.addTask("My new task that I will delete");

    await page
        .locator("div", {
            has: page.getByText("My new task that I will delete"),
        })
        .getByRole("button")
        .getByText("Delete")
        .click();

    await expect(
        page.getByText("My new task that I will delete")
    ).not.toBeVisible();
});
