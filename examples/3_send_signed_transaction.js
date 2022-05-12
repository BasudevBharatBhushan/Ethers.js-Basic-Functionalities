require('dotenv').config();
const { ethers, Wallet } = require("ethers");

const INFURA_ID = '8bf67e94391e441eb893a6a7b9876f91';
const provider = new ethers.providers.JsonRpcProvider(`https://ropsten.infura.io/v3/${INFURA_ID}`);

const account1 = '0x85b3dB26424a88e7C1319E40a6324d64Acf1fFA2';   //sender
const account2 = '0xaA644EfCDFC1Adaf3CAb69Ae683638f4705F4C81';   //receiver

//Setup Ether Wallet
const wallet = new ethers.Wallet(process.env.PRIVATEKEY , provider);   //passing senders private key

const main = async () => {
//Show account 1 balance before transfer
    const senderBalanceBefore = await provider.getBalance(account1);
//Show account 2 balance before transfer
    const recieverBalanceBefore = await provider.getBalance(account2);

    console.log(`\nSender balance before: ${ethers.utils.formatEther(senderBalanceBefore)}`)
    console.log(`reciever balance before: ${ethers.utils.formatEther(recieverBalanceBefore)}\n`)

    //send Ether
   const tx = await wallet.sendTransaction({
       to:account2, 
       value: ethers.utils.parseEther("0.025")
    })

    //Fetch Transaction
    await tx.wait()  //Wait for txn to be mined
    console.log(tx);

//Show account 1 balance after transfer
const senderBalanceAfter = await provider.getBalance(account1);
//Show account 2 balance after transfer
const recieverBalanceAfter = await provider.getBalance(account2);

console.log(`\nSender balance after: ${ethers.utils.formatEther(senderBalanceAfter)}`)
console.log(`reciever balance after: ${ethers.utils.formatEther(recieverBalanceAfter)}\n`)

}

main()