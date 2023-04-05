export interface TokenMapping {
    [key: string]: Token
}

export interface Token {
    mainnet: NetworkToken,
    arbitrum: NetworkToken,
    optimism: NetworkToken,
    avalanche: NetworkToken,
    decimals: number,
    symbol: string
}

export interface NetworkToken {
    address: string,
    whale: string
}