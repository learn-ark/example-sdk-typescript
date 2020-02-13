import {Transactions , Managers, Utils} from "@arkecosystem/crypto";
import { Connection } from "@arkecosystem/client";

/**
 *  Simple example of a transfer transaction using
 *  @arkecosystem/crypto https://github.com/ArkEcosystem/core/tree/develop/packages/crypto
 *
**/

Managers.configManager.setHeight(4006000);

const transferTransaction = async () => {
    // Here we initialize senderWalletAddress, recipientWalletAddress and senderPassphrase
    const senderWalletAddress = "D8rr7B1d6TL6pf14LgMz4sKp1VBMs6YUYD";
    const recipientWalletAddress = "DBoKkzKAT6YdXhyv1mvcKEg97JxiRqMuK2";

    const senderPassphrase = "master dizzy era math peanut crew run manage better flame tree prevent";

    // This is where we make connection to the node
    const connection: Connection = new Connection("https://dexplorer.ark.io/api/v2");
    // This is where we get wallets data using typescript-client
    const response = await connection.api("wallets").get(senderWalletAddress);
    // This is where we increment nonce by one using Utils bigNumber
    const nonce = Utils.BigNumber.make(response.body.data.nonce).plus(1);
    // This is where we make our transfer transaction
    const trx = Transactions.BuilderFactory.transfer()
        .version(2)
        .nonce(String(nonce))
        .amount("100")  // amount of arktoshis we want to send
        .recipientId(recipientWalletAddress)
        .sign(senderPassphrase);
    // Here we build our transaction and put it to json format
    const transaction = trx.build().toJson();
    // This is where we post our transaction to the connected node
    const post = await connection.api("transactions").create({ transactions: [transaction] } );

    console.log(post.body);
};

const multipaymentTransaction = async () => {
    // Here we initialize data for multiPayment
    const senderWalletAddress = "DBoKkzKAT6YdXhyv1mvcKEg97JxiRqMuK2";
    const senderPassphrase = "blanket swing carpet interest assault mom you fault float cave category cradle";
    // recipient 1
    const recipient1 = "DGLf3ARUbBsfw4y1CLhwxGY1G4oEmixNAC";
    // recipient 2
    const recipient2 = "DJjJNRnDB34KALnNsHh3huRmqcSUvaoa9v";
    // recipient 3
    const recipient3 = "D6fnPjL5Jchn7ct9EfZc34mBSmg9kyPPmy";

    // This is where we make connection to the node
    const connection: Connection = new Connection("https://dexplorer.ark.io/api/v2");
    // This is where we get wallets data using typescript-client
    const response = await connection.api("wallets").get(senderWalletAddress);
    // This is where we increment nonce by one using Utils bigNumber
    const nonce = Utils.BigNumber.make(response.body.data.nonce).plus(1);
    // This is where we make our multiPayment transaction
    const trx = Transactions.BuilderFactory.multiPayment()
        .version(2)
        .nonce(String(nonce))
        .addPayment(recipient1,"100") // here we add payments
        .addPayment(recipient2,"200") // amount of arktoshis we want to send
        .addPayment(recipient3,"200")
        .sign(senderPassphrase);
    // Here we build our transaction and put it to json format
    const transaction = trx.build().toJson();
    // This is where we post our transaction to the connected node
    const post = await connection.api("transactions").create({ transactions: [transaction] } );

    console.log(post.body);
};

// Here we cam call our transaction methods
transferTransaction();
multipaymentTransaction();

