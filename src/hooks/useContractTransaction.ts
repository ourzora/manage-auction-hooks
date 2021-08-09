import { useContext } from "react";
import { ContractTransaction } from "@ethersproject/contracts";
import { ActionType, WalletCallStatus } from "../types";
import { TransactionActionContext } from "../context/TransactionActionContext";

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
        isWaiting: true,
      });
      const tx = await promise;
      setCurrentAction({
        state: WalletCallStatus.CONFIRMING,
        type: action,
        isWaiting: true,
      });
      await tx.wait(confirmations);
      setCurrentAction({
        state: WalletCallStatus.CONFIRMED,
        type: action,
        isWaiting: false,
      });
      afterActionCallback(action);
      // txn confirmed
      // todo reload page???
      console.log('transaction completed');
      return tx;
    } catch (e) {
      setCurrentAction({
        state: WalletCallStatus.ERRORED,
        type: action,
        isWaiting: false,
        error: e.message,
      });
      throw e;
    }
  }

  const txInProgress =
    currentAction?.isWaiting && currentAction?.type === action;

  return { txInProgress, handleTx };
}
