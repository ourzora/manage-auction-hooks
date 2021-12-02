import { ChangeEvent, useState } from "react";
import { formatAmount } from "../utils/formatAmount";
import { useThemeConfig } from "../hooks/useThemeConfig";

type EthAmountInputProps = {
  hasMinPrecision?: boolean;
  minValue?: string;
  inputProps?: any;
  label: string;
  userBalance?: string;
};

export const useEthAmountInput = ({
  hasMinPrecision = true,
  minValue,
  inputProps,
  label,
  userBalance,
}: EthAmountInputProps) => {
  const [ethValue, setEthValue] = useState<string | undefined>(minValue);
  const { getStyles, getString } = useThemeConfig();
  const input = (
    <label>
      <div {...getStyles("inputEthLabel")}>
        <span {...getStyles("ethAmountLabel")}>{label}</span>
        {userBalance && (
          <div {...getStyles("ethBalance")}>
            Your balance: <span>{formatAmount("%", userBalance)}</span>
          </div>
        )}
      </div>
      <div {...getStyles("ethInputWrapper")}>
        <input
          type="number"
          step={
            hasMinPrecision ? getString("MIN_ETH_INPUT_PRECISION") : undefined
          }
          value={ethValue || ""}
          {...(inputProps ? inputProps : getStyles("ethInput"))}
          onChange={(evt: ChangeEvent<HTMLInputElement>) => {
            evt.persist();
            setEthValue(evt.currentTarget.value);
          }}
        />
        <span {...getStyles("ethLabel")}>ETH</span>
      </div>
    </label>
  );
  return { input, ethValue, setEthValue };
};
