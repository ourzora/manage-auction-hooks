import { useState, useCallback, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";
import { parseEther } from "@ethersproject/units";
import { AddressZero } from "@ethersproject/constants";

import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useContractTransaction } from "../hooks/useContractTransaction";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { Button } from "../components/Button";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { useTokenApproval } from "../hooks/useTokenApproval";
import rinkebyAuction from "@zoralabs/auction-house/dist/addresses/4.json";
import mainnetAuction from "@zoralabs/auction-house/dist/addresses/1.json";

const ListModalContent = ({
  setError,
  tokenContract,
  tokenId,
}: {
  setError: (err: string | undefined) => void;
  tokenContract: string;
  tokenId: string;
}) => {
  const { account, chainId } = useWeb3Wallet();
  const { getString } = useThemeConfig();
  const { txInProgress } = useContractTransaction();
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

  const handleCancelAuction = useCallback(async () => {
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

  if (!owned) {
    return (
      <Fragment>
        <h3>{getString("LIST_MODAL_NOT_OWNED")}</h3>
        <p>{getString("LIST_MODAL_NOT_OWNED_TEXT")}</p>
      </Fragment>
    );
  }

  return (
    <span>
      <Fragment>
        <h3>{getString("LIST_MEDIA_HEADER")}</h3>
        <p>{getString("LIST_MEDIA_DESCRIPTION")}</p>
        {approved ? (
          <Fragment>
            {input}
            <Button onClick={handleCancelAuction} showPending={true}>
              {txInProgress
                ? getString("BUTTON_TXN_PENDING")
                : getString("LIST_MEDIA_BUTTON_TEXT")}
            </Button>
            <p>{getString("SET_RESERVE_PRICE_DESCRIPTION")}</p>
          </Fragment>
        ) : (
          <Fragment>
            <p>To list this NFT, it first needs to be approved by </p>
            <p>the Zora auction house</p>

            <Button onClick={handleApprove} showPending={true}>
              {txInProgress
                ? getString("BUTTON_TXN_PENDING")
                : getString("APPROVE_AUCTION_BUTTON_TEXT")}
            </Button>
          </Fragment>
        )}
      </Fragment>
    </span>
  );
};

export const ListModal = () => {
  const { getString, getStyles } = useThemeConfig();
  const [error, setError] = useState<string | undefined>(undefined);
  const { renderMedia: RenderMedia, listingRequestInformation } =
    useAuctionHouseHooksContext();

  const renderedMedia =
    RenderMedia && listingRequestInformation ? (
      <RenderMedia
        tokenContract={listingRequestInformation.tokenContract}
        tokenId={listingRequestInformation.tokenId}
      />
    ) : undefined;

  return (
    <ModalActionLayout
      error={error}
      modalTitle={getString("MODAL_TITLE_LIST_PIECE")}
      modalDescription={getString("MODAL_DESCRIPTION_LIST_PIECE")}
      modalName={ModalType.LIST_MODAL as string}
    >
      {listingRequestInformation ? (
        <div {...getStyles("modalInner")}>
          {renderedMedia}
          <ListModalContent
            {...listingRequestInformation}
            setError={setError}
          />
        </div>
      ) : (
        <span>{getString("MANAGE_MODAL_LOADING_PROMPT")}</span>
      )}
    </ModalActionLayout>
  );
};
