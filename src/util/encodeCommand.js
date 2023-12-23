import { encode } from "./encode.js";

if (process.argv.length < 3) {
	console.error("Error: Missing string to encode");
	console.log("Usage: node encode.js <string>", "\n");
	process.exit(1);
} else {
	console.log(encode(process.argv[2]));
}
