import { test as base } from "@playwright/test";
import { TodoAppPage } from "../pom/TodoAppPage";

export const test = base.extend({
    todoAppPage: [
        async ({ page }, use, testInfo) => {
            const todoAppPage = new TodoAppPage(page, testInfo);
            await todoAppPage.goto();
            await todoAppPage.registerNewUser();

            await use(todoAppPage);
        },
        {
            scope: "test",
            auto: true,
        },
    ],
});
export { expect } from "@playwright/test";
