import { test, expect } from "./fixtures/authenticated";

test.describe("TS_03 - New task", () => {
    test("TS_01 - can add task without deadline", async ({
        todoAppPage,
        page,
    }) => {
        await todoAppPage.addTask("My new task that I will do");

        await expect(
            page.getByText("My new task that I will do")
        ).toBeVisible();
        await expect(
            todoAppPage.getTaskCheckbox("My new task that I will do")
        ).not.toBeChecked();
    });

    test("TS_02 - can add task with deadline", async ({
        todoAppPage,
        page,
    }) => {
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

    test("TS_03 - can not add empty task", async ({ page }) => {
        await page.getByPlaceholder("Name of the task").fill("");

        await expect(
            page.getByText("Add new task", { exact: true })
        ).toBeDisabled();
        await page
            .getByText("Add new task", { exact: true })
            .click({ force: true });
        await expect(page.getByPlaceholder("Name of the task")).toBeEmpty();
        await expect(page.getByTestId("task")).toHaveCount(0);
    });
});
