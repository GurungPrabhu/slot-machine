import React, { useState } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import Layout from "./components/template/layout/index";
import { store } from "./redux/store";
import Spinner from "./components/modules/spinner";
import Table from "./utils/table";
import "react-toastify/dist/ReactToastify.css";
import "react-responsive-modal/styles.css";
import "font-awesome/css/font-awesome.min.css";

function App() {
  const [showGame, setShowGame] = useState(false);

  const toggleGameVisibility = () => {
    setShowGame((prev) => !prev);
  };

  return (
    <Provider store={store}>
      <ToastContainer />
      <div className="App">
        <Layout>
          <div className="container text-center">
            <button
              className="btn btn-primary mt-5"
              type="submit"
              onClick={toggleGameVisibility}
            >
              Try your Luck
            </button>
            {showGame && (
              <Spinner open={showGame} onClose={toggleGameVisibility} />
            )}
            {!showGame && <Table />}
          </div>
        </Layout>
      </div>
    </Provider>
  );
}

export default App;
