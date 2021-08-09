import { useState, Fragment } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";

import { useThemeConfig } from "../hooks/useThemeConfig";
import { useContractTransaction } from "../hooks/useContractTransaction";
import { Button } from "../components/Button";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";
import { useListInteraction } from "../hooks/useListInteraction";

const ListModalContent = ({
  setError,
  tokenContract,
  tokenId,
}: {
  setError: (err: string | undefined) => void;
  tokenContract: string;
  tokenId: string;
}) => {
  const { owned, approved, input, handleCreateAuction, handleApprove } =
    useListInteraction(setError, tokenContract, tokenId);
  const { getString } = useThemeConfig();
  const { txInProgress } = useContractTransaction();

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
            <Button onClick={handleCreateAuction} showPending={true}>
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
