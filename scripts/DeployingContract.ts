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


    const myToken = await new MyToken__factory(signer).deploy({ gasLimit: 20_000_000 });
    console.log(myToken.target);

    const urd = await new UniversalReceiverDelegate__factory(signer).deploy({ gasLimit: 20_000_000 });
    console.log((urd.target));
}


main()
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });