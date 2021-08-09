import { useWalletModalState } from "@zoralabs/simple-wallet-provider";
import { ReactNode, useState } from "react";
import { ActionInfo } from "src/types";
import { TransactionActionContext } from "./TransactionActionContext";
export const ProvideTransactionContext = ({
  children,
  afterActionCallback,
}: {
  children: ReactNode;
  afterActionCallback?: (action: any) => void;
}) => {
  const [currentAction, setCurrentAction] = useState<null | ActionInfo>(null);
  const { closeModal } = useWalletModalState();
  if (!afterActionCallback) {
    afterActionCallback = closeModal;
  }

  return (
    <TransactionActionContext.Provider
      value={{ afterActionCallback, currentAction, setCurrentAction }}
    >
      {children}
    </TransactionActionContext.Provider>
  );
};
