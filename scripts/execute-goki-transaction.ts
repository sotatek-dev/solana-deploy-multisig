import { PublicKey } from "@solana/web3.js";
import { makeSDK, wallet } from "./workspace";

(async () => {
  console.log("Execute a multisig transaction");

  const walletAccount = new PublicKey(
    "4GPLDHhLSpR3U88ncaXmajHry3PkwntzVxWAgxkEGhFs"
  );
  const transactionAccount = new PublicKey(
    "8k3UnLzGX6jdxMEQc8rjngxmGAzadJgVHQ9nta4bEVnd"
  );

  const sdk = makeSDK();
  const smartWalletWrapper = await sdk.loadSmartWallet(walletAccount);
  const tx = await smartWalletWrapper.fetchTransaction(transactionAccount);
  console.log({ tx });

  const executeTx = await smartWalletWrapper.executeTransaction({
    transactionKey: transactionAccount,
    owner: wallet.publicKey,
  });
  executeTx.signers.push(wallet.payer);

  const pendingTx = await executeTx.send();
  console.log({
    txHash: pendingTx.signature,
  });
})();
