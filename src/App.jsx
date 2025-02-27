import React from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

// Default styles that can be overridden by your app
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import Airdrop from "./Airdrop";
const devnetendpoint =
  "https://magical-capable-scion.solana-devnet.quiknode.pro/f0fafd3ed13c4959a408dc115af932dcd17bafa8"; // move this to env
function App() {
  return (
    <ConnectionProvider endpoint={devnetendpoint}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
