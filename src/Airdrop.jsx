import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  WalletConnectButton,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Airdrop() {
  const wallet = useWallet();
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { connection } = useConnection();

  // Handle wallet address copy
  const copyAddress = () => {
    if (wallet.publicKey) {
      navigator.clipboard.writeText(wallet.publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Handle airdrop request
  const requestAirdrop = async () => {
    if (!wallet.publicKey) return;

    try {
      setIsLoading(true);
      setMessage("");
      let finalAmount = 0;
      finalAmount = amount * 1000000000;
      // Here you would implement the actual airdrop logic
      // This is a placeholder - replace with your actual implementation
      await connection
        .requestAirdrop(wallet.publicKey, finalAmount)
        .then(() => {
          setMessage(`Successfully airdropped ${amount} SOL to your wallet!`);
        });
    } catch (error) {
      console.error("Airdrop failed:", error);
      setMessage(`Airdrop failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-black flex flex-col items-center justify-center p-4"
    >
      <motion.div
        className="bg-gray-900 rounded-xl shadow-2xl p-8 max-w-md w-full backdrop-blur-sm border border-gray-800"
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
          Solana Airdrop
        </h1>

        {wallet.publicKey ? (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3 mb-4">
              <p className="text-gray-300 text-sm truncate">
                {wallet.publicKey.toString()}
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={copyAddress}
                className="ml-2 text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded-md transition-colors"
              >
                {copied ? "Copied!" : "Copy"}
              </motion.button>
            </div>

            {/* Airdrop Request Form */}
            <div className="bg-gray-800 rounded-lg p-4 mb-4">
              <h2 className="text-lg font-medium text-white mb-3">
                Request Airdrop
              </h2>
              <div className="flex items-center space-x-2 mb-3">
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value))}
                  className="bg-gray-700 text-white rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SOL amount"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={requestAirdrop}
                  disabled={isLoading}
                  className={`bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-all ${
                    isLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isLoading ? "Processing..." : "Request"}
                </motion.button>
              </div>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm rounded p-2 ${
                    message.includes("failed")
                      ? "bg-red-900/50 text-red-200"
                      : "bg-green-900/50 text-green-200"
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </div>

            <div className="flex justify-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <WalletDisconnectButton className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors" />
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <WalletMultiButton className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-all" />
            </motion.div>
          </motion.div>
        )}

        <motion.div
          className="text-center text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Connect your wallet to receive your airdrop tokens
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default Airdrop;
