import * as dotenv from "dotenv"

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import chalk from 'chalk'
import { BigNumber } from 'ethers'
import { header, sanitizeHexString, getNetworkConfig } from './utils'

dotenv.config()

export const supplyNative = async (
    hre: HardhatRuntimeEnvironment, 
    toAccount?: string, 
    amount?: number
) => {

    // display logo
    header()

    const tokenAmount = amount ? amount : '100'
    const networkConfig = getNetworkConfig(process.env.NETWORK as string)

    const [signer] = await hre.ethers.getSigners()
    const receiverAddress = toAccount ? toAccount : signer.address

    const currentBalance: BigNumber = await hre.ethers.provider.getBalance(receiverAddress)
    const newBalance: BigNumber = currentBalance.add(hre.ethers.utils.parseUnits(tokenAmount.toString(), 18))
    
    console.log(`Supplying ${tokenAmount} ${networkConfig.token} to ${chalk.yellow(receiverAddress)}...`)
    console.log('')
    
    // give the holder address 1 native token for deployments and sending txs
    await hre.network.provider.send("hardhat_setBalance", [
        receiverAddress,
        sanitizeHexString(newBalance.toHexString())
    ])

    console.log(`   Supplied ${tokenAmount} ${chalk.green.bold(networkConfig.token)}`)

    console.log('')
    console.log(chalk.cyan.bold(`    All done! 🎉`))
}