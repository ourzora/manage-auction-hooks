import {ModalActionLayout} from '@zoralabs/simple-wallet-provider/dist/modal/ModalActionLayout';
import { Auction } from '@zoralabs/zdk';
import { isAddress } from '@ethersproject/address';
import { useWeb3Wallet } from '@zoralabs/simple-wallet-provider';
import { useAuctionInformation } from '../hooks/useAuctionInformation';
import { useThemeConfig } from '../hooks/useThemeConfig';
import { addressesMatch } from '../utils/addresses';
import { AuctionHouseHooksContext } from '../context/AuctionHouseHooksContext';
import { useContractTransaction } from '../hooks/useContractTransaction';
import { useState, useContext, useCallback, Fragment } from 'react';
import { EthAmountInput, useEthAmountInput } from 'src/components/useEthAmountInput';

const ManageModalContent = ({auction, setError}: {auction: Auction, setError: (err: string | undefined) => void}) => {
	const {account} = useWeb3Wallet();
	const {getString} = useThemeConfig();
	const {auctionHouse, auctionId} = useContext(AuctionHouseHooksContext);
	const {txInProgress} = useContractTransaction();
	const {ethValue, input} = useEthAmountInput({hasMinPrecision: true, label: getString('UPDATE_RESERVE_PRICE_PRICE_LABEL')});

	const handleCancelAuction = useCallback(async () => {
		setError(undefined);
		if (!auctionHouse || auctionId === null) {
			setError('No auction found');
			return;
		}
		try {
			await auctionHouse?.cancelAuction(auctionId)
		} catch (error) {
			console.error(error);
			setError(`Error cancelling auction: ${error}`);
		}
	}, [auctionHouse, auctionId, setError]);

	const handleUpdateReservePrice = useCallback(async () => {
		setError(undefined);
		if (!auctionHouse || auctionId === null) {
			setError('No auction found');
			return;
		}
		if (!ethValue) {
			setError('Invalid reserve price');
		}
		try {
			await auctionHouse?.cancelAuction(auctionId)
		} catch (error) {
			console.error(error);
			setError(`Error cancelling auction: ${error}`);
		}

	}, [setError, auctionHouse, auctionId, ethValue]);

	return (
		<span>
			{isAddress(account as any) && addressesMatch(account as string, auction.tokenOwner) ? (
				<Fragment>
					<h3>{getString('MANAGE_MEDIA_HEADER')}</h3>
					<p>{getString('CANCEL_AUCTION')}</p>
					<button onClick={handleCancelAuction} disabled={txInProgress}>{txInProgress ? getString('BUTTON_TXN_PENDING') : getString('CANCEL_AUCTION_BUTTON_TEXT')}</button>
					<p>{getString('SET_RESERVE_PRICE_DESCRIPTION')}</p>
					<div>
						{input}
						<button onClick={handleUpdateReservePrice} disabled={txInProgress || !ethValue}>{txInProgress ? getString('BUTTON_TXN_PENDING') : getString('CANCEL_AUCTION_BUTTON_TEXT')}</button>

					</div>
				</Fragment>
			) : <span>{getString('MODAL_MANAGE_NOT_OWNED')}</span>}
		</span>
	);
}

export const ManageModal =() => {
	const {getString} = useThemeConfig();
	const auctionInfo: Auction | undefined = useAuctionInformation();
	const [error, setError] = useState<string|undefined>(undefined);

	return (
		<ModalActionLayout error={error} modalTitle={getString('MODAL_TITLE_MANAGE_LISTING')} modalDescription={getString('MODAL_DESCRIPTION_MANAGE_LISTING')}>
			{auctionInfo && (
				<ManageModalContent auction={auctionInfo} setError={setError} />
			)}
		</ModalActionLayout>
	)
}