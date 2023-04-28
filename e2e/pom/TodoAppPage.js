import { expect, test } from "@playwright/test";

export class TodoAppPage {
    constructor(page, testInfo) {
        this.page = page;
        this.id = `${testInfo.testId}`;
    }

    async goto() {
        await this.page.goto("/");
    }

    async registerNewUser() {
        await this.page.goto("/#/register");

        const email = `test_playwright_${this.id}@example.com`;
        const name = `Test User ${this.id}`;

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

    async logout() {
        await this.page.getByText("Logout").click();
    }

    async addTask(name, deadline) {
        await this.page.getByLabel("Add task").fill(name);

        if (deadline) {
            await this.page.getByLabel("Datepicker input").click();
            await this.page.locator(`data-test=${new Date(deadline)}`).click();
            await this.page.getByText("Select").click();
        }

        await this.page.getByText("Add", { exact: true }).click();
        await expect(this.page.getByLabel("Add task")).toBeEmpty();
        await expect(this.page.getByText(name)).toBeVisible();
    }

    getTask(name) {
        return this.page.getByTestId("task", {
            has: this.page.getByText(name, { exact: true }),
        });
    }

    getTaskCheckbox(name) {
        return this.page.getByLabel(name);
    }

    async markTaskAsDone(name) {
        const checkbox = this.getTaskCheckbox(name);
        await expect(checkbox).not.toBeChecked();

        await checkbox.click();

        await expect(checkbox).toBeChecked();
    }

    async markTaskAsUndone(name) {
        const checkbox = this.getTaskCheckbox(name);
        await expect(checkbox).toBeChecked();

        await checkbox.click();

        await expect(checkbox).not.toBeChecked();
    }
}
