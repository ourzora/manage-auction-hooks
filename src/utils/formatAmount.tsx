import { formatEther } from "@ethersproject/units";
import { BigNumberish } from "ethers";
import React from "react";
import { useThemeConfig } from "../hooks/useThemeConfig";

export const formatAmount = (text: string, amount: BigNumberish) => {
  const { getStyles } = useThemeConfig();
  const formattedAmount = formatEther(amount).substr(0, 5);
  const textSplit = text.split("%");
  return textSplit.map((part, i) => {
    if (i === textSplit.length - 1) {
      return <React.Fragment>{part}</React.Fragment>;
    }
    return (
      <span>
        {part} <span {...getStyles("ethAmount")}>{formattedAmount} eth</span>
      </span>
    );
  });
};
