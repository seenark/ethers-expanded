import { EncodeBytes32 } from "../ethers";
import { textToBytes32 } from "../ethers/bytes32";

export {};
declare global {
  interface String {
    toBytes32: () => EncodeBytes32;
    fromHexToNumber: () => number;
    from0xHexToNumber: () => number;
  }
}

String.prototype.toBytes32 = function () {
  return textToBytes32(this as string);
};

String.prototype.from0xHexToNumber = function () {
  const num = Number(this);
  if (isNaN(num)) {
    throw Error("Error to convert hex to number");
  }
  return num;
};

String.prototype.fromHexToNumber = function () {
  const numWithout0x = this.replace("0x", "");
  return `0x${numWithout0x}`.from0xHexToNumber();
};
