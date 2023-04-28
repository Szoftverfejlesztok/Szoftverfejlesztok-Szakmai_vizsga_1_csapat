import { test, expect } from "./fixtures/authenticated";

test.describe("TS_05 - Done tasks", () => {
    test.beforeEach(async ({ todoAppPage }) => {
        await todoAppPage.addTask("My new task that I do");
        await todoAppPage.addTask("My new task that I won't do");
        await todoAppPage.markTaskAsDone("My new task that I won't do");
    });

    test("TC_01 - can mark task as done", async ({ todoAppPage }) => {
        await todoAppPage.markTaskAsDone("My new task that I do");

        await expect(
            todoAppPage.getTaskCheckbox("My new task that I do")
        ).toBeChecked();
    });

    test("TC_02 - can mark task as undone", async ({ todoAppPage }) => {
        await todoAppPage.markTaskAsUndone("My new task that I won't do");

        await expect(
            todoAppPage.getTaskCheckbox("My new task that I won't do")
        ).not.toBeChecked();
    });
});
