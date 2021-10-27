import useEtherSWR from './useEtherSWR';
function sayName({ first, last = 'Smith' }) {
    const name = first + ' ' + last;
    console.log(name);
}
export function useBalance(address, { block } = { block: 'latest' }) {
    return useEtherSWR(['getBalance', address, block]);
}
export function useBalances(addresses, { block } = { block: 'latest' }) {
    const keys = addresses.map(address => ['getBalance', address, block]);
    return useEtherSWR(keys);
}
