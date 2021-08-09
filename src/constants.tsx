import { css } from "@emotion/css";
import { Fragment } from "react";

export const isClientSide = typeof window !== "undefined";

export const Theme = {
  input: css``,
  ethInput: css`
    font-family: inherit;
    padding: 4px;
    font-size: 1.2em;
  `,
  actionButton: css`
    font-family: inherit;
    padding: 4px;
    font-size: 1.2em;
  `,
  ethAmountLabel: css`
    margin: 4px;
    display: block;
  `,
  modalInner: css`
    background: white;
  `,
};

export const Strings = {
  LIST_ITEM: "List",
  SET_RESERVE_BUTTON_TEXT: "Set Reserve",
  CANCEL_AUCTION_BUTTON_TEXT: "Cancel Auction",

  MODAL_DESCRIPTION_MANAGE_LISTING: "Manage Your NFT Auction House Listing",
  MODAL_TITLE_MANAGE_LISTING: "Manage Listing",

  MODAL_TITLE_LIST_PIECE: "List Piece",
  MODAL_DESCRIPTION_LIST_PIECE: "Modal for listing NFT on auction house",

  MODAL_TITLE_BID_PIECE: "Place Bid",
  MODAL_DESCRIPTION_BID_PIECE: "Modal to place a bid on a NFT",

  PLACE_BID_HEADER: "Place Bid",
  PLACE_BID_DESCRIPTION: "Place a bid on this piece",

  LIST_MEDIA_HEADER: "List media",
  LIST_MEDIA_DESCRIPTION: "List your work on the zora auction house",
  LIST_MEDIA_BUTTON_TEXT: "List",
  LIST_SET_RESERVE_PRICE_LABEL: "Set reserve price",

  ERROR_PLACING_BID_PREFIX: "Error placing bid: ",
  ERROR_CREATING_AUCTION_PREFIX: "Error creating auction: ",

  BID_BUTTON_TEXT: "Bid",

  MANAGE_MEDIA_HEADER: "Manage Media",
  CANCEL_AUCTION: (
    <Fragment>
      <p>Auction is active for the given reserve price.</p>
      <p>You can cancel this auction before the first bid</p>
    </Fragment>
  ) as any,
  MODAL_MANAGE_NOT_OWNED: "You do not own this NFT",
  BUTTON_TXN_PENDING: "Transaction Pending",
  SET_RESERVE_PRICE_DESCRIPTION:
    "You can update the reserve price before the first bid is placed.",
  MIN_ETH_INPUT_PRECISION: "0.01",
  UPDATE_RESERVE_PRICE_PRICE_LABEL: "New reserve price in ETH",
  MANAGE_MODAL_LOADING_PROMPT: "Loading auction...",
  SET_RESERVE_PRICE_BUTTON_TEXT: "Set new reserve price",
};
