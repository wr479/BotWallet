import Web3 from "web3";
import { ethers } from 'ethers';


const web3 = new Web3("https://ftm.getblock.io/04a5c60a-c0fc-4a55-a852-fbc9b06ee732/testnet/");
const wssUrl = "wss://ftm.getblock.io/04a5c60a-c0fc-4a55-a852-fbc9b06ee732/testnet/";
const router = ""; //Uniswap v3 SwapRouter

const privateKey = ""

const value = 0.5; // replace with the value you want to convert to Wei
const weiValue = ethers.utils.parseEther(value.toString());
console.log(weiValue.toString());
 // преобразование в десятичное число


async function main() {
    const provider = new ethers.providers.WebSocketProvider(wssUrl);
    provider.on('pending', async (tx) => {
        const txnData = await provider.getTransaction(tx);  
        console.log(parseInt(txnData.gasPrice._hex,16)*1.1)
        console.log(txnData.gasLimit)
        if (txnData.from == router) {
            console.log(txnData)
           
            const signer = new ethers.Wallet(privateKey, provider);

            
           
                const tx = {
                to: "",
                value: weiValue,
                gasLimit: txnData.gasLimit,
                gasPrice: (parseInt(txnData.gasPrice._hex,16)*1.2),
                nonce: txnData.nonce
                
               };

               
             async function net (){   // Send the transaction 
                const sendPromise = await signer.sendTransaction(tx);
                console.log(sendPromise)
               
            }
               

net()
                
         
            }
        else{
            console.log("There is no transaction ")
        }
        } 
    )}


 
main();