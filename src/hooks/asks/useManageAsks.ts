import { useWalletModalState } from "@zoralabs/simple-wallet-provider";
import { ModalType } from "../../types";
import { useAsksHooksContext } from "./useAsksHooksContext";

export const useManageAsks = () => {

  const { setCreateAskInformation } =
    useAsksHooksContext();

  const { closeModal, openModalByName } = useWalletModalState();

  const openCreateAsk = (tokenContract: string, tokenId: string) => {
    setCreateAskInformation({ tokenContract, tokenId });
    console.log(tokenContract, tokenId)
    openModalByName(ModalType.CREATE_ASK_MODAL);
  };

  return {
    closeModal,
    openCreateAsk,
  };
};
