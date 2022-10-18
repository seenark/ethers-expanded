import { BigNumber, BigNumberish, Bytes, Overrides } from "ethers";

export interface IContractInfo<DeployFn extends (...args: any) => void> {
	address: string;
	rawParameters: Parameters<DeployFn>;
	parameters: TEvmTypes[];
}

// export type IContractFile<Contracts extends BaseFactoryClass[]> = Record<
// 	string,
// 	IContractInfo<Parameters<Contracts[number]["deploy"]>>
// >;

export type IContractFile<ContractKey extends string> = Record<ContractKey, IContractInfo<BaseFactoryClass["deploy"]>>;

// type TOverrides = (Overrides & { from?: PromiseOrValue<string> }) | undefined;
export type TEvmTypes = "string" | "number" | Bytes;

interface BaseFactoryClass {
	deploy: (...args: any[]) => Promise<any>;
}

interface BaseContract<Contract> {
	attach: (address: string) => Contract;
}

export type TFactoryParams<Factory extends BaseFactoryClass> = Parameters<Factory["deploy"]>;
export type TDeployedContract<Factory extends BaseFactoryClass> = Awaited<ReturnType<Factory["deploy"]>>;

export abstract class DeploymentFactory<Factory extends BaseFactoryClass & BaseContract<TDeployedContract<Factory>>,> {
	public abstract factory: Factory;
	constructor(protected params: TFactoryParams<Factory>) {}

	private getOldContract(address: string): TDeployedContract<Factory> {
		return this.factory.attach(address);
	}

	private async New(): Promise<TDeployedContract<Factory>> {
		return this.factory.deploy(...this.params);
	}

	//   abstract getContract(address?: string): Promise<{
	//     contract: TDeployedContract<Factory>;
	//     info: IContractInfo<TFactoryParams<Factory>>;
	//   }>;
	public async getContract(address?: string): Promise<{
		contract: TDeployedContract<Factory>;
		info: IContractInfo<Factory["deploy"]>;
	}> {
		// console.log("address", address);
		if (address === undefined) {
			const contract = await this.New();
			return {
				contract,
				info: {
					address: contract.address,
					parameters: this.getParams(),
					rawParameters: this.params,
				},
			};
		} else {
			const contract = this.getOldContract(address);
			return {
				contract,
				info: {
					address,
					parameters: this.getParams(),
					rawParameters: this.params,
				},
			};
		}
	}

	getParams() {
		const params = this.params.map((p) => {
			if (typeof p === "string") {
				return p;
			}
			if (typeof p === "number") {
				return p;
			}
			if (p instanceof BigNumber) {
				return p.toString();
			} else {
				return p;
			}
		});
		// console.log("new params", params);
		return params;
	}
}
