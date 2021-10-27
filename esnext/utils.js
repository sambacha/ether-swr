import { Contract } from '@ethersproject/contracts';
export const contracts = new Map();
export function getContract(address, abi, signer) {
    let contract = contracts.get(address);
    if (contract) {
        return contract;
    }
    contract = new Contract(address, abi, signer);
    contracts.set(address, contract);
    return contract;
}
