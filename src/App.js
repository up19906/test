import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddFunding from "./components/Page/AddFunding";
import AllReport from "./components/Page/AllReport";
import Research from "./components/Page/ConceptProposal";
import AddAboutResearch from "./components/Page/AddAboutResearch";

// import AddFundingAcademic from "./components/Page/AddFunding/AddFundingAcademic";
import Home from "./components/Page/Home";
// import Contact from "./components/Page/Contact";
import { Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/home" component={Home} />
        <Route exact path="/" component={Home} />
        {/* <Route path="/contact" component={Contact} /> */}
        {/* <Route exact path="/addfunding" component={createQuery} /> */}
        <Route
          exact
          path="/addfunding/addfundingresearch"
          component={AddFunding}
        />
        <Route
          exact
          path="/addfunding/aboutfunding"
          component={AddAboutResearch}
        />

        <Route path="/allreport" component={AllReport} />
        <Route path="/research" component={Research} />
        {/* <Route path="/academic" component={AddFunding} /> */}
        {/* <Route path="/addfunding/academic" render={(props) => <AddFunding />} /> */}
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
