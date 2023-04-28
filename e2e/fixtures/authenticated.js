import { test as base } from "@playwright/test";
import { TodoAppPage } from "../pom/TodoAppPage";

export const test = base.extend({
    todoAppPage: [
        async ({ page }, use, testInfo) => {
            const todoAppPage = new TodoAppPage(page, testInfo.project.name);
            await todoAppPage.goto();
            await todoAppPage.registerNewUser();

            await use(todoAppPage);
        },
        {
            auto: true,
        },
    ],
});
export { expect } from "@playwright/test";
