import { Strings, Theme } from "./constants";
import type { AuctionHouse } from "@zoralabs/zdk";
import { ReactElement } from "react";

export type AuctionHouseHooksContextType = {
  theme: typeof Theme;
  strings: typeof Strings;
  auctionId: number | null;
  setAuctionId: (auctionId: number | null) => void;
  listingRequestInformation: ListingRequestType | null;
  setListingRequestInformation: (set: ListingRequestType) => void;
  auctionHouse: InstanceType<typeof AuctionHouse> | null;
  renderMedia?: RenderMediaType;
};

export type RenderMediaType = (props: any) => ReactElement;

export type ListingRequestType = null | {
  tokenContract: string;
  tokenId: string;
};

export enum ModalType {
  LIST_MODAL = "AUCTION_HOUSE_LIST_MODAL",
  BID_MODAL = "AUCTION_HOUSE_BID_MODAL",
  MANAGE_MODAL = "AUCTION_HOUSE_MANAGE_MODAL",
}
