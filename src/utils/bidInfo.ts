import { BigNumber, BigNumberish } from "ethers";
export function getNextMinBid(value: BigNumberish) {
  return BigNumber.from(value).div("100").mul("105");
}
