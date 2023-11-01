import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';

// load env vars
dotenv.config();

// Update those values in the .env file
const { UP_ADDR, PRIVATE_KEY } = process.env;

async function main() {

    // setup provider
    const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.gateway.fm');
    // setup signer (the browser extension controller)
    const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);

    let UP = new ethers.Contract(UP_ADDR as string, UP_ABI, provider);

    console.log('🔑 EOA: ', signer.address);
    console.log('🆙 Universal Profile: ', await UP.getAddress());


    UP.on("UniversalReceiver", (from, value, typeId, receivedData, returnedData) => {
        console.log(`The UniversalReceiver was called by ${from} passing ${value} value, to notify about ${typeId} with  these ${receivedData} data`);
    })


}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });