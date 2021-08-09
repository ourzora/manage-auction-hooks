import { ReactNode, useState } from "react";

import { ActionInfo } from "../types";
import { TransactionActionContext } from "./TransactionActionContext";

export const ProvideTransactionContext = ({
  children,
  afterActionCallback = () => {},
}: {
  children: ReactNode;
  afterActionCallback?: (action: any) => void;
}) => {
  const [currentAction, setCurrentAction] = useState<null | ActionInfo>(null);

  return (
    <TransactionActionContext.Provider
      value={{ afterActionCallback, currentAction, setCurrentAction }}
    >
      {children}
    </TransactionActionContext.Provider>
  );
};
