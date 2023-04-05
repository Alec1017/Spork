import * as dotenv from "dotenv"

import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { tokens, transferTokens, header } from './utils'
import erc20ABI from './abis/ERC20.json'
import chalk from 'chalk'
import { NetworkToken } from './types/tokens'
import { NETWORK } from './utils/constants'

dotenv.config()

export const supplyTokens = async (
    hre: HardhatRuntimeEnvironment, 
    toAccount?: string, 
    selectedTokens?: string[]
) => {

    // display logo
    header()

    const tokenAmount = '100'
    const envNetwork = process.env.NETWORK as string
    const activeNetwork: string = envNetwork ? envNetwork : NETWORK.MAINNET

    // determine receiver of funds
    const [signer] = await hre.ethers.getSigners()
    const receiverAddress = toAccount ? toAccount : signer.address
    
    console.log(`Supplying tokens to ${chalk.yellow(receiverAddress)} on ${chalk.yellow(activeNetwork)}...`)
    console.log('')

    // filter the tokens to supply to the receiver
    const tokensToSupply = selectedTokens == undefined
        ? Object.values(tokens)
        : Object.values(tokens).filter(token => selectedTokens.includes(token.symbol))
 
    for (let token of tokensToSupply) {

        const networkToken: NetworkToken = (token as any)[activeNetwork]

        if (networkToken.address !== '') {
            await transferTokens(
                networkToken.address, 
                networkToken.whale, 
                receiverAddress, 
                hre.ethers.utils.parseUnits(tokenAmount, token.decimals), 
                hre.ethers.provider,
                hre
            )
    
            const tokenContract = new hre.ethers.Contract(
                networkToken.address, 
                erc20ABI,
                hre.ethers.provider
            )
        
            const tokenBalance = await tokenContract.balanceOf(receiverAddress)
    
            if (tokenBalance <= 0) {
                throw new Error(`Unable to transfer ${tokenAmount} ${token.symbol} to ${receiverAddress}`)
            }
    
            console.log(`   Supplied ${tokenAmount} ${chalk.green.bold(token.symbol)}`)
        }
    }

    console.log('')
    console.log(chalk.cyan.bold(`    All done! 🎉`))
}