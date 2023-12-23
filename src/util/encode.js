import crypto from "crypto";

export function encode(stringToEncode) {
	return crypto
		.createHash("sha256")
		.update(stringToEncode)
		.digest("base64url");
}

