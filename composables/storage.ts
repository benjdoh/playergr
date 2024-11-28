import { createStorage, type StorageValue } from "unstorage";
import indexDB from "unstorage/drivers/indexedb";

export const useIndexedDB = <T extends StorageValue>(store = "main") =>
  createStorage<T>({
    driver: indexDB({
      dbName: "playergr",
      storeName: store,
    }),
  });
