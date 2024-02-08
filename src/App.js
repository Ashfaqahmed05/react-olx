import "./App.css";
import Router from './Config/Router'
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {

  return <>
    <div className="main ">
      {/* <header>         
        <Header />
      </header> */}

      <Router />;

      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  </>
}
export default App;