import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { SignerAndContracts, TContracts } from "./signersAndContracts";

export type TNamedAccounts = Record<string, number>;
export type TNamedSignersAndContracts<Account extends TNamedAccounts, Contracts extends TContracts> = Record<
	keyof Account,
	SignerWithAddress & Contracts
>;

export class NamedAccount {
	static buildNamedAccount(...accounts: string[]) {
		const namedAccount: TNamedAccounts = {};
		accounts.forEach((account, index) => {
			namedAccount[account] = index;
		});
		return namedAccount;
	}
	static getNamedSignersAndContracts<Account extends TNamedAccounts, Contracts extends TContracts>(
		namedAccount: Account,
		signers: SignerWithAddress[],
		contracts: Contracts,
	): TNamedSignersAndContracts<Account, Contracts> {
		const signersAndContracts = SignerAndContracts.setupSignerAndContract(signers, contracts);
		const namedSignersAndContracts = <TNamedSignersAndContracts<Account, Contracts>>{};
		for (const [key, value] of Object.entries(namedAccount)) {
			namedSignersAndContracts[key as keyof Account] = signersAndContracts[value];
		}
		return namedSignersAndContracts;
	}
}
