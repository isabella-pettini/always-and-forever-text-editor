import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
console.log('PUT to the database.');
// connect to the DB and the version we want to use
const jateDB = await openDB('jate, 1');
// new transaction - specify DB posting to & data privileges 
const tx = jateDB.transaction('jate', 'readwrite');
// open desired objectStore
const store = tx.objectStore('jate');
// .add() method on the store to pass in content
const req = store.add({ text: content });
// confirmation of the req
const result = await req;
console.log('Data saved to jateDB', result)
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
console.log('GET from the database.');
// connect to the DB and the version we want to use
const jateDB = await openDB('jate, 1');
// new transaction - specify DB posting to & data privileges 
const tx = jateDB.transaction('jate', 'readonly');
// open desired objectStore
const store = tx.objectStore('jate');
// .getAll() method to get all data in the DB
const req = store.getAll();
// confirmation of the req
const result = await req;
console.log('Data: ', result);
return result;
};


initdb();
