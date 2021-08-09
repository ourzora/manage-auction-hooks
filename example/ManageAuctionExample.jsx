import React, { Fragment } from "react";
import { AuctionManager, useManageAuction } from "../src";
import { Web3ConfigProvider, useWalletButton } from "@zoralabs/simple-wallet-provider";

const CLIENT_INFO = {
  name: "testing wallet connector",
  url: "http://localhost:1234",
  description: "testing wallet",
  icons: [],
};

const ConnectTrigger = () => {
  const { buttonAction, actionText, connectedInfo } = useWalletButton();

  return (
    <Fragment>
      {connectedInfo}
      <button onClick={() => buttonAction()}>{actionText}</button>
    </Fragment>
  );
};

const ManageAuctionButton = () => {
  const {openManageAuction, openBidAuction} = useManageAuction();
      return (
        <button onClick={() => {
          openManageAuction(parseInt(prompt('Auction id?')));
        }}>manage auction</button>
      );
}

export const ManageAuctionExample = () => {
  return (
    <Web3ConfigProvider networkId={4} clientInfo={CLIENT_INFO}>
      <ConnectTrigger />
      <AuctionManager>
        <ManageAuctionButton />
      </AuctionManager>
    </Web3ConfigProvider>
  );
};
