import { useWalletModalState } from "@zoralabs/simple-wallet-provider";
import { useContext, useMemo } from "react";
import { TransactionActionContext } from "../context/TransactionActionContext";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { ActionType } from "../types";
import { Button } from "./Button";

export const ActionCompletedView = () => {
  const { getString, getStyles } = useThemeConfig();
  const { currentAction, setCurrentAction } = useContext(
    TransactionActionContext
  );
  const ActionTypeToMessage = useMemo(
    () => ({
      [ActionType.APPROVE]: {
        text: getString("ACTION_APPROVE_CONFIRMED"),
        allowBack: true,
        action: getString("ACTION_APPROVE_CONFIRMED_NEXT_TEXT"),
      },
      [ActionType.LIST]: {
        text: getString("ACTION_LIST_CONFIRMED"),
        allowBack: false,
        action: getString("ACTION_CONFIRMED_NEXT_TEXT"),
      },
      [ActionType.PLACE_BID]: {
        text: getString("ACTION_PLACE_BID_CONFIRMED"),
        allowBack: false,
      },
      [ActionType.UPDATE_RESERVE]: {
        text: getString("ACTION_UPDATE_RESERVE_CONFIRMED"),
        allowBack: false,
      },
      [ActionType.CANCEL_AUCTION]: {
        text: getString("ACTION_CANCELLED_CONFIRMED"),
        allowBack: false,
      },
      DEFAULT: {
        text: "",
        allowBack: false,
      },
    }),
    [getString]
  );
  const { closeModal } = useWalletModalState();
  const actionMessage = ActionTypeToMessage[currentAction?.type || "DEFAULT"];
  return (
    <div {...getStyles("modalSuccessMessage")}>
      {actionMessage.text}
      <p {...getStyles("updateWarning")}>
        Changes to the site may take ~5 mins to be synced with the blockchain.
      </p>
      {actionMessage.allowBack ? (
        <Button onClick={() => setCurrentAction(null)}>
          {getString("CONFIRMATION_BACK_BUTTON_TEXT")}
        </Button>
      ) : (
        <Button
          onClick={() => {
            closeModal();
            setCurrentAction(null);
          }}
        >
          {getString("CONFIRMATION_CLOSE_MODAL_BUTTON_TEXT")}
        </Button>
      )}
    </div>
  );
};
