import { useState, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { Button } from "../components/Button";
import { ListParamsType, ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { useListInteraction } from "../hooks/useListInteraction";

const ListModalContent = ({
  setError,
  tokenContract,
  tokenId,
  listParams,
}: {
  setError: (err: string | undefined) => void;
  tokenContract: string;
  tokenId: string;
  listParams?: ListParamsType;
}) => {
  const {
    owned,
    approved,
    input,
    handleCreateAuction,
    handleApprove,
    listInProgress,
    approveInProgress,
  } = useListInteraction(setError, tokenContract, tokenId, listParams);
  const { getString, getStyles } = useThemeConfig();

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
        <h3 {...getStyles("modalHeader")}>{getString("LIST_MEDIA_HEADER")}</h3>
        <p {...getStyles("modalDescription")}>
          {getString("LIST_MEDIA_DESCRIPTION")}
        </p>
        {approved ? (
          <Fragment>
            {input}
            <Button onClick={handleCreateAuction} disabled={listInProgress}>
              {listInProgress
                ? getString("BUTTON_TXN_PENDING")
                : getString("LIST_MEDIA_BUTTON_TEXT")}
            </Button>
            <p {...getStyles("modalDescription")}>
              {getString("SET_RESERVE_PRICE_DESCRIPTION")}
            </p>
          </Fragment>
        ) : (
          <Fragment>
            <p {...getStyles("modalDescription")}>
              {getString("LIST_NFT_APPROVE_P1")}
            </p>
            <p {...getStyles("modalDescription")}>
              {getString("LIST_NFT_APPROVE_P2")}
            </p>

            <Button onClick={handleApprove} disabled={approveInProgress}>
              {approveInProgress
                ? getString("BUTTON_TXN_PENDING")
                : getString("APPROVE_AUCTION_BUTTON_TEXT")}
            </Button>
          </Fragment>
        )}
      </Fragment>
    </span>
  );
};

export const ListModal = ({ listParams }: { listParams?: ListParamsType }) => {
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
            listParams={listParams}
          />
        </div>
      ) : (
        <span>{getString("MANAGE_MODAL_LOADING_PROMPT")}</span>
      )}
    </ModalActionLayout>
  );
};
