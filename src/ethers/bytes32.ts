import { utils } from "ethers";
import { abi, EncodeBytes32 } from "./encode";

export function textToBytes32(text: string) {
	const bytes32 = utils.formatBytes32String(text);
	return new EncodeBytes32(bytes32);
}

export function bytes32ToText(bytes32: EncodeBytes32) {
	const text = utils.parseBytes32String(bytes32.value);
	return text;
}

export {};
