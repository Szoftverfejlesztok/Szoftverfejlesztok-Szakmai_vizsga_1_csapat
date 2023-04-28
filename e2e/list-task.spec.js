import { test, expect } from "./fixtures/authenticated";

test.beforeEach(async ({ todoAppPage }) => {
    await todoAppPage.addTask("My new task that I did");
    await todoAppPage.markTaskAsDone("My new task that I did");
    await todoAppPage.addTask("My new task that I won't do");
});

test("can list tasks", async ({ todoAppPage, page }) => {
    await expect(page.getByText("My new task that I did")).toBeVisible();
    await expect(
        todoAppPage.getTaskCheckbox("My new task that I did")
    ).toBeChecked();

    await expect(page.getByText("My new task that I won't do")).toBeVisible();
    await expect(
        todoAppPage.getTaskCheckbox("My new task that I won't do")
    ).not.toBeChecked();
});
