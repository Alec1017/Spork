import * as dotenv from "dotenv"

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import chalk from 'chalk'

import { NETWORK } from './utils/constants'

dotenv.config()

export const node = async (hre: HardhatRuntimeEnvironment, args: any, runSuper: any) => {

    const envNetwork = process.env.NETWORK as string

    let network: string = envNetwork ? envNetwork : NETWORK.MAINNET

    console.log(`\nRunning node for ${chalk.yellow(network)}...\n`)

    switch (network) {
        case NETWORK.ARBITRUM:
            hre.config.networks.hardhat.forking!.url = `https://arbitrum-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
            hre.config.networks.hardhat.chainId = 31338
            args.port = 8546
            break
        case NETWORK.AVALANCHE:
            hre.config.networks.hardhat.forking!.url = 'https://api.avax.network/ext/bc/C/rpc'
            hre.config.networks.hardhat.chainId = 31339
            args.port = 8547
            break
        default:
            // default to mainnet
            break
    }
    
    await runSuper()
}