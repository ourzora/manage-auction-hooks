import { useWalletModalState } from "@zoralabs/simple-wallet-provider";
import { useContext } from "react";
import { AuctionHouseHooksContext } from "../config";
import { ModalType } from "../types";

export const useManageAuction = () => {
  const {setAuctionId} = useContext(AuctionHouseHooksContext);
	const {closeModal, openModalByName} = useWalletModalState();

	const openManageAuction = (auctionId: number) => {
    setAuctionId(auctionId);
    openModalByName(ModalType.MANAGE_MODAL);
	}
	const openBidAuction = (auctionId: number) => {
    setAuctionId(auctionId);
    openModalByName(ModalType.BID_MODAL);
	}
	const openListAuction = (auctionId: number) => {
    setAuctionId(auctionId);
    openModalByName(ModalType.LIST_MODAL);
	}

	return {
		closeModal,
		openManageAuction,
		openBidAuction,
		openListAuction
	}
}