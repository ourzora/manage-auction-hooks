import { useCallback } from "react";
import { parseEther } from "@ethersproject/units";
import { AddressZero } from "@ethersproject/constants";

import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { useTokenApproval } from "../hooks/useTokenApproval";
import rinkebyAuction from "@zoralabs/auction-house/dist/addresses/4.json";
import mainnetAuction from "@zoralabs/auction-house/dist/addresses/1.json";

export const useListInteraction = (
  setError: (err: string | undefined) => void,
  tokenContract: string,
  tokenId: string
) => {
  const { account, chainId } = useWeb3Wallet();
  const { getString } = useThemeConfig();
  const { auctionHouse } = useAuctionHouseHooksContext();

  const auctionHouseAddress = chainId === 1 ? mainnetAuction : rinkebyAuction;
  const { approved, owned, approve, loadApproval } = useTokenApproval(
    tokenContract,
    tokenId,
    auctionHouseAddress.auctionHouse
  );

  const { ethValue, input } = useEthAmountInput({
    hasMinPrecision: true,
    label: getString("LIST_SET_RESERVE_PRICE_LABEL"),
  });

  const handleCreateAuction = useCallback(async () => {
    setError(undefined);
    if (!tokenContract || !tokenId || !auctionHouse || !ethValue || !account) {
      setError("No auction found");
      return;
    }
    try {
      await auctionHouse?.createAuction(
        tokenId,
        60 * 60 * 24,
        parseEther(ethValue),
        account,
        0,
        AddressZero,
        tokenContract
      );
    } catch (error) {
      console.error(error);
      setError(
        `${getString("ERROR_CREATING_AUCTION_PREFIX")} ${error.message}`
      );
    }
  }, [setError, tokenContract, tokenId, auctionHouse, ethValue, account]);

  const handleApprove = useCallback(async () => {
    try {
      await approve();
      await loadApproval();
    } catch (error) {
      setError(
        `${getString("ERROR_APPROVING_TOKEN_PREFIX")} ${error.messages}`
      );
    }
  }, [auctionHouseAddress, approve, loadApproval]);

  return {
    handleApprove,
    handleCreateAuction,
    owned,
    approved,
    input,
  };
};
