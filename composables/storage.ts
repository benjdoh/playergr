import { createStorage, defineDriver, type StorageValue } from "unstorage";
import indexDB from "unstorage/drivers/indexedb";
import localStorage from "unstorage/drivers/localstorage";

export function useIndexedDB<T extends StorageValue>(storeName = "main") {
  return createStorage<T>({
    driver: indexDB({ dbName: "deeshee", storeName }),
  });
}

export function useLocalStorage<T extends StorageValue>(store = "main") {
  return createStorage<T>({
    driver: localStorage({
      base: `deeshee:${store}`,
    }),
  });
}
