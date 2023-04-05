import "@nomiclabs/hardhat-ethers"
import * as dotenv from "dotenv"

import { supplyTokens, supplyNative } from './src'
import { HardhatUserConfig } from "hardhat/types"
import { task } from 'hardhat/config'
import { TASK_NODE } from 'hardhat/builtin-tasks/task-names'
import { node } from "./src/node"
import { getNetworkConfig } from './src/utils'

dotenv.config()

task('supply-tokens', 'supplies tokens to a given address')
    .addOptionalParam("account", "Account to send funds to")
    .addOptionalParam('tokens', 'Tokens to supply to the account')
    .setAction(async (args, hre) => {
        await supplyTokens(hre, args.account, args.tokens)
})

task('supply-native', 'supplies native tokens to a given address')
    .addOptionalParam('account', 'Account to send funds to')
    .addOptionalParam('amount', 'Amount of native token to send')
    .setAction(async ({ account, amount }, hre) => {
        await supplyNative(hre, account, amount)
    })

task(TASK_NODE)
    .setAction(async (args, hre, runSuper) => {
        await node(hre, args, runSuper)
    })

const config: HardhatUserConfig = {
    solidity: "0.7.6",
    networks: {
        hardhat: {
            forking: {
                url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`
            },
            chainId: 31337
        },
        localhost: {
            url: `http://127.0.0.1:${getNetworkConfig(process.env.NETWORK as string).port}`
        }
    },
    defaultNetwork: 'localhost',
    mocha: {
        timeout: 200000,
    },
}

export default config
