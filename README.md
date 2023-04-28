# To Do App

## About

This small app can be used by multiple users to manage their tasks.
After registration or login the user can add tasks with or without deadline. The tasks are sorted by the deadline and grouped into upcoming and completed tasks. The user can change the task state by clicking the checkbox. If a task is not necessary anymore it can be deleted with the delete button.
The user has a simple profile with a name given during the registration and an avatar imported from Gravatar by the user's email address.

## Screenshots

![Registration](screenshots/register.png)
![Login](screenshots/login.png)
![App](screenshots/app.png)

## Requirements

-   PHP >8.2.0
-   Composer >2.5.0
-   NodeJS >18
-   npm >9.5.0
-   yarn >1.22.0
-   MySQL or MariaDB

## How to setup the environment?

-   Create a separate user and database for the app (eg. database name: todo-app, username: todo-app)
-   Create a .env file based on the .env.local with your MySQL server's connection data
-   Install Composer dependencies: `composer install`
-   Install NodeJS dependencies: `npm install`
-   Run database migrations: `php artisan migrate`
-   Run database seed script: `php artisan db:seed`

## How to start the project?

-   Start the backend in one terminal: `php artisan serve`
-   Start the frontend in another terminal: `npm run dev`
-   Open the site in the browser: `http://localhost:8000`
-   You can login with the email `test@example.com` and password `password`

## Entity-relationship diagram

![Entity-relationship diagram](erd.png)

## Testing

You can read the test documentation here: [Teszt dokumentáció.pdf](Teszt%20dokumentáció.pdf)

All of the tests have been implemented with Playwright, you can run them with the following command: `npm test`
