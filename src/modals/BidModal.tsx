import { useState, useCallback, Fragment, useEffect } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";
import { Auction } from "@zoralabs/zdk";
import { formatEther, parseEther, parseUnits } from "@ethersproject/units";

import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";

import { useAuctionInformation } from "../hooks/useAuctionInformation";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { useEthAmountInput } from "../components/useEthAmountInput";
import { Button } from "../components/Button";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { MediaPreview } from "../components/MediaPreview";
import { BigNumber, BigNumberish } from "ethers";
import { getNextMinBid } from "../utils/bidInfo";

const formatAmount = (text: string, amount: BigNumberish) => {
  const formattedAmount = formatEther(amount);
  return text.replace('%', formattedAmount);
}

const BidModalContent = ({
  auction,
  setError,
}: {
  auction: Auction;
  setError: (err: string | undefined) => void;
}) => {
  const { account, library } = useWeb3Wallet();
  const { getString } = useThemeConfig();
  // const { txInProgress } = useContractTransaction();
  const { auctionHouse, auctionId } = useAuctionHouseHooksContext();

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
      await auctionHouse?.createBid(auctionId, parseEther(ethValue));
    } catch (error) {
      console.error(error);
      setError(`${getString("ERROR_PLACING_BID_PREFIX")}: ${error.message}`);
    }
  }, [auctionHouse, auctionId, setError]);

  return (
    <Fragment>
      <h3>{getString("PLACE_BID_HEADER")}</h3>
      <p>{getString("PLACE_BID_DESCRIPTION")}</p>
      <p>{auction.amount.eq(0) ? formatAmount(getString('RESERVE_PRICE_NOT_MET'), auction.reservePrice) : formatAmount(getString('SHOW_HIGHEST_BID'), auction.amount)}</p>
      <div>
        <div>
          {input}
        </div>
        <div>
          {!userHasEnough ? getString("BID_NOT_ENOUGH_ETH") : bidTooLow && formatAmount(getString("BID_TOO_LOW"), minBid)}
        </div>
        <Button
          onClick={handleBid}
          disabled={!userHasEnough || bidTooLow}
          showPending={true}
        >
          {getString("BID_BUTTON_TEXT")}
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
