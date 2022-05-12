const {ethers} = require('ethers');

const INFURA_ID = '8bf67e94391e441eb893a6a7b9876f91';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);  //This protocol is used to establish connection with the ethereum blockchian

const address = 'anshulrustaggi.eth';

const main = async()=>{
    const balance = await provider.getBalance(address);
    console.log(`\nETH Balance of ${address} --> ${ethers.utils.formatEther(balance)} ETH\n`);
}

main()


