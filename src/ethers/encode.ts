import { ethers, utils } from "ethers";

export abstract class EncodePack {
	protected abstract type: string;
	protected abstract _value: string;
	get value() {
		return this._value;
	}

	get encodeType() {
		return this.type;
	}
}

export class EncodeBytes32 extends EncodePack {
	protected type: string = "bytes32";
	protected _value: string;

	constructor(value: string) {
		super();
		if (value.length > 66) {
			throw new Error("value length >66");
		}
		if (value.length <= 0) {
			throw new Error("no value provided");
		}
		this._value = value;
	}

	toString() {
		const text = utils.parseBytes32String(this.value);
		return text;
	}
}

export class EncodeBytes extends EncodePack {
	protected type: string = "bytes";
	protected _value: string;

	constructor(value: string) {
		super();
		this._value = value;
	}
}

export class EncodeString extends EncodePack {
	protected type: string = "string";
	protected _value: string;

	constructor(value: string) {
		super();
		this._value = value;
	}
}

function extractEncodePack(list: EncodePack[]) {
	const types: string[] = [];
	const values: string[] = [];
	list.forEach((e) => {
		types.push(e.encodeType);
		values.push(e.value);
	});
	return {
		types,
		values,
	};
}

function encodePacked(list: EncodePack[]) {
	const { types, values } = extractEncodePack(list);
	const packed = ethers.utils.solidityPack(types, values);
	return new EncodeBytes(packed);
}

export function keccak256(list: EncodePack[]) {
	const { types, values } = extractEncodePack(list);
	const result = ethers.utils.solidityKeccak256(types, values);
	return new EncodeBytes32(result);
}

export const abi = {
	encodePacked,
};
