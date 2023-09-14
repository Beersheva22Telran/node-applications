import MongoConnection from "../domain/MongoConnection.mjs"
import bcrypt from 'bcrypt'
export default class UsersService {
    #collection
    constructor(connection_string, dbName) {
        const connection = new MongoConnection(connection_string, dbName);
        this.#collection = connection.getCollection('accounts');
    }
    async addAccount(account) {
        if (await this.#collection.findOne({_id:account.username})) {
            throw `account ${account.username} already exists`
        }
        const accountDB = await toAccountDB(account)
        await this.#collection.insertOne(accountDB);
        return account;
    }
    toAccount(accountdb) {
        const res = {...accountdb, username:accountdb._id};
        delete res._id;
        return res;
    }


}
async function toAccountDB(account) {
    const passwordHash = await bcrypt.hash(account.password, 10);
    const res = {_id: account.username, passwordHash, roles: account.roles};
    
    return res;
}