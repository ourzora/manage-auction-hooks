import { useState, ReactNode, Fragment } from "react";
import { AuctionHouse } from "@zoralabs/zdk";
import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";

import { AuctionHouseHooksContext } from "../context/AuctionHouseHooksContext";
import { AsksHooksContext } from "../context/AsksHooksContext";
import { Theme, Strings } from "../constants";
import { ManageModal } from "../modals/ManageModal";
import { ListingRequestType, ListParamsType, RenderMediaType } from "../types";
import { BidModal } from "../modals/BidModal";
import { ListModal } from "../modals/ListModal";
import { CreateAskModal } from "../modals/asks";
import { ProvideTransactionContext } from "../context/ProvideTransactionContext";

type AuctionManagerProps = {
  theme?: Partial<typeof Theme>;
  strings?: Partial<typeof Strings>;
  children: ReactNode;
  renderMedia: RenderMediaType;
  listParams?: ListParamsType;
};

export const AuctionManager = ({
  theme,
  strings,
  children,
  renderMedia,
  listParams,
}: AuctionManagerProps) => {
  const [auctionId, setAuctionId] = useState<null | number>(null);
  
  const [listingRequestInformation, setListingRequestInformation] =
    useState<ListingRequestType>(null);
  
  const [askRequestInformation, setCreateAskInformation] =
    useState<ListingRequestType>(null);
  
  const { library, chainId } = useWeb3Wallet();
  
  return (
    <ProvideTransactionContext>
      <AsksHooksContext.Provider
        value={{
          theme: Object.assign({}, Theme, theme),
          strings: Object.assign({}, Strings, strings),
          askRequestInformation,
          setCreateAskInformation,
          renderMedia: renderMedia,
        }}
      >
        <AuctionHouseHooksContext.Provider
          value={{
            auctionId,
            setAuctionId,
            renderMedia: renderMedia,
            listingRequestInformation,
            setListingRequestInformation,
            theme: Object.assign({}, Theme, theme),
            strings: Object.assign({}, Strings, strings),
            auctionHouse:
              library && chainId
                ? new AuctionHouse(library.getSigner(), chainId)
                : null,
          }}
        >
          <Fragment>
            <ManageModal />
            <BidModal />
            <ListModal listParams={listParams} />
            <CreateAskModal />
            {children}
          </Fragment>
        </AuctionHouseHooksContext.Provider>
      </AsksHooksContext.Provider>
    </ProvideTransactionContext>
  );
};
