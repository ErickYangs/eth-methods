import dapp from "./dapp";
import BigNumber from "bignumber.js";

BigNumber.set({
  EXPONENTIAL_AT: [-50, 50],
  DECIMAL_PLACES: 30
});

export const findAbiParamter = (arr: Array<any> = [], a: string, b: string, a1: string, b1: string) => {
  return arr.find(item => item[a] === a1 && item[b] === b1)
}

export const comptrollerAddress = '0x73B6DA765D4acBA261190095DC6Bbec111C26445\n';

// underlying token / OToken
// ctoken / FToken

export const tokenDemo1 = {
  type: 'ERC20',
  OToken: '0xC355dA16DA42B3083D6548dbe4B54481Dde40278',
  FToken: '0xE2E68B83A982CEb817FA5B0495E546d2ca2B0966',
  float: 18
}

export const tokenDemo2 = {
  type: 'ERC20',
  OToken: '0x9Eb481D66Ea35E6f4b430ACB8A1e5Fb12b3DcD85',
  FToken: '0x27F9dBbF3Fc48bbe3d28D8A6873DbAC0F44A0440',
  float: 18
}

export const pWing = {
  type: 'ERC20',
  OToken: '0xD87e571d678B67dF382e4FC6f6438a45fE2688aa',
  IToken: '0xe8F4Db91564d08Eb85626fe4EC83601080F82E32',
  float: 9
}

export const ethToken = {
  type: 'ETH',
  FToken: '0xbFF7243a4ef624a61Cd340766cfcce766b325621'
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
