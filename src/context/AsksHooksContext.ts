import { createContext } from "react";
import { Strings, Theme } from "../constants";
import type {
  AsksHooksContextType,
  ListingRequestType,
} from "../types";

export const AsksHooksContext =
  createContext<AsksHooksContextType>({
    theme: Theme,
    strings: Strings,
    setCreateAskInformation: (_req: ListingRequestType) => {
      throw new Error("Missing Asks Hooks provider");
    },
    askRequestInformation: null,
  });
