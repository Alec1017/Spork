import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { BigNumber } from 'ethers'
import erc20ABI from '../abis/ERC20.json'

// transfers an amount of tokens from the holder to the receiver
export const transferTokens = async (
    tokenAddress: string,
    holder: string,
    receiver: string,
    amount: BigNumber,
    provider: any,
    hre: HardhatRuntimeEnvironment
) => {
    // impersonate the holder account
    await hre.network.provider.request({
        method: "hardhat_impersonateAccount",
        params: [holder]
    })

    // give the holder address 1 native token for deployments and sending txs
    await hre.network.provider.send("hardhat_setBalance", [
        holder,
        "0xde0b6b3a7640000"
    ])

    // get the signer from the address
    const signer = await provider.getSigner(holder)

    // get a token contract instance
    const token = new hre.ethers.Contract(tokenAddress, erc20ABI, signer)

    // transfer tokens from the holder to the receiver
    await token.transfer(receiver, amount)
}
