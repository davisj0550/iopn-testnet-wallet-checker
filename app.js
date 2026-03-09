const RPC = "https://testnet-rpc.iopn.tech";

const provider = new ethers.providers.JsonRpcProvider(RPC);

const ERC20_ABI=[
"function balanceOf(address owner) view returns (uint256)",
"function decimals() view returns (uint8)"
]

async function scanWallet(){

let wallet=document.getElementById("wallet").value

if(!wallet){

alert("Enter wallet")

return

}

getBalance(wallet)

getTxCount(wallet)

getTokenBalances(wallet)

getNFTMint(wallet)

}

async function getBalance(wallet){

let balance=await provider.getBalance(wallet)

let opn=ethers.utils.formatEther(balance)

document.getElementById("balance").innerHTML=

opn+" OPN"

}

async function getTxCount(wallet){

let tx=await provider.getTransactionCount(wallet)

document.getElementById("txcount").innerHTML=tx

calculateScore(tx,0,0)

}

async function getTokenBalances(wallet){

let output=""

let tokenCount=0

for(let token of TOKENS){

let contract=new ethers.Contract(token.address,ERC20_ABI,provider)

try{

let balance=await contract.balanceOf(wallet)

if(balance>0){

tokenCount++

output+=token.symbol+" : "+balance+"<br>"

}

}catch(e){}

}

if(output===""){

output="No tokens detected"

}

document.getElementById("tokens").innerHTML=output

}

async function getNFTMint(wallet){

const transferTopic=ethers.utils.id("Transfer(address,address,uint256)")

const zeroAddress="0x0000000000000000000000000000000000000000"

const filter={

topics:[transferTopic,null,ethers.utils.hexZeroPad(wallet,32)]

}

try{

let logs=await provider.getLogs(filter)

let minted=logs.length

document.getElementById("nfts").innerHTML=minted

}catch{

document.getElementById("nfts").innerHTML="0"

}

}

function calculateScore(tx,nft,tokens){

let score=tx*2 + nft*5 + tokens*3

document.getElementById("score").innerHTML=score

}
const TOKENS = [
{
name: "USDT",
address: "0x0000000000000000000000000000000000000000",
decimals: 18
}
]
