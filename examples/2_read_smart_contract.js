const { ethers } = require("ethers");

const INFURA_ID = '8bf67e94391e441eb893a6a7b9876f91';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)

const ERC20_ABI = [                            
    'function name() view returns(string)',                //Some imp functions from ABI code
    'function symbol() view returns(string)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address) view returns (uint)',
]

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; //DAI Stable coin smart contract address 
const contract = new ethers.Contract(address , ERC20_ABI, provider);  //Creating instances of the smart contract

const main = async () => {
   name = await contract.name();
   const symbol = await contract.symbol();
   const totalSupply = await contract.totalSupply();

   console.log(`\nReading from ${address}\n`);
   console.log('Name:',name );
   console.log(`Symbol:${symbol}`);
   console.log(`Total Supply: ${totalSupply}`);

   const balance = await contract.balanceOf('0x6c6Bc977E13Df9b0de53b251522280BB72383700')   //smart contract function that requires an argument
   console.log(`Balance Returned: ${balance}`);
   console.log(`Balance Formatted: ${ethers.utils.formatEther(balance)}`);
}

main()