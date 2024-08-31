import { createStorage } from 'unstorage'
import indexDB from 'unstorage/drivers/indexedb'

export const useIndexedDB = () =>
  createStorage({
    driver: indexDB({
      dbName: 'playergr',
      storeName: 'main',
    }),
  })
