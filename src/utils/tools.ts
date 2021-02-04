import dapp from "./dapp";
import BigNumber from "bignumber.js";

BigNumber.set({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 30
});

export const findAbiParamter = (arr: Array<any> = [], a: string, b: string, a1: string, b1: string) => {
  return arr.find(item => item[a] === a1 && item[b] === b1)
}

export const comptrollerAddress = '0xc83CCFDAADc6aDAb82fb5b7A27563A1BA50D2d57';

// underlying token / OToken
// ctoken / FToken

export const tokenDemo1 = {
  type: 'ERC20',
  OToken: '0xD82a57FAfB08f6Dd0cBFa87bf05103A54ba1b162',
  FToken: '0xAcEe55c649b854f5Da76620CeA6e175E5b2AAE0e',
  float: 18
}

export const tokenDemo2 = {
  type: 'ERC20',
  OToken: '0x240AC599611B20906E7fd58E1203D92271e7B444',
  FToken: '0x0a6ece7Ba3403D37642DB2E3D1D0Bf3234724554',
  float: 18
}

export const pWing = {
  type: 'ERC20',
  OToken: '0x04F6677Fc2F68Bbd7e0608396D5584750A69e3aC',
  IToken: '0x8CB3dA33c0bD24EF08E05D3c6C06654c5d568597',
  float: 9
}

const ERC20_ABI =
  '[{"inputs":[{"internalType":"address","name":"lockProxyContractAddress","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]';

export const approveAction = async (account: string = '', underlying_address: string, lock_address: string, float: number = 18) => {
  console.log('account', account)
  console.log('underlying_address', underlying_address)
  console.log('lock_address', lock_address)
  const web3 = dapp.client;
  let abiStr = ERC20_ABI;
  // @ts-ignore
  const Coin = new web3.eth.Contract(JSON.parse(abiStr), underlying_address);
  const tokenAmountToApprove = new BigNumber(9999999999)
    .shiftedBy(Number(float))
    .toString();
  console.log('tokenAmountToApprove', tokenAmountToApprove)
  const tx = await Coin.methods
    .approve(lock_address, tokenAmountToApprove)
    .send({
      from: account
    });
  console.log("tx", tx);
  return {
    tx
  }
}

export const sendETHTransaction = async (account: string = '', contract: string = '', abiItem: object = {},params: object = [] ) => {
  console.log("send");
  console.log("account", account);
  console.log("contract", contract);
  console.log("abiItem", abiItem);
  console.log('params', params)
  const web3 = dapp.client;
  // @ts-ignore
  const data = await web3.eth.abi.encodeFunctionCall(abiItem, params)
  // @ts-ignore
  const nonce = await web3.eth.getTransactionCount(account)
  // @ts-ignore
  const gasPrice = await web3.eth.getGasPrice()
  let signParams = {
    from: account || '',
    to: contract,
    value: '',
    gas: 200000,
    gasPrice,
    data,
    nonce
  }
  console.log('signParams', signParams)
  return new Promise((resolve, reject) => {
    // @ts-ignore
    web3.eth
      .sendTransaction(signParams)
      .on("transactionHash", (res: any) => {
        console.log("res1", res);
        if (res.indexOf("0x") > -1) {
          resolve(res);
        } else {
          reject({
            err: res
          });
        }
      })
      .on("error", (err: any) => {
        console.log("err2", err);
        reject({
          err
        });
      });
  });
}

export const approveCheck = async (account: string = '', underlying_address: string, lock_address: string, float: number = 18) => {
  const web3 = dapp.client;
  let usdtabiStr = ERC20_ABI;
  // @ts-ignore
  const Coin = new web3.eth.Contract(
    JSON.parse(usdtabiStr),
    underlying_address
  );
  const balance = await Coin.methods
    .allowance(account, lock_address)
    .call();
  console.log("balance", balance);
  const minTokenAmountToApprove = new BigNumber("0")
    .shiftedBy(Number(float))
    .toString();
  if (Number(balance) === Number(minTokenAmountToApprove)) {
    return {
      flag: false,
      balance
    };
  } else {
    return {
      flag: true,
      balance
    };
  }
}
