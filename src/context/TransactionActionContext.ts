import { createContext } from "react";
import type {
  ActionInfo,
  ActionType,
  TransactionActionContextType,
} from "../types";

export const TransactionActionContext =
  createContext<TransactionActionContextType>({
    afterActionCallback: (_action: ActionType) => {},
    currentAction: null,
    setCurrentAction: (_action: ActionInfo | null) => {},
  });
