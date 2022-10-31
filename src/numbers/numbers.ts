import { BigNumber } from "ethers";
import { numberToErc20 } from "./BigNumber";

type TLocales = "th-TH" | "ja-JA" | "en-us" | "ko" | "zh-cn";

declare global {
	interface Number {
		currencyForm: (digit: number, locale?: TLocales) => string;
		toErc20: (decimal?: number) => BigNumber;
		toHex:() => string
		to0xHex: () => string

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
