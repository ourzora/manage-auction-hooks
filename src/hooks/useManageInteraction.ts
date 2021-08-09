import { parseEther } from "@ethersproject/units";
import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";
import { useCallback } from "react";
import { isAddress } from "ethers/lib/utils";
import { Auction } from "@zoralabs/zdk";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { addressesMatch } from "../utils/addresses";

export const useManageInteraction = (
  auction: Auction,
  setError: (err: string | undefined) => void
) => {
  const { getString } = useThemeConfig();
  const { account } = useWeb3Wallet();
  const { auctionHouse, auctionId } = useAuctionHouseHooksContext();
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
      await auctionHouse?.cancelAuction(auctionId);
    } catch (error) {
      console.error(error);
      setError(`Error cancelling auction: ${error.message}`);
    }
  }, [auctionHouse, auctionId, setError]);

  const handleUpdateReservePrice = useCallback(async () => {
    setError(undefined);
    if (!auctionHouse || auctionId === null) {
      setError("No auction found");
      return;
    }
    if (ethValue) {
      try {
        await auctionHouse?.setAuctionReservePrice(
          auctionId,
          parseEther(ethValue)
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
    isTokenOwner,
    handleUpdateReservePrice,
    handleCancelAuction,
    input,
    ethValue,
  };
};
