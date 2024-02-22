import "./App.css";
import Router from './Config/Router'
import {store, persistor} from "./Config/Store";
import { Provider } from "react-redux";

function App() {

  return <>
  <Provider store={store}>
    <div className="main ">
      <Router />;
    </div>

  </Provider>
  </>
}
export default App;