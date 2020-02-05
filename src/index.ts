import {Transactions , Managers, Utils} from "@arkecosystem/crypto";
import * as request from "request";

/**
 *  Simple example of a transfer transaction using
 *  @arkecosystem/crypto https://github.com/ArkEcosystem/core/tree/develop/packages/crypto
 *
**/

Managers.configManager.setHeight(4006000);

const senderWalletAddress = "D8rr7B1d6TL6pf14LgMz4sKp1VBMs6YUYD";
const recipientWalletAddress = "DBoKkzKAT6YdXhyv1mvcKEg97JxiRqMuK2";

const senderPassphrase = "master dizzy era math peanut crew run manage better flame tree prevent";

(async () => {
    let nonce;
    await request.get("http://dexplorer.ark.io/api/wallets/" + senderWalletAddress,
        async (error: any,response: any, body:any)=>{

            // This is where we pull out nonce and increment it by one
            nonce = JSON.parse(body).data.nonce;
            nonce = Utils.BigNumber.make(nonce).plus(1);

            // This is where we build our transaction
            const trx = Transactions.BuilderFactory.transfer()
                .version(2)
                .nonce(String(nonce))
                .amount("100")
                .recipientId(recipientWalletAddress)
                .sign(senderPassphrase);

            const transaction = trx.build().toJson();

            // This is where we send out transaction to ark node
            request.post("https://dexplorer.ark.io/api/transactions",{
                json: {
                    transactions: [
                        {
                            version: transaction.version,
                            network: transaction.network,
                            typeGroup: transaction.typeGroup,
                            type: transaction.type,
                            nonce : transaction.nonce,
                            senderPublicKey:transaction.senderPublicKey,
                            fee: transaction.fee,
                            amount: transaction.amount,
                            expiration: transaction.expiration,
                            recipientId: transaction.recipientId,
                            signature: transaction.signature,
                            id: transaction.id
                        }
                    ]
                }
            },(error: any,response: any, body:any)=>{
                console.log(body);
            })
        });
})();