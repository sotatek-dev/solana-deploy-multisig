# solana deploy multisig

Tutorial show how to use goki wallet for upgrade program without UI.

## Steps

- deploy program for the first time with an EOA address
- set upgrade authority to goki wallet
- using goki wallet to upgrade program

### deploy program for the first time

```sh
solana program deploy <PROGRAM_FILEPATH>
```

### set upgrade authority

```sh
# create wallet
ts-node scripts/create-goki-wallet.ts

# set authority
solana program set-upgrade-authority <PROGRAM_ADDRESS> --new-upgrade-authority <NEW_UPGRADE_AUTHORITY>
```

### upgrade contract

```sh
# write buffer
solana program write-buffer <PROGRAM_FILEPATH>

# set buffer authority
solana program set-buffer-authority <BUFFER_ADDRESS> --new-buffer-authority <NEW_UPGRADE_AUTHORITY>
# note that buffer authority and program authority are the same

# please modify the params in source code
# create goki tx
ts-node scripts/create-goki-transaction.ts

# approve goki tx
ts-node scripts/approve-goki-transaction.ts

# execute goki tx
ts-node scripts/execute-goki-transaction.ts
```

## References

- https://docs.solana.com/cli/deploy-a-program
- https://github.com/GokiProtocol/goki
