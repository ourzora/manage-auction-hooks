import React, { Fragment } from "react";
import { AuctionManager, useManageAuction, useManageAsks } from "../src";
import { Web3ConfigProvider, useWalletButton } from "@zoralabs/simple-wallet-provider";

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
  const { openManageAuction, openListAuction, openBidAuction } = useManageAuction();
  const { openCreateAsk } = useManageAsks();

    return (
      <Fragment>
        <button onClick={() => {
          openManageAuction(parseInt(prompt('Auction id?')));
        }}>manage auction</button>
        <button onClick={() => {
          openBidAuction(parseInt(prompt('Auction id?')));
        }}>bid auction</button>
        <button onClick={() => {
          const contract = prompt('contract?');
          const id = prompt('id');
          openListAuction(contract, id);
        }}>list auction</button>
        <button onClick={() => {
          openCreateAsk('0xe6C01cd3816f8dDDa971a749097c5297B64d2124', '1');
        }}>set buy now</button>
        <button onClick={() => {
          openCreateAsk('0xe6C01cd3816f8dDDa971a749097c5297B64d2124', '1');
        }}>buy token</button>
      </Fragment>
    );
}

export const ManageAuctionExample = () => {
  return (
    <Web3ConfigProvider networkId={4}>
      <ConnectTrigger />
      <AuctionManager renderMedia={MediaRenderer}>
        <ManageAuctionButton />
      </AuctionManager>
    </Web3ConfigProvider>
  );
};
