import { useState, useCallback, useEffect } from "react";
import { Auction } from "@zoralabs/zdk";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";

import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { BigNumber, BigNumberish } from "ethers";
import { getNextMinBid } from "../utils/bidInfo";
import { ActionType } from "../types";
import { useContractTransaction } from "./useContractTransaction";

export const useBidInteraction = (
  auction: Auction,
  setError: (err: string | undefined) => void
) => {
  const { account, library } = useWeb3Wallet();
  const { getString } = useThemeConfig();
  const { auctionHouse, auctionId } = useAuctionHouseHooksContext();
  const { handleTx: handleBidTx, txStatus: bidTxStatus } =
    useContractTransaction(ActionType.PLACE_BID);

  const [userBalance, setUserBalance] = useState<BigNumberish | undefined>(
    undefined
  );

  const getBalance = useCallback(async () => {
    if (library && account) {
      setUserBalance(await library.getBalance(account));
    }
  }, [account, library]);
  useEffect(() => {
    getBalance();
  }, [library, account]);

  const getMinBid = () => {
    const minBidAmount = auction.amount.gt(0)
      ? getNextMinBid(auction.amount)
      : auction.reservePrice || "0";

    return minBidAmount;
  };

  const [minBid, setMinBid] = useState<BigNumberish | undefined>(getMinBid);

  const { ethValue, input, setEthValue } = useEthAmountInput({
    hasMinPrecision: true,
    label: getString("BID_AMOUNT_LABEL"),
    userBalance: userBalance
      ? BigNumber.from(userBalance).toString()
      : undefined,
  });

  useEffect(() => {
    setMinBid(getMinBid());
    setEthValue(formatEther(getMinBid()));
  }, [auction.amount]);

  const bidTooLow =
    auction.amount && minBid
      ? BigNumber.from(parseUnits(ethValue || "0", 18))
          .sub(BigNumber.from(minBid))
          .lt("0")
      : true;

  const userHasEnough =
    ethValue && userBalance
      ? BigNumber.from(parseUnits(ethValue || "0", 18))
          .sub(BigNumber.from(userBalance))
          .lt("0")
      : false;

  const handleBid = useCallback(async () => {
    setError(undefined);
    if (!auctionHouse || auctionId === null || !ethValue) {
      setError("No auction found");
      return;
    }
    try {
      await handleBidTx(
        auctionHouse?.createBid(auctionId, parseEther(ethValue))
      );
    } catch (error) {
      console.error(error);
      setError(`${getString("ERROR_PLACING_BID_PREFIX")}: ${error.message}`);
    }
  }, [auctionHouse, auctionId, setError, ethValue]);

  return {
    bidTooLow,
    bidTxStatus,
    userHasEnough,
    input,
    minBid,
    handleBid,
  };
};
