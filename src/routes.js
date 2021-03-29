import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Cadastro_Cliente from "./pages/Cadastro_Cliente";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Principal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro_cliente" component={Cadastro_Cliente} />
      </Switch>
    </BrowserRouter>
  );
}
