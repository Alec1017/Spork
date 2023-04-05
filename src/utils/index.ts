import chalk from 'chalk'

import { NETWORK_CONFIG, NETWORK } from './constants'
import { NetworkConfig } from '../types/network'

export * from './addresses'
export * from './transfers'
export * from './constants'

// outputs the Spork logo
export const header = (): void => {
    console.log(`             
    _____                  __  
   / ___/____  ____  _____/ /__
   \\__ \\/ __ \\/ __ \\/ ___/ //_/
  ___/ / /_/ / /_/ / /  / ,<   
 /____/ .___/\\____/_/  /_/|_|  
     /_/                       
 
 `)
}

// when using hex strings to send values via hardhat's provider methods,
// the hex strings cannot have leading 0's after the 0x
export const sanitizeHexString = (hexString: string): string => {
    let [_, hexValue] = hexString.split('0x')

    // if theres a 0 after the 0x, remove it
    if (hexValue[0] == '0') {
        hexValue = hexValue.substring(1)
    } 

    return '0x' + hexValue
}

// retrieves the configuration data of the current network
export const getNetworkConfig = (network: string): NetworkConfig => {

    const networkConfig = NETWORK_CONFIG[network as NETWORK]

    if (!networkConfig) {
        throw new Error(`network ${chalk.red.bold(network)} is not supported`)
    } 

    return networkConfig
}