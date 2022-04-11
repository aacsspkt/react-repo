// import { Connection, PublicKey, } from "@solana/web3.js";
import { deserializeUnchecked } from "borsh";



// src: https://solanacookbook.com/guides/serialization.html#how-to-deserialize-account-data-on-the-client

// Flexible class that takes properties and imbues them
// to the object instance
class Assignable {
    constructor(properties) {
        Object.keys(properties).map((key) => {
            return (this[key] = properties[key]);
        });
    }
}

export class Stream extends Assignable { }

const streamSchema = new Map([
    [
        Stream,
        {
            kind: "struct",
            fields: [
                ["start_time", "u64"],
                ["end_time", "u64"],
                ["paused", "u64"],
                ["withdraw_limit", "u64"],
                ["amount", "u64"],
                ["sender", "pubkey"],
                ["recipient", "pubkey"],
                ["withdrawn", "u64"],
                ["paused_at", "u64"]
            ]
        }
    ]
]);



// src: https://solanacookbook.com/guides/serialization.html#how-to-deserialize-account-data-on-the-client

/**
 * Fetch program account data
 * @param {Connection} connection - Solana RPC connection
 * @param {PublicKey} account - Public key for account whose data we want
 * @return {Promise<Stream>} - Keypair
 */
export async function getStreamData(connection, account) {
    let accountInfo = await connection.getAccountInfo(account, 'confirmed');
    return deserializeUnchecked(streamSchema, Stream, accountInfo.data)
}
