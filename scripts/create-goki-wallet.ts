import { Keypair, PublicKey } from "@solana/web3.js";
import { BN } from "@project-serum/anchor";
import { makeSDK } from "./workspace";

(async () => {
  console.log("Creating goki smart wallet");
  const sdk = makeSDK();
  const smartWalletBase = Keypair.generate();

  const owners = [
    new PublicKey("4sJUUY7jQCYpLYXQRizbRvzYnp4Aaep5WLNAq1ueh9ZZ"),
    new PublicKey("F3PwpjjRK6ENxtGP6CXWdQrx6x2kdobKCvDcTc4Bh8rF"),
  ];
  const numOwners = owners.length;
  const threshold = new BN(numOwners);

  const { smartWalletWrapper: wrapperInner, tx } = await sdk.newSmartWallet({
    numOwners,
    owners,
    threshold,
    base: smartWalletBase,
  });

  const pendingTx = await tx.send();
  console.log({
    wallet: smartWalletBase.publicKey.toBase58(),
    txHash: pendingTx.signature,
  });
})();
