import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PasteForm from "./components/PasteForm";
import PasteView from "./components/PasteView";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={PasteForm} />
        <Route path='/:url' component={PasteView} />
      </Switch>
    </Router>
  );
};

export default App;
