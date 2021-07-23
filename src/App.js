import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddFunding from "./components/Page/AddFunding";
import AllReport from "./components/Page/AllReport";
// import AddFundingAcademic from "./components/Page/AddFunding/AddFundingAcademic";
import Home from "./components/Page/Home";
import Contact from "./components/Page/Contact";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/contact" component={Contact} />
        <Route path="/addfunding" component={AddFunding} />
        <Route path="/allreport" component={AllReport} />
        {/* <Route path="/academic" component={AddFunding} /> */}
        {/* <Route path="/addfunding/academic" render={(props) => <AddFunding />} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
