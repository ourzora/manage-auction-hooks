import { useState, ReactNode } from "react"
import { AuctionHouseHooksContext } from "../config"
import { Theme, Strings } from "../constants";
import {AuctionHouse} from '@zoralabs/zdk';
import {useWeb3Wallet} from '@zoralabs/simple-wallet-provider';

type AuctionManagerProps = {
	theme?: Partial<typeof Theme>,
	strings?: Partial<typeof Strings>,
	children: ReactNode,
}

export const AuctionManager = ({theme, strings, children}: AuctionManagerProps) => {
	const [auctionId, setAuctionId] = useState<null|number>(null);
	const {library, chainId} = useWeb3Wallet();

	const signer = library.getSigner();

	return (
		<AuctionHouseHooksContext.Provider value={{
			auctionId,
			setAuctionId,
			theme: Object.assign({}, Theme, theme),
			strings: Object.assign({}, Strings, strings),
			auctionHouse: signer && chainId ? new AuctionHouse(signer, chainId): null
		}}>
			{children}
		</AuctionHouseHooksContext.Provider>
	)
}