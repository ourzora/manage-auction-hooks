import { useState, ReactNode, Fragment } from "react";
import { AuctionHouse } from "@zoralabs/zdk";
import {
  useWalletModalState,
  useWeb3Wallet,
} from "@zoralabs/simple-wallet-provider";

import { AuctionHouseHooksContext } from "../context/AuctionHouseHooksContext";
import { Theme, Strings } from "../constants";
import { ManageModal } from "../modals/ManageModal";
import { ListingRequestType, RenderMediaType } from "../types";
import { BidModal } from "../modals/BidModal";
import { ListModal } from "../modals/ListModal";

type AuctionManagerProps = {
  theme?: Partial<typeof Theme>;
  strings?: Partial<typeof Strings>;
  children: ReactNode;
  renderMedia: RenderMediaType;
};

export const AuctionManager = ({
  theme,
  strings,
  children,
  renderMedia,
}: AuctionManagerProps) => {
  const [auctionId, setAuctionId] = useState<null | number>(null);
  const [listingRequestInformation, setListingRequestInformation] =
    useState<ListingRequestType>(null);
  const { library, chainId } = useWeb3Wallet();
  const { closeModal } = useWalletModalState();

  return (
    <AuctionHouseHooksContext.Provider
      value={{
        auctionId,
        setAuctionId,
        renderMedia: renderMedia,
        listingRequestInformation,
        setListingRequestInformation,
        theme: Object.assign({}, Theme, theme),
        strings: Object.assign({}, Strings, strings),
        afterActionCallback: () => {
          closeModal();
        },
        auctionHouse:
          library && chainId
            ? new AuctionHouse(library.getSigner(), chainId)
            : null,
      }}
    >
      <Fragment>
        <ManageModal />
        <BidModal />
        <ListModal />
        {children}
      </Fragment>
    </AuctionHouseHooksContext.Provider>
  );
};
