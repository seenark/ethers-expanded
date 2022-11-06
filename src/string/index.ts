import { format, isDate } from "date-fns";
import { EncodeBytes32 } from "../ethers";
import { textToBytes32 } from "../ethers/bytes32";

export {};
declare global {
  interface String {
    toBytes32: () => EncodeBytes32;
    fromHexToNumber: () => number;
    from0xHexToNumber: () => number;
    toMMM_DD_YYYY_HH_MM: () => string; 
    toMMM_DD_YYYY: () => string; 
    fromISOStringToDate: () => [Date, string | null];
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

String.prototype.toMMM_DD_YYYY_HH_MM = function () {
  const date = new Date(this as string)
  const newDate = format(date, "MMM dd, yyyy hh:mm")
  return newDate
}

String.prototype.fromISOStringToDate = function() {
  const newDate = new Date(this as string)
  if (!isDate(newDate)) {
    return [new Date(), "invalid"]
  }
  return [newDate, null]
}


const departure_scheduled = "2022-10-04T02:22:38.412Z" // Oct 04, 2022 02:22


departure_scheduled.toMMM_DD_YYYY_HH_MM() // Oct 04, 2022 02:22