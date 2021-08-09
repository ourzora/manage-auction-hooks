import { useContext } from "react";
import { ContractTransaction } from "@ethersproject/contracts";
import { ActionType, WalletCallStatus } from "../types";
import { TransactionActionContext } from "../context/TransactionActionContext";

export function isWaiting(status: WalletCallStatus) {
  return (
    status === WalletCallStatus.CONFIRMING ||
    status === WalletCallStatus.PROMPTED
  );
}

export function isConfirmed(status: WalletCallStatus) {
  return status === WalletCallStatus.CONFIRMED;
}

export function useContractTransaction(
  action: ActionType,
  confirmations: number = 1
) {
  const { setCurrentAction, currentAction, afterActionCallback } = useContext(
    TransactionActionContext
  );

  async function handleTx(promise: Promise<ContractTransaction>) {
    try {
      setCurrentAction({
        state: WalletCallStatus.PROMPTED,
        type: action,
      });
      const tx = await promise;
      setCurrentAction({
        state: WalletCallStatus.CONFIRMING,
        type: action,
      });
      await tx.wait(confirmations);
      setCurrentAction({
        state: WalletCallStatus.CONFIRMED,
        type: action,
      });
      afterActionCallback(action);
      // txn confirmed
      // todo reload page???
      console.log("transaction completed");
      return tx;
    } catch (e) {
      setCurrentAction({
        state: WalletCallStatus.ERRORED,
        type: action,
        error: e.message,
      });
      throw e;
    }
  }

  const txStatus =
    currentAction?.type === action
      ? currentAction?.state
      : WalletCallStatus.INITIAL;

  return { txStatus, handleTx };
}
