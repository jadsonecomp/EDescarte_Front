import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Cadastro_Cliente from "./pages/Cadastro_Cliente";
import Cadastro_Empresa_Coleta from "./pages/Cadastro_Empresa_Coleta";
import Cadastro from "./pages/Cadastro";
import Area_Cliente from "./pages/Area_Cliente"
import Local_Descarte from "./pages/Local_Descarte"
import Lixo_eletronico from "./pages/Lixo_Eletronico"
import Atualiza_Cliente from "./pages/Atualiza_Cliente"
import Area_Empresa from "./pages/Area_Empresa"
import Associar_Produtos from "./pages/Associar_Produtos"
import Campanhas_Coleta from "./pages/Campanhas_Coleta"
import Consultar_Descartes from "./pages/Consultar_Descartes"
import Atualiza_Empresa from "./pages/Atualiza_Empresa"

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
        <Route exact path="/local_descarte" component={Local_Descarte} />
        <Route exact path="/lixo_eletronico" component={Lixo_eletronico} />
        <Route exact path="/atualiza_cliente" component={Atualiza_Cliente} />
        <Route exact path="/area_empresa" component={Area_Empresa} />
        <Route exact path="/associar_produtos" component={Associar_Produtos} />
        <Route exact path="/campanhas_coleta" component={Campanhas_Coleta} />
        <Route exact path="/consultar_descartes" component={Consultar_Descartes} />
        <Route exact path="/atualiza_empresa" component={Atualiza_Empresa} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}
