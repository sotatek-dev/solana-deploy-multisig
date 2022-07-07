import { PublicKey } from "@solana/web3.js";
import { createUpgradeInstruction } from "./create-upgrade-instruction";
import { makeSDK, wallet } from "./workspace";

(async () => {
  console.log("Creating a multisig transaction");

  const walletAccount = new PublicKey(
    "4GPLDHhLSpR3U88ncaXmajHry3PkwntzVxWAgxkEGhFs"
  );
  const bufferAccount = new PublicKey(
    "GCQhh88yfTh4sFhFDwf3umgKf2JkjQujARnffJAV4Loo"
  );

  const programAccount = new PublicKey(
    "m9rK5gRg6kfnV8yLpQp9nA4N33MuunbD22X1LSQk9Be"
  );

  const instruction = await createUpgradeInstruction(
    programAccount,
    bufferAccount,
    walletAccount,
    wallet.publicKey
  );
  const sdk = makeSDK();

  const smartWalletWrapper = await sdk.loadSmartWallet(walletAccount);
  const { transactionKey, tx: proposeTx } =
    await smartWalletWrapper.newTransaction({
      proposer: wallet.publicKey,
      instructions: [instruction],
    });
  proposeTx.signers.push(wallet.payer);

  const pendingTx = await proposeTx.send();
  console.log({
    txHash: pendingTx.signature,
    transactionKey: transactionKey.toBase58(),
  });
})();
