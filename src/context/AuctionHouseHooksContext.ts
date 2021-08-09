import { createContext } from "react";
import { Strings, Theme } from "../constants";
import type { AuctionHouseHooksContextType } from "../types";

export const AuctionHouseHooksContext =
  createContext<AuctionHouseHooksContextType>({
    theme: Theme,
    strings: Strings,
    setAuctionId: (_name: number | null) => {
      throw new Error('Missing Auction House Hooks provider')
    },
    auctionId: null,
    auctionHouse: null,
  });
