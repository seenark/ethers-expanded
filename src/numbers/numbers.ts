import { BigNumber } from "ethers";
import { numberToErc20 } from "./BigNumber";

type TLocales = "th-TH" | "ja-JA" | "en-us" | "ko" | "zh-cn";

declare global {
	interface Number {
		currencyForm: (digit: number, locale?: TLocales) => string;
		toErc20: (decimal?: number) => BigNumber;
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
	return numberToErc20(this, decimal);
};
