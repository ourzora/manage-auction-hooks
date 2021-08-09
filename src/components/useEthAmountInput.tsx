import { ChangeEvent, useState } from "react";
import { useThemeConfig } from "src/hooks/useThemeConfig";

type EthAmountInputProps = {
	hasMinPrecision?: boolean;
	minValue?: string;
	inputProps?: any;
	label: string;
};

export const useEthAmountInput = ({hasMinPrecision = true, minValue, inputProps, label}: EthAmountInputProps) => {
	const [ethValue, setEthValue] = useState<string|undefined>(minValue);
	const {getStyles, getString} = useThemeConfig();
	const input = (

<label>
	{label}
<input
  type="number"
  step={hasMinPrecision ? getString('MIN_ETH_INPUT_PRECISION') : undefined}
  value={ethValue}
  {...(inputProps ? inputProps : getStyles('ethInput'))}
  onChange={(evt: ChangeEvent<HTMLInputElement>) => {
	  evt.persist();
	  setEthValue(evt.currentTarget.value);
  }}
/>
</label>
	);
	return {input, ethValue};
}
