import { useContractTransaction } from "../hooks/useContractTransaction";
import { useThemeConfig } from "../hooks/useThemeConfig";

export const Button = ({ showPending, disabled, ...props }: any) => {
  const { getStyles, getString } = useThemeConfig();
  const { txInProgress } = useContractTransaction();

  return (
    <button
      {...props}
      disabled={disabled || txInProgress}
      {...getStyles("actionButton")}
    >
      {txInProgress && showPending
        ? getString("BUTTON_TXN_PENDING")
        : props.children}
    </button>
  );
};
