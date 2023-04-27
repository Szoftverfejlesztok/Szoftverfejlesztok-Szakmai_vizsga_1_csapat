const { exec } = require("child_process");

async function run(command) {
    return new Promise((resolve, reject) => {
        console.log("Running command: " + command);
        exec(command, (err, stdout, strerr) => {
            console.log(stdout);
            console.error(strerr);
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = async () => {
    await run("php artisan migrate:refresh");
    await run("php artisan db:seed");
};
