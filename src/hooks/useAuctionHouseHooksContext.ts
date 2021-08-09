import { useContext } from "react";
import { AuctionHouseHooksContext } from "../context/AuctionHouseHooksContext";

export const useAuctionHouseHooksContext = () =>
  useContext(AuctionHouseHooksContext);
