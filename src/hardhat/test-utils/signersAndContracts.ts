import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Contract } from "ethers";

export type TContracts = Record<string, Contract>;
export type TSignerAndContract<Contracts extends TContracts,> = (SignerWithAddress & Contracts)[];

export type TSignersAndContracts<T extends TContracts> = SignerWithAddress & T;

export class SignerAndContracts {
	static setupUser<T extends SignerWithAddress, U extends TContracts>(signer: T, contracts: U) {
		const newContracts = <TContracts>{};
		for (const [key, value] of Object.entries(contracts)) {
			newContracts[key] = value.connect(signer);
		}
		const user: TSignersAndContracts<U> = { ...signer, ...(newContracts as U) };
		return user;
	}

	static setupSignerAndContract<U extends TContracts,>(signers: SignerWithAddress[], contracts: U): TSignersAndContracts<U>[] {
		const signerAndContracts = signers.map((signer) => {
			return SignerAndContracts.setupUser(signer, contracts);
		});
		return signerAndContracts;
	}
}
