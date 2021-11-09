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
    margin-top: 12px;
    padding: 12px 18px;
    font-family: inherit;
    font-size: 1.2em;
    background: #ddd;
    border-radius: 4px;
    transition: background 0.32s ease-in;
    cursor: pointer;
    border: 0;

    &:disabled {
      cursor: not-allowed;
    }

    &:hover {
      background: #aaa;
    }
  `,
  ethAmountLabel: css`
    margin: 4px;
    display: block;
  `,
  modalInner: css`
    background: white;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  modalHeader: css`
    font-size: 1.4em;
  `,
  modalBidActionContainer: css`
    padding-bottom: 15px; 
  `,
  modalDescription: css``,
  updateReserveContainer: css``,
  modalSuccessMessage: css``,
  modalLoadingPrompt: css`
    padding: 20px;
  `,
  modalBidButton: css`
  `,
  updateWarning: css``,
  modalManageMissingOwnershipMessage: css`
    padding: 20px;
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

  BID_AMOUNT_LABEL: "Bid Amount",

  RESERVE_PRICE_NOT_MET: "Reserve of % eth not met",
  SHOW_HIGHEST_BID: "Highest bid: % eth",
  BID_NOT_ENOUGH_ETH: "Not enough eth to bid",
  BID_TOO_LOW: "Bid is too low. Need to bid at least % eth",

  LIST_MEDIA_HEADER: "List media",
  LIST_MEDIA_DESCRIPTION: "List your work on the zora auction house",
  LIST_MEDIA_BUTTON_TEXT: "List",
  LIST_SET_RESERVE_PRICE_LABEL: "Set reserve price",

  ERROR_PLACING_BID_PREFIX: "Error placing bid: ",
  ERROR_CREATING_AUCTION_PREFIX: "Error creating auction: ",
  ERROR_APPROVING_TOKEN_PREFIX: "Error approving NFT for auction: ",

  BID_BUTTON_TEXT: "Bid",
  APPROVE_AUCTION_BUTTON_TEXT: "Approve",

  LIST_MODAL_NOT_OWNED: "Token not owned",
  LIST_MODAL_NOT_OWNED_TEXT:
    "To list this token on the auction house you need to be the owner.",

  ACTION_APPROVE_CONFIRMED: "Confirmed for approval to sell on auction house",
  ACTION_APPROVE_CONFIRMED_NEXT_TEXT: "Go back to list",

  ACTION_LIST_CONFIRMED: "Your NFT has been listed on the auction house",
  ACTION_CONFIRMED_NEXT_TEXT: "Close",

  CONFIRMATION_CLOSE_MODAL_BUTTON_TEXT: "Close modal",

  ACTION_PLACE_BID_CONFIRMED: "Your bid has been placed",
  ACTION_UPDATE_RESERVE_CONFIRMED: "Your auction has a new reserve price",

  ACTION_CANCELLED_CONFIRMED: "Your reserve auction has been cancelled.",

  CONFIRMATION_BACK_BUTTON_TEXT: "Go back",

  SETTLE_AUCTION_HEADER: "Settle Auction",
  SETTLE_AUCTION_DESCRIPTION:
    "Completes the auction by sending the NFT to the buyer and final bid to the seller.",
  SETTLE_AUCTION_BUTTON_TEXT: "Settle Auction",
  AUCTION_END_CONFIRMED: "The auction has been settled",

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

  LIST_NFT_APPROVE_P1: "To list this NFT, it first needs to be approved by ",
  LIST_NFT_APPROVE_P2: "the Zora auction house",
};
