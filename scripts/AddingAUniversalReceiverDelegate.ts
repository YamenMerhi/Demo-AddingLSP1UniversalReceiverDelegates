import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { ERC725YDataKeys, LSP1_TYPE_IDS } from '@lukso/lsp-smart-contracts';

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

    const typeIdLSP7Recipient = LSP1_TYPE_IDS.LSP7Tokens_RecipientNotification;
    const constructedDataKey = ERC725YDataKeys.LSP1.LSP1UniversalReceiverDelegatePrefix + typeIdLSP7Recipient.substring(2, 42);

    // The address of the deployed URD
    const UniversalReceiverDelegateAddress = "0x..."

    const tx = await UP.connect(signer).setData(constructedDataKey, UniversalReceiverDelegateAddress);
    await tx.wait();

}

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });