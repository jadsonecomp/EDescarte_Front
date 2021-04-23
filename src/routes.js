import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Cadastro_Cliente from "./pages/Cadastro_Cliente";
import Cadastro_Empresa_Coleta from "./pages/Cadastro_Empresa_Coleta";
import Cadastro from "./pages/Cadastro";
import Area_Cliente from "./pages/Area_Cliente"

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Principal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/cadastro_cliente" component={Cadastro_Cliente} />
        <Route exact path="/cadastro_empresa" component={Cadastro_Empresa_Coleta} />
        <Route exact path="/cadastro" component={Cadastro} />
        <Route exact path="/area_cliente" component={Area_Cliente} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
