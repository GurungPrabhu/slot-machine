import React from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Layout from "./components/template/layout/index";
import { store } from "./redux/store";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
        <Layout />
      </div>
    </Provider>
  );
}

export default App;
