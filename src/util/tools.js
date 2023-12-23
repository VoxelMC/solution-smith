import { createInterface } from "readline";

/**
 * @function getValueFromUser
 * @param {Object} options
 * @param {string} options.prompt
 * @param {string} options.message
 */
export async function getValueFromUser(options) {
	const readline = createInterface({
		input: process.stdin,
		output: process.stdout,
		terminal: true,
	});

	return new Promise((resolve) => {
		if (options.message) console.log("\n" + options.message);
		readline.question("-> " + options.prompt, (res) => {
			readline.close();
			resolve(res);
		});
	});
}
