import * as Web3 from '@solana/web3.js'

import base58 from 'bs58'

const publicKey = 'qFUogCutdYtUXhHzEmBPxbSsLG1kEaph7tKtRN3y7gw'

const connection = new Web3.Connection(Web3.clusterApiUrl('devnet'))

const PROG_ID = 'GQoEpCfQMGH143PRQLSSCJMCMXb8nxCPVthEEg1Qnc3t'

const PRIVATE_KEY = '4eHCoFz2fVKJHvYH6apxXzrxvBTo4WKDVdG2hhZSk4QWAHaiLRcmoksnLeyof96vnqNXG1tVMmTtej1eb8Qp1aaw'

async function main() {

    const signer = Web3.Keypair.fromSecretKey(base58.decode(PRIVATE_KEY))

    const transaction = new Web3.Transaction()

    const instruction = new Web3.TransactionInstruction({

        keys: [

            {
                pubkey: new Web3.PublicKey(publicKey),

                isSigner: true,

                isWritable: false,
            }

        ],

        data: Buffer.alloc(20),

        programId: new Web3.PublicKey(PROG_ID),

    });

    transaction.add(instruction)

    const signature = await Web3.sendAndConfirmTransaction(

        connection,

        transaction,

        [signer]

    )
    console.log('SIGNATURE', signature)

}
main ()

.then(() => process.exit(0))

.catch(err => {

    console.error(err)

});