import { useState, useContext, useEffect } from "react";
import { AuctionHouseHooksContext } from "../context/AuctionHouseHooksContext";
import { Auction } from "@zoralabs/zdk";

export const useAuctionInformation = () => {
  const { auctionId, auctionHouse } = useContext(AuctionHouseHooksContext);

  const [auctionInfo, setAuctionInfo] = useState<undefined | Auction>(
    undefined
  );

  useEffect(() => {
    if (auctionId) {
      auctionHouse?.fetchAuction(auctionId).then((auction: Auction) => {
        setAuctionInfo(auction);
      });
    }
  }, [auctionHouse, auctionId]);

  return auctionInfo;
};
