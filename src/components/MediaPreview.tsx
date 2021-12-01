import { MediaPreviewType } from "../types";
import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";

export const MediaPreview = ({
  tokenContract,
  tokenId,
  auctionId,
}: MediaPreviewType) => {
  const { renderMedia: RenderMedia } = useAuctionHouseHooksContext();
  return tokenContract && tokenId && RenderMedia ? (
    <RenderMedia
      auctionId={auctionId}
      tokenContract={tokenContract}
      tokenId={tokenId}
    />
  ) : null;
};
