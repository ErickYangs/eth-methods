import React, { useEffect, useState } from 'react';
import './App.css';
import { Layout, message } from 'antd';
import HeadInfo from "./views/HeadInfo";
import dapp from "./utils/dapp";
import BorrowLay from "./views/Borrow";
import SupplyLay from "./views/Supply";
import InsuranceLay from "./views/Insurance";


const { Header, Content } = Layout;

function App() {
  const [account, setAccount] = useState<string>('');
  const handlerCollectMetaMask = () => {
    // @ts-ignore
    if (typeof window.ethereum === 'undefined') {
      message.error('未安装 MetaMask')
    } else {
      // @ts-ignore
      window.ethereum.enable()

        // 如果用户拒绝了登录请求
        .catch((reason: string) => {
          if (reason === 'User rejected provider access') {
            // 用户不想登录，你看该怎么办？
            message.warn('已取消登录')
          } else {
            // 本不该执行到这里，但是真到这里了，说明发生了意外
            message.error('登录出错')
          }
        })
        // 如果用户同意了登录请求，你就可以拿到用户的账号
        .then(async (accounts: string[]) => {
          // You also should verify the user is on the correct network:
          console.log(accounts, 'accounts');
          setAccount(accounts[0])
          try {
            await dapp.loadClient();
          } catch (e) {
            console.log(e);
          }
          initEvent();
        });
    }
  }

  const initEvent = () => {
    console.log('dapp.client', dapp.client);
    // @ts-ignore
    window.ethereum.on('accountsChanged', (accounts: array) => {
      console.log('accountsChanged', accounts[0]);
      message.warn('Accounts Changed')
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    });
    // @ts-ignore
    window.ethereum.on('networkChanged', (result) => {
      console.log('networkChanged', result);
      message.warn('Network Changed')
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    });
    // @ts-ignore
    window.ethereum.on('connect', (result) => {
      console.log('connect', result);
      message.info('Connect success')
    });
    // @ts-ignore
    window.ethereum.on('disconnect', (result) => {
      console.log('disconnect', result);
      message.warn('Disconnect')
      // eslint-disable-next-line no-restricted-globals
      location.reload()
    });
    // @ts-ignore
    window.ethereum.on('message', (result) => {
      console.log('message', result);
    });
  }

  useEffect(() => {
    handlerCollectMetaMask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className="App body-content">
      <Layout>
        <Header><HeadInfo account={account} /></Header>
        <Content>
          <SupplyLay address={account} />
          <BorrowLay />
          <InsuranceLay address={account} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
