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

	static getNamedSigners<Account extends TNamedAccounts>(namedAccount: Account,signers: SignerWithAddress[]) {
		const namedSigners = <{[key in keyof Account]: SignerWithAddress}>{}
		for (const [key, value] of Object.entries(namedAccount)) {
			namedSigners[key as keyof Account] = signers[value]	
		}
		return namedSigners;
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
