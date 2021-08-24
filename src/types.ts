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

export type ListParamsType = {
  curatorAddress: string;
  curatorPercentage: number;
  currencyAddress: string;
  duration: number;
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

export enum ActionType {
  LIST = "LIST",
  APPROVE = "APPROVE",
  UPDATE_RESERVE = "UPDATE_RESERVE",
  CANCEL_AUCTION = "CANCEL_AUCTION",
  PLACE_BID = "PLACE_BID",
  END_AUCTION = "END_AUCTION",
}

export type ActionInfo = {
  type: ActionType;
  state: WalletCallStatus;
  error?: Error;
};

export type TransactionActionContextType = {
  currentAction: ActionInfo | null;
  setCurrentAction: (actionInfo: ActionInfo | null) => void;
  afterActionCallback: (actionType: ActionType) => void;
};

export enum WalletCallStatus {
  INITIAL = "INITIAL",
  PROMPTED = "PROMPTED",
  CONFIRMING = "CONFIRMING",
  CONFIRMED = "CONFIRMED",
  ERRORED = "ERRORED",
}
