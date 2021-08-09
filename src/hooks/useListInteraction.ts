import { useCallback } from "react";
import { parseEther } from "@ethersproject/units";
import { AddressZero } from "@ethersproject/constants";

import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";
import rinkebyAuction from "@zoralabs/auction-house/dist/addresses/4.json";
import mainnetAuction from "@zoralabs/auction-house/dist/addresses/1.json";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { useTokenApproval } from "../hooks/useTokenApproval";
import { ActionType, ListParamsType } from "../types";
import { useContractTransaction } from "./useContractTransaction";

const DefaultListParams = {
  curatorAddress: AddressZero,
  curatorPercentage: 0,
  currencyAddress: AddressZero,
  // 60 sec in a min, 60 min in an hour 24 hour in a day = 1 day
  duration: 60 * 60 * 24,
};

export const useListInteraction = (
  setError: (err: string | undefined) => void,
  tokenContract: string,
  tokenId: string,
  listParams: ListParamsType = DefaultListParams
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

  const { handleTx: handleApproveTx, txInProgress: approveInProgress } =
    useContractTransaction(ActionType.APPROVE);
  const { handleTx: handleListTx, txInProgress: listInProgress } =
    useContractTransaction(ActionType.LIST);

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
      await handleListTx(
        auctionHouse?.createAuction(
          tokenId,
          listParams.duration,
          parseEther(ethValue),
          listParams.curatorAddress,
          listParams.curatorPercentage,
          listParams.currencyAddress,
          tokenContract
        )
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
      await handleApproveTx(approve());
      await loadApproval();
    } catch (error) {
      setError(
        `${getString("ERROR_APPROVING_TOKEN_PREFIX")} ${error.messages}`
      );
    }
  }, [auctionHouseAddress, approve, loadApproval]);

  return {
    handleApprove,
    approveInProgress,
    handleCreateAuction,
    listInProgress,
    owned,
    approved,
    input,
  };
};
