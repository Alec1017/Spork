import { networkConfigMapping } from '../types/network'

export enum NETWORK {
    MAINNET = 'mainnet',
    ARBITRUM = 'arbitrum',
    OPTIMISM = 'optimism',
    AVALANCHE = 'avalanche'
}

export enum NATIVE_TOKEN {
    ETH = 'ETH',
    AVAX = 'AVAX'
}

export const NETWORK_CONFIG: networkConfigMapping = {
    [NETWORK.MAINNET]:   {
        port: 8545,
        token: NATIVE_TOKEN.ETH
    },
    [NETWORK.ARBITRUM]:  {
        port: 8546,
        token: NATIVE_TOKEN.ETH
    },
    [NETWORK.AVALANCHE]: {
        port: 8547,
        token: NATIVE_TOKEN.AVAX
    },
    [NETWORK.OPTIMISM]:  {
        port: 8548,
        token: NATIVE_TOKEN.ETH
    },
}