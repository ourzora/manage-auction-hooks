import { useState } from "react";
import { ModalActionLayout } from "@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout";

import { ModalType } from "../../types";
import { useAsksHooksContext } from "../../hooks/asks/useAsksHooksContext";
import { useThemeConfig } from "../../hooks/useThemeConfig";

export const CreateAskContent = ({
  tokenContract,
  tokenId,
}: {
  tokenContract: string;
  tokenId: string;
}) => {
  const { getString } = useThemeConfig();
  
  return (
    <>
      <h1>{getString("MODAL_DESCRIPTION_CREATE_ASK")}</h1>
      <code>{tokenContract} {tokenId}</code>
    </>
  )
}

export const CreateAskModal = () => {
  const { getString, getStyles } = useThemeConfig();

  const [error, setError] = useState<string | undefined>(undefined);

  const { renderMedia: RenderMedia, askRequestInformation } =
    useAsksHooksContext();

  const renderedMedia =
    RenderMedia && askRequestInformation ? (
      <RenderMedia
        tokenContract={askRequestInformation.tokenContract}
        tokenId={askRequestInformation.tokenId}
      />
    ) : undefined;

  console.log('ask modal', askRequestInformation);
  
  return (
    <ModalActionLayout
      error={error}
      modalTitle={getString("MODAL_TITLE_CREATE_ASK")}
      modalDescription={getString("MODAL_DESCRIPTION_CREATE_ASK")}
      modalName={ModalType.CREATE_ASK_MODAL as string}
    >
      {askRequestInformation ? (
        <div {...getStyles("modalInner")}>
          {renderedMedia}
          <CreateAskContent
            {...askRequestInformation}
          />
        </div>
      ) : (
        <span>{getString("MANAGE_MODAL_LOADING_PROMPT")}</span>
      )}
    </ModalActionLayout>
  );
}