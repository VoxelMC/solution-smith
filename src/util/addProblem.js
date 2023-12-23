import { encode } from "./encode.js";
import { loadFile, writeFile } from "magicast";
import { createInterface } from "readline";
import { open, readFileSync } from "fs";
import { getValueFromUser } from "./tools.js";
import { join } from "path";

const name =
	process.argv[2] ||
	(await getValueFromUser({
		prompt: "Name: ",
		message: "1. Provide a name for the problem.",
	}));
const answer =
	process.argv[3] ||
	(await getValueFromUser({
		prompt: "Answer (Expected Output): ",
		message: "2. Provide the expected output for the problem.",
	}));
let question =
	process.argv.slice(4).join(" ") ||
	(await getValueFromUser({
		prompt: "Question Description: ",
		message:
			"3. Provide the question below, including the test case or required data. \n   If you would like to read this value from a file, use this syntax: 'file:./path/to/file.txt'",
	}));

// create file if it doesn't exist
open("problems.config.mjs", "wx", (err) => {
	if (err) {
		if (err.code === "EEXIST") {
			return;
		}
		throw err;
	}
});

const readline = createInterface({
	input: process.stdin,
	output: process.stdout,
	terminal: true,
});

if (question.startsWith("file:")) {
	const filePath = join(process.cwd(), question.slice(5));
	try {
		question = readFileSync(filePath, { encoding: "utf8", flag: "r" });
	} catch (error) {
		console.log(error);
		console.error(
			`Error: File ${filePath} not found. NOTE: The program is searching for relative paths from ${process.cwd()}.`
		);
	}
}

const newProblem = {
	name,
	answer: encode(answer),
	question,
};

console.log("\n", "New Problem:");
console.log(JSON.stringify(newProblem, null, 4) + "\n");

readline.question("Do you want to proceed? (Y/n) ", async (res) => {
	if (res.toLowerCase() !== "n") {
		const problemFile = await loadFile("problems.config.mjs");
		problemFile.exports.default ||= {};
		problemFile.exports.default.tests ||= [];

		if (problemFile.exports.default.tests.find((p) => p.name === name)) {
			console.error(
				"\nError: Problem with that name already exists. Please delete it manually."
			);
			process.exit(1);
		}

		problemFile.exports.default.tests.push(newProblem);

		await writeFile(problemFile, "problems.config.mjs", {
			tabWidth: 4,
		});
		console.log("Done!");
	}
	readline.close();
});
