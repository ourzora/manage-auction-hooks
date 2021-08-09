import { useState, useCallback, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";
import { Auction, AuctionHouse } from "@zoralabs/zdk";
import { isAddress } from "@ethersproject/address";
import { parseEther } from "@ethersproject/units";

import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";

import { useAuctionInformation } from "../hooks/useAuctionInformation";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { addressesMatch } from "../utils/addresses";
import { useContractTransaction } from "../hooks/useContractTransaction";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { Button } from "../components/Button";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";

const ManageModalContent = ({
  auction,
  setError,
  auctionHouse,
  auctionId,
}: {
  auction: Auction;
  setError: (err: string | undefined) => void;
  auctionHouse: AuctionHouse;
  auctionId: number;
}) => {
  const { account } = useWeb3Wallet();
  const { getString } = useThemeConfig();
  const { txInProgress } = useContractTransaction();
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

  return (
    <span>
      {isAddress(account as any) &&
      addressesMatch(account as string, auction.tokenOwner) ? (
        <Fragment>
          <h3>{getString("MANAGE_MEDIA_HEADER")}</h3>
          <p>{getString("CANCEL_AUCTION")}</p>
          <Button onClick={handleCancelAuction} showPending={true}>
            {txInProgress
              ? getString("BUTTON_TXN_PENDING")
              : getString("CANCEL_AUCTION_BUTTON_TEXT")}
          </Button>
          <p>{getString("SET_RESERVE_PRICE_DESCRIPTION")}</p>
          <div>
            {input}
            <div>
              <Button
                onClick={handleUpdateReservePrice}
                disabled={!ethValue}
                showPending={true}
              >
                {txInProgress
                  ? getString("BUTTON_TXN_PENDING")
                  : getString("SET_RESERVE_PRICE_BUTTON_TEXT")}
              </Button>
            </div>
          </div>
        </Fragment>
      ) : (
        <span>{getString("MODAL_MANAGE_NOT_OWNED")}</span>
      )}
    </span>
  );
};

export const ManageModal = () => {
  const { getString, getStyles } = useThemeConfig();
  const auctionInfo: Auction | undefined = useAuctionInformation();
  const [error, setError] = useState<string | undefined>(undefined);
  const {
    auctionHouse,
    auctionId,
    renderMedia: RenderMedia,
  } = useAuctionHouseHooksContext();

  const renderedMedia =
    auctionInfo && RenderMedia ? (
      <RenderMedia
        auctionId={auctionId}
        tokenContract={(auctionInfo as any)[1]?.toString()}
        tokenId={(auctionInfo as any).tokenId?.toNumber()}
      />
    ) : undefined;

  return (
    <ModalActionLayout
      error={error}
      modalTitle={getString("MODAL_TITLE_MANAGE_LISTING")}
      modalDescription={getString("MODAL_DESCRIPTION_MANAGE_LISTING")}
      modalName={ModalType.MANAGE_MODAL as string}
    >
      {auctionInfo && auctionId && auctionHouse ? (
        <div {...getStyles("modalInner")}>
          {renderedMedia}
          <ManageModalContent
            auctionHouse={auctionHouse}
            auctionId={auctionId}
            auction={auctionInfo}
            setError={setError}
          />
        </div>
      ) : (
        <span>{getString("MANAGE_MODAL_LOADING_PROMPT")}</span>
      )}
    </ModalActionLayout>
  );
};
