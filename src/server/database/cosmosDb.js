// import environment variables defined in .env
require('dotenv').config();

const CosmosClient = require('@azure/cosmos').CosmosClient;

const dbClient = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING);

const databaseId = process.env.COSMOS_DATABASE_ID;

module.exports = class CosmosDB {

    async getItems(container, querySpec) {
        const {
            resources: items
        } = await dbClient
            .database(databaseId)
            .container(container)
            .items
            .query(querySpec)
            .fetchAll();

        return items;
    };

    async createItem(container, newItem) {
        const {
            resource: createdItem
        } = await dbClient
            .database(databaseId)
            .container(container)
            .items
            .create(newItem);

        return createdItem;
    };

    async replaceItem(container, item) {
        const {
            resource: replacedItem
        } = await dbClient
            .database(databaseId)
            .container(container)
            .item(item.id)
            .replace(item);

        return replacedItem;
    };

    async upsertItem(container, item) {
        const {
            resource: upsertedItem
        } = await dbClient
            .database(databaseId)
            .container(container)
            .items
            .upsert(item);

        return upsertedItem;
    };

    // async deleteItem(container, item) {
    //     const {
    //         resource: deletedItem
    //     } = await container
    //         .item(item.id)
    //         .delete();

    //     return deletedItem;
    // }

    // async createOrUpdateItem(container, item) {

    //     let createdOrUpdatedItem;

    //     const querySpec = {
    //         query: "SELECT * FROM " + container + " c WHERE c.id = '" + item.id + "' "
    //     };

    //     const items = await this.getItems(container, querySpec);
    //     if (items && items[0]) {
    //         createdOrUpdatedItem = await this.replaceItem(container, item);                         
    //     } else {
    //         createdOrUpdatedItem = await this.createItem(container, item);            
    //     }

    //     return createdOrUpdatedItem;
    // };

}