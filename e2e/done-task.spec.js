import { test, expect } from "./fixtures/authenticated";

test.beforeEach(async ({ todoAppPage }) => {
    await todoAppPage.addTask("My new task that I do");
    await todoAppPage.addTask("My new task that I won't do");
    await todoAppPage.markTaskAsDone("My new task that I won't do");
});

test("can mark task as done", async ({ todoAppPage, page }) => {
    await todoAppPage.markTaskAsDone("My new task that I do");

    await expect(
        todoAppPage.getTaskCheckbox("My new task that I do")
    ).toBeChecked();
});

test("can mark task as undone", async ({ todoAppPage, page }) => {
    await todoAppPage.markTaskAsUndone("My new task that I won't do");

    await expect(
        todoAppPage.getTaskCheckbox("My new task that I won't do")
    ).not.toBeChecked();
});
