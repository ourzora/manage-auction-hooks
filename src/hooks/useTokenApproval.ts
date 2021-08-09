import { ContractTransaction } from "@ethersproject/contracts";
import { Erc721Factory } from "@zoralabs/core/dist/typechain";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { addressesMatch } from "../utils/addresses";

export function useTokenApproval(
  contractAddress?: string,
  tokenId?: string,
  spender?: string
) {
  const { account, library } = useWeb3React();
  const contract = useMemo(() => {
    if (!library || !contractAddress) {
      return;
    }

    return Erc721Factory.connect(contractAddress, library.getSigner());
  }, [contractAddress, library]);

  const [approved, setIsApproved] = useState<boolean | undefined>(undefined);
  const [owned, setIsOwned] = useState<boolean | undefined>(undefined);

  const loadApproval = useCallback(async () => {
    setIsApproved(undefined);
    // TODO(iain): add error
    if (account && spender && contract && tokenId) {
      setIsOwned(addressesMatch(await contract?.ownerOf(tokenId), account));
      setIsApproved(await contract?.isApprovedForAll(account, spender));
    }
  }, [contract, setIsApproved, account, spender]);

  useEffect(() => {
    loadApproval();
  }, [account, spender]);

  function approve(): Promise<ContractTransaction> {
    if (!contract || !spender) {
      throw new Error("No connected contract instance || spender address");
    }

    return contract?.setApprovalForAll(spender, true);
  }

  return {
    loading: typeof approved === "undefined", // && !rest.error,
    approved,
    loadApproval,
    approve,
    owned,
  };
}
