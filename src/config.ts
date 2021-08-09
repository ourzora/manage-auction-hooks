import { createContext } from "react";
import { Strings, Theme } from "./constants";
import { AuctionHouseHooksContextType } from "./types";

export const AuctionHouseHooksContext =
  createContext<AuctionHouseHooksContextType>({
    theme: Theme,
    strings: Strings,
    auctionId: null,
    setAuctionId: (_auctionId) => {
      throw new Error("Did not init");
    },
    auctionHouse: null,
  });
