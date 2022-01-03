import { useWalletModalState } from "@zoralabs/simple-wallet-provider";
import { ModalType } from "../types";
import { useAuctionHouseHooksContext } from "./useAuctionHouseHooksContext";

export const useManageAuction = () => {
  const { setAuctionId, setListingRequestInformation } =
    useAuctionHouseHooksContext();
  
  const { closeModal, openModalByName } = useWalletModalState();

  const openManageAuction = (auctionId: number) => {
    setAuctionId(auctionId);
    openModalByName(ModalType.MANAGE_MODAL);
  };
  const openBidAuction = (auctionId: number) => {
    setAuctionId(auctionId);
    openModalByName(ModalType.BID_MODAL);
  };
  const openListAuction = (tokenContract: string, tokenId: string) => {
    setListingRequestInformation({ tokenContract, tokenId });
    openModalByName(ModalType.LIST_MODAL);
  };

  return {
    closeModal,
    openManageAuction,
    openBidAuction,
    openListAuction,
  };
};
