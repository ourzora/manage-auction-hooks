import { Auction } from "@zoralabs/zdk";

import { useAuctionHouseHooksContext } from "../hooks/useAuctionHouseHooksContext";

export const MediaPreview = ({ auction }: { auction: Auction }) => {
  const { renderMedia: RenderMedia } = useAuctionHouseHooksContext();
  return auction && RenderMedia ? (
    <RenderMedia
      auctionId={(auction as any)[0].toNumber()}
      tokenContract={(auction as any)[1]?.toString()}
      tokenId={(auction as any).tokenId?.toNumber()}
    />
  ) : null;
};
