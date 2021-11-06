import useEtherSWR from './useEtherSWR';
import { useMemo } from 'react';
export function useBalanceOf(contractOrContracts, ownerOrOwners) {
    if (Array.isArray(ownerOrOwners) && Array.isArray(contractOrContracts)) {
        throw new Error('Either you pass multiple contracts or multiple owners');
    }
    const key = useMemo(() => {
        const owners = Array.isArray(ownerOrOwners) && typeof contractOrContracts === 'string'
            ? ownerOrOwners.map(own => [contractOrContracts, 'balanceOf', own])
            : undefined;
        const contracts = Array.isArray(contractOrContracts) && typeof ownerOrOwners === 'string'
            ? contractOrContracts.map(cntr => [cntr, 'balanceOf', ownerOrOwners])
            : undefined;
        const keys = owners || contracts || [];
        const singleKey = ownerOrOwners &&
            typeof ownerOrOwners === 'string' &&
            typeof contractOrContracts === 'string'
            ? [contractOrContracts, 'balanceOf', ownerOrOwners]
            : undefined;
        return keys.length > 0 ? keys : singleKey;
    }, [contractOrContracts, ownerOrOwners]);
    return useEtherSWR(key);
}
