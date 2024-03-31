import "./App.css";
import Router from './Config/Router'
import {store, persistor} from "./Config/Store";
import { Provider } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

function App() {

  return <>
  <Provider store={store}>
    <div className="main ">
      <Router />;
      <Toaster />
    </div>

  </Provider>
  </>
}
export default App;