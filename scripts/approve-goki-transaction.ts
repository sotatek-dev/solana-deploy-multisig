import { PublicKey } from "@solana/web3.js";
import { makeSDK2, wallet2 } from "./workspace";

(async () => {
  console.log("Approve a multisig transaction");

  const walletAccount = new PublicKey(
    "4GPLDHhLSpR3U88ncaXmajHry3PkwntzVxWAgxkEGhFs"
  );
  const transactionAccount = new PublicKey(
    "8k3UnLzGX6jdxMEQc8rjngxmGAzadJgVHQ9nta4bEVnd"
  );

  const sdk2 = makeSDK2();
  const smartWalletWrapper = await sdk2.loadSmartWallet(walletAccount);
  const approveTx = await smartWalletWrapper.approveTransaction(
    transactionAccount,
    wallet2.publicKey
  );
  approveTx.signers.pop();
  approveTx.signers.push(wallet2.payer);

  const pendingTx = await approveTx.send();
  console.log({
    txHash: pendingTx.signature,
  });
})();
