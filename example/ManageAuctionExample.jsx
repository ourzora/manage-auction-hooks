import React, { Fragment } from "react";
import { useWalletState, Web3ConfigProvider } from "../src";

const CLIENT_INFO = {
  name: "testing wallet connector",
  url: "http://localhost:1234",
  description: "testing wallet",
  icons: [],
};

const ConnectTrigger = () => {
  const { buttonAction, actionText, connectedInfo } = useWalletState();
  const {openManageAuction, openBidAuction} = useManageAuction();

  return (
    <Fragment>
      {connectedInfo}
      <button onClick={() => buttonAction()}>{actionText}</button>
    </Fragment>
  );
};

const ManageAuctionButton = () => {
      return (
        <button onClick={() => {
          openManageAuction(parseInt(prompt('Auction id?')));
        }}>manage auction</button>
      );
}

export const ManageAuctionExample = () => {
  return (
    <Web3ConfigProvider networkId={1} clientInfo={CLIENT_INFO}>
      <ConnectTrigger />
      <AuctionManager>
        <ManageAuctionButton />
      </AuctionManager>
    </Web3ConfigProvider>
  );
};
