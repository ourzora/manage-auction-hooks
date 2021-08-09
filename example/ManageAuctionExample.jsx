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

const MediaRenderer = (props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>
}

const ManageAuctionButton = () => {
  const {openManageAuction, openListAuction, openBidAuction} = useManageAuction();
      return (
        <Fragment>
          <button onClick={() => {
            openManageAuction(parseInt(prompt('Auction id?')));
          }}>manage auction</button>
          <button onClick={() => {
            openBidAuction(parseInt(prompt('Auction id?')));
          }}>bid auction</button>
          <button onClick={() => {
            openListAuction('0x152eeE3DCc5526efd646E9b45c9a9672BfFcc097', '103000097');
          }}>list auction</button>
        </Fragment>
      );
}

export const ManageAuctionExample = () => {
  return (
    <Web3ConfigProvider networkId={4} clientInfo={CLIENT_INFO}>
      <ConnectTrigger />
      <AuctionManager renderMedia={MediaRenderer}>
        <ManageAuctionButton />
      </AuctionManager>
    </Web3ConfigProvider>
  );
};
