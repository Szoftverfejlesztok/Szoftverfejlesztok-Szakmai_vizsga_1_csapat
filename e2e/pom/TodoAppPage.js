import { expect } from "@playwright/test";

let id = 0;

export class TodoAppPage {
    constructor(page, projectName) {
        this.page = page;
        this.projectName = projectName;
    }

    async goto() {
        await this.page.goto("/");
    }

    async registerNewUser() {
        await this.page.goto("/#/register");

        const email = `test_playwright_${this.projectName}_${id}@example.com`;
        const name = `Test User ${id}`;
        id++;

        await this.page.getByLabel("Name").fill(name);
        await this.page.getByLabel("Email").fill(email);
        await this.page
            .getByLabel("Password", { exact: true })
            .fill("password");
        await this.page
            .getByLabel("Password confirmation", { exact: true })
            .fill("password");

        await this.page.getByText("Register").click();

        await expect(this.page.getByText(`Hello ${name}`)).toBeVisible();
    }

    async addTask(name) {
        await this.page.getByLabel("Add task").fill(name);
        await this.page.getByText("Add", { exact: true }).click();
        await expect(this.page.getByLabel("Add task")).toBeEmpty();
        await expect(this.page.getByText(name)).toBeVisible();
    }
}
