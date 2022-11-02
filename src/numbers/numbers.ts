import { BigNumber } from "ethers";
import { numberToErc20 } from "./BigNumber";

type TLocales = "th-TH" | "ja-JA" | "en-us" | "ko" | "zh-cn";

declare global {
	interface Number {
		currencyForm: (digit: number, locale?: TLocales) => string;
		toErc20: (decimal?: number) => BigNumber;
		toHex:() => string
		to0xHex: () => string
		roundDown: (digit?:number) => number
		roundUp: (digit?:number) => number
		round: (digit?: number) => number

	}
}

Number.prototype.currencyForm = function (
	digit: number,
	locale: TLocales = "th-TH",
): string {
	const option: Intl.NumberFormatOptions = {
		maximumFractionDigits: digit,
	};
	return this.toLocaleString(locale, option);
};

Number.prototype.toErc20 = function (decimal: number = 18) {
	return numberToErc20(this as number, decimal);
};

Number.prototype.toHex = function() {
	return this.toString(16)
}

Number.prototype.to0xHex = function() {
	return `0x${this.toHex()}`
}

Number.prototype.roundDown = function(digit: number = 0) {
	const num = Number(`1e${digit}`)
	return Math.floor(this as number * num) / num
}

Number.prototype.roundUp = function(digit: number = 0) {
	const num = Number(`1e${digit}`)
	return Math.ceil(this as number * num) / num
}

Number.prototype.round = function(digit: number = 0) {
	const num = Number(`1e${digit}`)
	return Math.round(this as number * num) / num
}


