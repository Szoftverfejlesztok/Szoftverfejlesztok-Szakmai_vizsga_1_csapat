import { test, expect } from "./fixtures/authenticated";

test("can add task without deadline", async ({ todoAppPage, page }) => {
    await todoAppPage.addTask("My new task that I will do");

    await expect(page.getByText("My new task that I will do")).toBeVisible();
    await expect(
        todoAppPage.getTaskCheckbox("My new task that I will do")
    ).not.toBeChecked();
});

test("can add task with deadline", async ({ todoAppPage, page }) => {
    await todoAppPage.addTask("My new task that I will do", "04/28/2023");

    await expect(
        page.getByLabel("Datepicker input").getByRole("textbox")
    ).toBeEmpty();

    await expect(
        todoAppPage.getTask("My new task that I will do")
    ).toBeVisible();

    await expect(
        todoAppPage
            .getTask("My new task that I will do")
            .getByText("04/28/2023")
    ).toBeVisible();
});
