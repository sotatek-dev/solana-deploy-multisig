import { SolanaProvider } from "@saberhq/solana-contrib";
import { GokiSDK } from "@gokiprotocol/client";
import { clusterApiUrl, Connection, Keypair } from "@solana/web3.js";
import NodeWallet from "@project-serum/anchor/dist/cjs/nodewallet";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

export const connection = new Connection(
  process.env.RPC_URL ?? clusterApiUrl("devnet")
);
export const wallet = new NodeWallet(
  Keypair.fromSecretKey(bs58.decode(process.env.DEPLOYER_PRIVATE_KEY ?? ""))
);
export const wallet2 = new NodeWallet(
  Keypair.fromSecretKey(bs58.decode(process.env.DEPLOYER_PRIVATE_KEY_2 ?? ""))
);

export const makeSDK = (): GokiSDK => {
  const provider = SolanaProvider.load({
    connection: connection,
    wallet: wallet,
    opts: { preflightCommitment: "confirmed", commitment: "confirmed" },
  });
  return GokiSDK.load({
    provider,
  });
};

export const makeSDK2 = (): GokiSDK => {
  const provider = SolanaProvider.load({
    connection: connection,
    wallet: wallet2,
    opts: { preflightCommitment: "confirmed", commitment: "confirmed" },
  });
  return GokiSDK.load({
    provider,
  });
};
