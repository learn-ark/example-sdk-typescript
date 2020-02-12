import {Transactions , Managers, Utils} from "@arkecosystem/crypto";
import { Connection } from "@arkecosystem/client";

/**
 *  Simple example of a transfer transaction using
 *  @arkecosystem/crypto https://github.com/ArkEcosystem/core/tree/develop/packages/crypto
 *
**/

Managers.configManager.setHeight(4006000);

const senderWalletAddress = "D8rr7B1d6TL6pf14LgMz4sKp1VBMs6YUYD";
const recipientWalletAddress = "DBoKkzKAT6YdXhyv1mvcKEg97JxiRqMuK2";

const senderPassphrase = "master dizzy era math peanut crew run manage better flame tree prevent";

const initTransaction = async () => {
    // This is where we make connection to the node
    const connection: Connection = new Connection("https://dexplorer.ark.io/api/v2");
    // This is where we get wallets data using typescript-client
    const response = await connection.api("wallets").get(senderWalletAddress);
    // This is where we increment nonce by one using Utils bigNumber
    const nonce = Utils.BigNumber.make(response.body.data.nonce).plus(1);
    // This is where we build our transfer transaction
    const trx = Transactions.BuilderFactory.transfer()
        .version(2)
        .nonce(String(nonce))
        .amount("1")
        .recipientId(recipientWalletAddress)
        .sign(senderPassphrase);
    // Here we build our transaction and put it to json format
    const transaction = trx.build().toJson();
    // This is where we post our transaction to the connected node
    const post = await connection.api("transactions").create({ transactions: [transaction] } );

    console.log(post.body);
};

initTransaction();


