/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
import * as type from "../constant";

const INITIALSTATE = {
  currentData: {
    username: "guest",
    balance: 99.99,
    log: [],
  },
  database: [],
  guestDatabase: {
    balance: 0,
    log: [],
  },
};

const gameReducer = (store = INITIALSTATE, action) => {
  switch (action.type) {
    case type.LOGGEDBYCURRENTUSER: {
      const data = store.currentData;
      if (data.log.length === 0) {
        data.log.push({
          id: 0,
          slot1: action.payload.slots.first,
          slot2: action.payload.slots.second,
          slot3: action.payload.slots.third,
          date: action.payload.date,
        });
      } else {
        const lastId = data.log.slice(-1)[0].id;
        data.log.push({
          id: lastId + 1,
          slot1: action.payload.slots.first,
          slot2: action.payload.slots.second,
          slot3: action.payload.slots.third,
          date: action.payload.date,
        });
      }
      return { ...store, currentData: data };
    }
    case type.USERLOGGEDIN: {
      let dataObj = store.database.find(
        (item) => item.username === action.payload
      );
      if (!dataObj) dataObj = store.currentData;
      dataObj.username = action.payload;
      return { ...store, currentData: dataObj };
    }
    case type.USERLOGGEDOUT: {
      const { database } = store;
      database.push(store.currentData);
      return {
        ...store,
        database,
        currentData: { username: "guest", balance: 99.99, log: [] },
      };
    }
    case type.CHANGEBALANCE: {
      const { currentData } = store;
      currentData.balance =
        parseFloat(action.payload) + parseFloat(currentData.balance);
      return { ...store, currentData };
    }
    default:
      return store;
  }
};

export default gameReducer;
