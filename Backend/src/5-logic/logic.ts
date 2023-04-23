// import { OkPacket } from "mysql"
// import dal from "../2-utils/dal"
// import StoreModel from "../4-models/store-models"
// import { ResourceNotFoundErrorModel } from "../4-models/error-model"

// async function getAllStores(): Promise<StoreModel[]>{
//     const sql = "SELECT * FROM stores"
//     const stores = await dal.execute(sql)
//     return stores

// }
// async function addStore(store:StoreModel): Promise<StoreModel>{
//     const sql = `
//                 INSERT INTO stores VALUES(
//                     DEFAULT,
//                     '${store.storeName}',
//                     '${store.description}',
//                     '${store.address}',
//                     '${store.longitude}',
//                     '${store.latitude}' )
//                     `
//                 const info:OkPacket = await dal.execute(sql)
//                 store.storeId = info.insertId
//                 return store
// }

// async function deleteStore(storeId:number):Promise<void>{
//     const sql = `DELETE FROM stores WHERE storeId = ${storeId}`
//     const info: OkPacket = await dal.execute(sql)
//     if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(storeId)

// }
//     export default {
// //     getAllStores,
// //     addStore,
// //     deleteStore
// }/