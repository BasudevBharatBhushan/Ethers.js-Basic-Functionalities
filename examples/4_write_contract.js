require('dotenv').config();
const { ethers, Wallet } = require("ethers");

const INFURA_ID = '8bf67e94391e441eb893a6a7b9876f91';
const provider = new ethers.providers.JsonRpcProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`);

const account1 = '0x85b3dB26424a88e7C1319E40a6324d64Acf1fFA2';   //sender
const account2 = '0xaA644EfCDFC1Adaf3CAb69Ae683638f4705F4C81';   //receiver

//Setup Ether Wallet
const wallet = new ethers.Wallet(process.env.PRIVATEKEY , provider);   //passing senders private key

const ERC20_ABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to , uint amount) returns (bool)"
];

const address = '0x01be23585060835e02b77ef475b0cc51aa1e0709';
const contract = new ethers.Contract(address , ERC20_ABI, provider);

const main = async () => {
    const balance = await contract.balanceOf(account1);
    console.log(`\nReading from ${address}\n`)
    console.log(`Balance of sender: ${balance}\n`)

    const contractWithWallet = contract.connect(wallet);
    const tx = await contractWithWallet.transfer(account2 , balance);
    await tx.wait();

    console.log(tx);
}

main()