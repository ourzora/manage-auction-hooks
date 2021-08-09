import { useState, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";
import { Auction } from "@zoralabs/zdk";

import { useAuctionInformation } from "../hooks/useAuctionInformation";
import { useThemeConfig } from "../hooks/useThemeConfig";
import { Button } from "../components/Button";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { useManageInteraction } from "../hooks/useManageInteraction";
import { isConfirmed, isWaiting } from "../hooks/useContractTransaction";
import { ActionCompletedView } from "../components/ActionCompletedView";

const ManageModalContent = ({
  auction,
  setError,
}: {
  auction: Auction;
  setError: (err: string | undefined) => void;
}) => {
  const { getString, getStyles } = useThemeConfig();
  const {
    isTokenOwner,
    handleCancelAuction,
    handleUpdateReservePrice,
    input,
    ethValue,
    cancelTxStatus,
    setReserveTxStatus,
  } = useManageInteraction(auction, setError);

  if (isConfirmed(cancelTxStatus) || isConfirmed(setReserveTxStatus)) {
    return <ActionCompletedView />;
  }

  return (
    <span>
      {isTokenOwner ? (
        <Fragment>
          <h3 {...getStyles("modalHeader")}>
            {getString("MANAGE_MEDIA_HEADER")}
          </h3>
          <p {...getStyles("modalDescription")}>
            {getString("CANCEL_AUCTION")}
          </p>
          <Button
            onClick={handleCancelAuction}
            disabled={isWaiting(cancelTxStatus)}
          >
            {isWaiting(cancelTxStatus)
              ? getString("BUTTON_TXN_PENDING")
              : getString("CANCEL_AUCTION_BUTTON_TEXT")}
          </Button>
          <p {...getStyles("modalDescription")}>
            {getString("SET_RESERVE_PRICE_DESCRIPTION")}
          </p>
          <div {...getStyles("updateReserveContainer")}>
            {input}
            <div>
              <Button
                onClick={handleUpdateReservePrice}
                disabled={!ethValue || isWaiting(setReserveTxStatus)}
              >
                {isWaiting(setReserveTxStatus)
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
          <ManageModalContent auction={auctionInfo} setError={setError} />
        </div>
      ) : (
        <span>{getString("MANAGE_MODAL_LOADING_PROMPT")}</span>
      )}
    </ModalActionLayout>
  );
};
