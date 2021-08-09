import { css } from "@emotion/css";

export const isClientSide = typeof window !== "undefined";

export const Theme = {
  button: css``,
  input: css``,
  ethInput: css``,
};

export const Strings = {
  LIST_ITEM: "List",
  SET_RESERVE_BUTTON_TEXT: "Set Reserve",
  CANCEL_AUCTION_BUTTON_TEXT: "Cancel Auction",

  MODAL_DESCRIPTION_MANAGE_LISTING: 'Manage Your NFT Auction House Listing',
  MODAL_TITLE_MANAGE_LISTING: 'Manage Listing',
  MANAGE_MEDIA_HEADER: 'Manage Media',
  CANCEL_AUCTION: 'Auction has been cancelled',
  MODAL_MANAGE_NOT_OWNED: 'You do not own this NFT',
  BUTTON_TXN_PENDING: 'Transaction Pending',
  SET_RESERVE_PRICE_DESCRIPTION: 'You can update the reserve price before the first bid is placed.',
  MIN_ETH_INPUT_PRECISION: "0.01",
  UPDATE_RESERVE_PRICE_PRICE_LABEL: 'New reserve price in ETH',
};
