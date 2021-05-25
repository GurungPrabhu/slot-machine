const INITIALSTATE = {
  currentData: undefined,
  database: [],
};

const gameReducer = (store = INITIALSTATE, action) => {
  console.log(action);
  return store;
};

export default gameReducer;
