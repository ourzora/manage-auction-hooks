import { useState, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";
import { Auction } from "@zoralabs/zdk";
import { formatEther } from "@ethersproject/units";

import { useAuctionInformation } from "../hooks/useAuctionInformation";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { Button } from "../components/Button";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { MediaPreview } from "../components/MediaPreview";
import { BigNumberish } from "ethers";
import { useBidInteraction } from "../hooks/useBidInteraction";

const formatAmount = (text: string, amount: BigNumberish) => {
  const formattedAmount = formatEther(amount);
  return text.replace("%", formattedAmount);
};
const BidModalContent = ({
  auction,
  setError,
}: {
  auction: Auction;
  setError: (err: string | undefined) => void;
}) => {
  const { getString, getStyles } = useThemeConfig();
  const { input, userHasEnough, bidInProgress, minBid, bidTooLow, handleBid } =
    useBidInteraction(auction, setError);

  return (
    <Fragment>
      <h3 {...getStyles("modalHeader")}>{getString("PLACE_BID_HEADER")}</h3>
      <p {...getStyles("modalDescription")}>
        {getString("PLACE_BID_DESCRIPTION")}
      </p>
      <p>
        {auction.amount.eq(0)
          ? formatAmount(
              getString("RESERVE_PRICE_NOT_MET"),
              auction.reservePrice
            )
          : formatAmount(getString("SHOW_HIGHEST_BID"), auction.amount)}
      </p>
      <div>
        <div>{input}</div>
        <div>
          {!userHasEnough
            ? getString("BID_NOT_ENOUGH_ETH")
            : bidTooLow &&
              formatAmount(getString("BID_TOO_LOW"), minBid as string)}
        </div>
        <Button
          onClick={handleBid}
          disabled={!userHasEnough || bidTooLow || bidInProgress}
        >
          {bidInProgress
            ? getString("BUTTON_TXN_PENDING")
            : getString("BID_BUTTON_TEXT")}
        </Button>
      </div>
    </Fragment>
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
