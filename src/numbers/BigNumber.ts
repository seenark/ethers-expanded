import { BigNumber, utils } from "ethers";

export function erc20ToNumber(bn: BigNumber, decimal: number = 18): number {
	const str = utils.formatUnits(bn, decimal);
	return +str;
}

export function numberToErc20(n: number, decimal: number = 18): BigNumber {
	const bn = utils.parseUnits(n.toString(), decimal);
	return bn;
}

declare module "ethers" {
	interface BigNumber {
		erc20ToNumber: (decimal?: number) => number;
	}
}

BigNumber.prototype.erc20ToNumber = function (decimal: number = 18) {
	return erc20ToNumber(this, decimal);
};
