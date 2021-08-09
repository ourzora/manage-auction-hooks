import { Strings, Theme } from "./constants";
import type { AuctionHouse } from "@zoralabs/zdk";

export type AuctionHouseHooksContextType = {
  theme: typeof Theme;
  strings: typeof Strings;
  auctionId: number | null;
  setAuctionId: (auctionId: number | null) => void;
  auctionHouse: InstanceType<typeof AuctionHouse> | null;
};

export enum ModalType {
  LIST_MODAL = "AUCTION_HOUSE_LIST_MODAL",
  BID_MODAL = "AUCTION_HOUSE_BID_MODAL",
  MANAGE_MODAL = "AUCTION_HOUSE_MANAGE_MODAL",
}
