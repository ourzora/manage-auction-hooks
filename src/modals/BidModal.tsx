import { useState, useCallback, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";
import { Auction } from "@zoralabs/zdk";
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
import { MediaPreview } from "../components/MediaPreview";

const BidModalContent = ({
  auction,
  setError,
}: {
  auction: Auction;
  setError: (err: string | undefined) => void;
}) => {
  const { account } = useWeb3Wallet();
  const { getString } = useThemeConfig();
  const { txInProgress } = useContractTransaction();
  const { auctionHouse, auctionId } = useAuctionHouseHooksContext();
  const { ethValue, input } = useEthAmountInput({
    hasMinPrecision: true,
    label: getString("UPDATE_RESERVE_PRICE_PRICE_LABEL"),
  });

  const handleBid = useCallback(async () => {
    setError(undefined);
    if (!auctionHouse || auctionId === null || !ethValue) {
      setError("No auction found");
      return;
    }
    try {
      await auctionHouse?.createBid(auctionId, parseEther(ethValue));
    } catch (error) {
      console.error(error);
      setError(`${getString("ERROR_PLACING_BID_PREFIX")}: ${error.message}`);
    }
  }, [auctionHouse, auctionId, setError]);

  return (
    <span>
      {isAddress(account as any) &&
      addressesMatch(account as string, auction.tokenOwner) ? (
        <Fragment>
          <h3>{getString("PLACE_BID_HEADER")}</h3>
          <p>{getString("PLACE_BID_DESCRIPTION")}</p>
          <div>
            {input}
            <Button onClick={handleBid} showPending={true}>
              {txInProgress
                ? getString("BUTTON_TXN_PENDING")
                : getString("BID_BUTTON_TEXT")}
            </Button>
          </div>
        </Fragment>
      ) : (
        <span>{getString("MODAL_MANAGE_NOT_OWNED")}</span>
      )}
    </span>
  );
};

export const BidModal = () => {
  const { getString, getStyles } = useThemeConfig();
  const auctionInfo: Auction | undefined = useAuctionInformation();
  const [error, setError] = useState<string | undefined>(undefined);
  const { auctionHouse, auctionId } = useAuctionHouseHooksContext();

  return (
    <ModalActionLayout
      error={error}
      modalTitle={getString("MODAL_TITLE_MANAGE_LISTING")}
      modalDescription={getString("MODAL_DESCRIPTION_MANAGE_LISTING")}
      modalName={ModalType.BID_MODAL as string}
    >
      {auctionInfo && auctionId && auctionHouse ? (
        <div {...getStyles("modalInner")}>
          <MediaPreview auction={auctionInfo} />
          <BidModalContent auction={auctionInfo} setError={setError} />
        </div>
      ) : (
        <span>{getString("MANAGE_MODAL_LOADING_PROMPT")}</span>
      )}
    </ModalActionLayout>
  );
};
