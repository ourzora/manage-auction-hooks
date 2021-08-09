import { getAddress } from "@ethersproject/address";

export const addressesMatch = (address1: string, address2: string) => {
  return getAddress(address1) === getAddress(address2);
};
