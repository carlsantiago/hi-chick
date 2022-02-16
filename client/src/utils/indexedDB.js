import { openDB } from "idb";

const initdb = async () => {
  openDB("events", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("events")) {
        console.log("Events indexedDB already exists");
        return;
      }
      db.createObjectStore("events", { keyPath: "id", autoIncrement: true });
      console.log("Events IndexedDB created");
    },
  });
};

export const postDb = async (content) => {
  console.log("Post to the indexedDB");
  const eventsDb = await openDB("events", 1);
  const tx = eventsDb.transaction("events", "readwrite");
  const store = tx.objectStore("events");
  const request = store.add({ event: content });
  const result = await request;
  console.log("🚀 - data saved to IndexedDB", result);
};

export const getAlldb = async () => {
  console.log("GET all from IndexedDB");
  const eventsDb = await openDB("events", 1);
  const tx = eventsDb.transaction("events", "readonly");
  const store = tx.objectStore("events");
  const request = store.getAll();
  const result = await request;
  return result;
};
initdb();
