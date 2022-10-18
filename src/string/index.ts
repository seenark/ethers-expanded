import { textToBytes32 } from "../ethers/bytes32";
import { EncodeBytes32 } from "../ethers/encode";

export {};
declare global {
	interface String {
		toBytes32: () => EncodeBytes32;
	}
}

String.prototype.toBytes32 = function () {
	return textToBytes32(this);
};
