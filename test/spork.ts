import { expect, use } from 'chai'
import { ethers } from 'hardhat'
import { solidity } from 'ethereum-waffle'

import erc20ABI from '../src/abis/ERC20.json'
import { tokens } from '../src/utils/addresses'
import { transferTokens } from './shared/utilities'

use(solidity)


describe('Spork test', () => {

    let signer: any
    let tokenAmount: string = '1000'

    before(async () => {
        [signer] = await ethers.getSigners()
    })

    it('should give a positive balance for all tokens', async () => {

        // supply each token to the recipient
        for (let token of Object.values(tokens)) {
            await transferTokens(
                token.address, 
                token.whale, 
                signer.address, 
                ethers.utils.parseUnits(tokenAmount, token.decimals), 
                ethers.provider
            )

            const tokenContract = new ethers.Contract(
                token.address, 
                erc20ABI,
                ethers.provider
            )
        
            const tokenBalance = await tokenContract.balanceOf(signer.address)

            expect(tokenBalance).gt(0)
            console.log(`Supplied ${tokenAmount} ${token.symbol} to ${signer.address}` )
        }

        // validate that each token has a positive balance
        for (let token of Object.values(tokens)) {
            const tokenContract = new ethers.Contract(
                token.address, 
                erc20ABI,
                ethers.provider
            )
        
            const tokenBalance = await tokenContract.balanceOf(signer.address)

            expect(tokenBalance).gt(0)
        }
    })
})