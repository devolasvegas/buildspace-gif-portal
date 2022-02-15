import React, {useState, useEffect} from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const [isPhantom, setIsPhantom] = useState(false);
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const solana = window.solana;

      if (solana) {
        if (solana.isPhantom) {
          console.log('Phantom wallet found!');
          setIsPhantom(true);

          const response = await solana.connect({ onlyIfTrusted: true});
          const publicKey = response?.publicKey.toString();

          console.log('Connected with public key:', publicKey);
          setWalletAddress(publicKey);
        }
      } else {
        console.log('Solana object not found. Get a Phantom wallet!')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const connectWallet = async () => {
    const {solana} = window;

    if (solana) {
      const response = await solana.connect();
      const publicKey = response?.publicKey.toString();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  }

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

useEffect( async () => {
  const onload = await checkIfWalletIsConnected();
  window.addEventListener('onload', onload);

  return window.removeEventListener('onload', onload);
}, [])

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
