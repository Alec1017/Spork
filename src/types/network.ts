import { NATIVE_TOKEN } from '../utils/constants'

export interface networkConfigMapping {
    [key: string]: NetworkConfig
}

export interface NetworkConfig {
    port: number,
    token: NATIVE_TOKEN
}