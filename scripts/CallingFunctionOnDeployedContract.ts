import { ethers } from 'hardhat';
import * as dotenv from 'dotenv';
import { abi as UP_ABI } from '@lukso/lsp-smart-contracts/artifacts/UniversalProfile.json';
import { MyToken__factory, UniversalReceiverDelegate__factory } from '../typechain-types';

// load env vars
dotenv.config();

// Update those values in the .env file
const { UP_ADDR, PRIVATE_KEY } = process.env;

async function main() {

    // setup provider
    const provider = new ethers.JsonRpcProvider('https://rpc.testnet.lukso.network');
    // setup signer (the browser extension controller)
    const signer = new ethers.Wallet(PRIVATE_KEY as string, provider);

    const deployedContractAddress = "0x...";

    // let abi = ["function mint(address)"];
    // let myToken = new ethers.Contract(deployedContractAddress, abi, provider);


    // const recipientAddress = "0x.."
    // const tx = await myToken.connect(signer).mint(recipientAddress, { gasLimit: 400_000 });
    // await tx.wait();

    // const abi = ["function changeWhitelisting(address token, bool status)"]
    // let myUniversalReceiverDelegate = new ethers.Contract(deployedContractAddress, abi, provider);

    // const addressToWhitelist = "0x..."
    // const tx = await myUniversalReceiverDelegate.connect(signer).changeWhitelisting(addressToWhitelist, true);
    // await tx.wait();



}


main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });