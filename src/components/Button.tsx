import { useContractTransaction } from "../hooks/useContractTransaction";
import { useThemeConfig } from "../hooks/useThemeConfig";

export const Button = (props: any) => {
  const { getStyles, getString } = useThemeConfig();
  const { txInProgress } = useContractTransaction();

  return (
    <button
      {...props}
      disabled={props.disabled || txInProgress}
      {...getStyles("actionButton")}
    >
      {txInProgress && props.showPending
        ? getString("BUTTON_TXN_PENDING")
        : props.children}
    </button>
  );
};
