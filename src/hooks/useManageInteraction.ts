import { parseEther } from "@ethersproject/units";
import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";
import { useCallback } from "react";
import { isAddress } from "ethers/lib/utils";
import { Auction } from "@zoralabs/zdk";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { addressesMatch } from "../utils/addresses";
import { ActionType } from "../types";
import { useContractTransaction } from "./useContractTransaction";

export const useManageInteraction = (
  auction: Auction,
  setError: (err: string | undefined) => void
) => {
  const { getString } = useThemeConfig();
  const { account } = useWeb3Wallet();
  const { auctionHouse, auctionId } = useAuctionHouseHooksContext();

  const auctionHasEnded =
    auction.firstBidTime.gt("0") &&
    new Date().getTime() / 1000 >
      auction.firstBidTime.add(auction.duration).toNumber();

  const { handleTx: handleCancelTx, txStatus: cancelTxStatus } =
    useContractTransaction(ActionType.CANCEL_AUCTION);
  const { handleTx: handleSetReserveTx, txStatus: setReserveTxStatus } =
    useContractTransaction(ActionType.UPDATE_RESERVE);
  const { handleTx: handleEndAuctionTx, txStatus: endAuctionTxStatus } =
    useContractTransaction(ActionType.END_AUCTION);

  const { ethValue, input } = useEthAmountInput({
    hasMinPrecision: true,
    label: getString("UPDATE_RESERVE_PRICE_PRICE_LABEL"),
  });

  const handleCancelAuction = useCallback(async () => {
    setError(undefined);
    if (!auctionHouse || auctionId === null) {
      setError("No auction found");
      return;
    }
    try {
      await handleCancelTx(auctionHouse?.cancelAuction(auctionId));
    } catch (error) {
      console.error(error);
      setError(`Error cancelling auction: ${error.message}`);
    }
  }, [auctionHouse, auctionId, setError, handleCancelTx]);

  const handleEndAuction = useCallback(async () => {
    setError(undefined);
    if (!auctionHouse || auctionId === null) {
      setError("No auction found");
      return;
    }
    try {
      await handleEndAuctionTx(auctionHouse?.endAuction(auctionId));
    } catch (error) {
      console.error(error);
      setError(`Error ending auction: ${error.message}`);
    }
  }, [auctionHouse, auctionId, setError, handleEndAuctionTx]);

  const handleUpdateReservePrice = useCallback(async () => {
    setError(undefined);
    if (!auctionHouse || auctionId === null) {
      setError("No auction found");
      return;
    }
    if (ethValue) {
      try {
        await handleSetReserveTx(
          auctionHouse?.setAuctionReservePrice(auctionId, parseEther(ethValue))
        );
      } catch (error) {
        console.error(error);
        setError(`Error cancelling auction: ${error.message}`);
      }
    } else {
      setError("Invalid reserve price");
    }
  }, [setError, auctionHouse, auctionId, ethValue]);

  const isTokenOwner =
    isAddress(account as any) &&
    addressesMatch(account as string, auction.tokenOwner);

  return {
    auctionHasEnded,
    cancelTxStatus,
    endAuctionTxStatus,
    ethValue,
    handleCancelAuction,
    handleEndAuction,
    handleUpdateReservePrice,
    input,
    isTokenOwner,
    setReserveTxStatus,
  };
};
