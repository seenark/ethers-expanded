import fs from "fs-extra";

import { IContractFile } from "../DeploymentFactory";
import { TNetwork } from "../network";

export async function writeContractAddressToFile<ContractKey extends string, Network extends string>(
	contractAddressesTofile: IContractFile<ContractKey>,
	networkName: TNetwork<Network>,
	directory: string,
	toTS: boolean = true,
) {
	try {
		const text = `export default ${JSON.stringify(contractAddressesTofile)}`;
		if (toTS) {
			const filename = `${directory}/${networkName}.ts`;
			await fs.writeFile(filename, text);
		} else {
			const filename = `${directory}/${networkName}.json`;
			await fs.writeJSON(filename, text);
		}
	} catch (error) {
		console.error(`not found json for specify network: ${networkName}`, error);
	}
}
