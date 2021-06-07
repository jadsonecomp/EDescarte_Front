import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Copyright from '../../components/Copyright';

import Link from "@material-ui/core/Link";

import api from "../../services/api";
import { getLogin } from "../../services/auth";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Tooltip } from 'react-leaflet';
import { Icon } from "leaflet";
import Leaflet from "leaflet";
import '../../App.css';
import { 
  toLatLon, distanceTo, insideCircle, insidePolygon 
} from 'geolocation-utils';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';
/*Images*/
import SendIcon from '@material-ui/icons/Send';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import mapPin from "../../assets/images/house.svg";
import mapPin3 from "../../assets/images/map-marker.svg";

/* Import para os checkbox*/
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const mapPinIcon = Leaflet.icon({
  iconUrl: mapPin,
  iconSize: [38, 48],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

const mapPinIcon3 = Leaflet.icon({
  iconUrl: mapPin3,
  iconSize: [48, 58],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};


const useStyles = makeStyles((theme) => ({  
  icon: {
    marginRight: theme.spacing(2),
  },  
  fundoInicial: {
    position: 'relative',    
    color: theme.palette.common.black,
    marginBottom: theme.spacing(0),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  mapa: {
    width: "85%", //50%
    height: "65vh", //50vh
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(1),
  },

  divForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(5),
  },

  autocompleteDimensao: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(1),
    width: "100%",
  },

  pesquisarDimensao: {
    marginRight: theme.spacing(5),
  },

  typhographDiv: {
    backgroundColor: 'rgba(38, 33, 29, 0.1)', 
    height: '110vh',  //84vh
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: "85%",
  },

}));


export default function LocalDescarte() {
  const classes = useStyles();
  const [position, setPosition] = useState(null);
  const [center, setCenter] = useState(null);
  const [positionsMap, setPositionsMap] = useState([]);
  const [ativado, setAtivado] = useState(true);
  const [listaMaterialReciclado, setListaMaterialReciclado] = useState([]);
  const [valorSelecao, setValorSelecao] = useState(null);
  const [loadMapa, setLoadMapa] = useState(false);
  const [zoom, setZoom] = useState(15);
  const [raio, setRaio] = useState(10000); //metros
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [open, setOpen] = useState(false);
  const [severityMessage, setSeverityMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [empresaEscolhida, setEmpresaEscolhida] = useState("");
  const [focusLabel, setFocusLabel] = useState(true);
  const [mapIcon, setMapIcon] = useState(mapPinIcon3);
  

  useEffect( () => {
    
      const setLatitudeLongitudeInicial = async e => {
          let positionCordenada = [0,0];          
          try {
            const responseCliente = await api.get(`/cliente_login/${getLogin()}`);         
            const responseEndereco = await api.get(`/endereco_cliente/${responseCliente.data[0].id}`);     
            
            if(positionsMap.length < 1){
              setPositionsMap([...positionsMap, {
                index: responseCliente.data[0].id + parseFloat(responseEndereco.data[0].latitude) + responseCliente.data[0].nome.length,
                latitude: parseFloat(responseEndereco.data[0].latitude),
                longitude: parseFloat(responseEndereco.data[0].longitude),
                nome: `${responseCliente.data[0].nome}`,
                rua: `Endereço: ${responseEndereco.data[0].rua}, número ${responseEndereco.data[0].numero}`,
                bairro: `Bairro: ${responseEndereco.data[0].bairro}`,
                telefone: `Telefone: ${responseCliente.data[0].telefone}`,
                email: `E-mail: ${responseCliente.data[0].email}`,
                distancia: `Local do Cliente`,
                id_cliente: responseCliente.data[0].id,
                icon: mapPinIcon3
              }]);  
            }else{
              setZoom(13);
            }
              
            setCenter([parseFloat(responseEndereco.data[0].latitude), parseFloat(responseEndereco.data[0].longitude)]);
            setPosition([parseFloat(responseEndereco.data[0].latitude), parseFloat(responseEndereco.data[0].longitude)]);
                             
          } catch (error) {
              console.log("error: ", error);
              const resultado3 = await setCenter(positionCordenada);
              const resultado2 = await setPosition(positionCordenada);
          }    
      }

      const setMateriaisReciclado = async e => {
                
        try {
          if(listaMaterialReciclado.length < 1){
            const materiaisReciclado = await api.get(`/material_reciclado`);         
            setListaMaterialReciclado(materiaisReciclado.data);  
          }                    
        } catch (error) {
            console.log("error: ", error);
        }  

      }

      if(ativado){
        setLatitudeLongitudeInicial();
        setMateriaisReciclado();

        if(position && center){
          setAtivado(false)
        }

      } 
    
  }, [position, ativado, listaMaterialReciclado, center]);

  useEffect( () => {
    if(loadMapa){
      
      if(positionsMap && positionsMap.length > 1){
        setLoadMapa(false);
      }else{
        setLoadMapa(true);  
      }
    }
  }, [positionsMap, loadMapa]);


  
  const handleClickButton = async (e) => {

    if(valorSelecao){
      
      try {

        setBotaoDesabilitado(false);

        let positionsMapConsultaAtual = [];
        positionsMapConsultaAtual.push(positionsMap[0]);

        const positionCliente = toLatLon([positionsMapConsultaAtual[0].longitude, positionsMapConsultaAtual[0].latitude]);

        const requestePontosMaterial = await api.get(`/ponto_material_reciclado/${valorSelecao.id}`);                    
        const pontosMaterial = requestePontosMaterial.data;


        const getDadosPontosColeta =  async (e) => {
        
          const retornaDadosColeta = await pontosMaterial.map(async (pontoMaterial, index) => {

              const pontoColeta = await api.get(`/ponto_coleta/${pontoMaterial.id_ponto_coleta}`); 
              
              const cliente = await api.get(`/cliente/${pontoColeta.data[0].id_cliente}`); 
              
              const enderecosFinal = await api.get(`/endereco_cliente/${pontoColeta.data[0].id_cliente}`); 
              
              let positionEmpresa = toLatLon([parseFloat(enderecosFinal.data[0].longitude), parseFloat(enderecosFinal.data[0].latitude)]);

              let distancia = (distanceTo(positionCliente, positionEmpresa) / 1000); //distância em quilômetros
              distancia = parseFloat(distancia.toFixed(3));

              let pertenceRaioDistancia = insideCircle(positionEmpresa, positionCliente, raio); //a ideia eh verificar se uma empresa está em um raio de distância do cliente
              
              const dadosRetorno = {
                index: index + cliente.data[0].id + parseFloat(enderecosFinal.data[0].latitude) + pontoColeta.data[0].nome_fantasia.length,
                latitude: parseFloat(enderecosFinal.data[0].latitude),
                longitude: parseFloat(enderecosFinal.data[0].longitude),
                nome: `${pontoColeta.data[0].nome_fantasia}`,
                rua: `Endereço: ${enderecosFinal.data[0].rua}, número ${enderecosFinal.data[0].numero}`,
                bairro: `Bairro: ${enderecosFinal.data[0].bairro}`,
                telefone: `Telefone: ${cliente.data[0].telefone}`,
                email: `E-mail: ${cliente.data[0].email}`,
                distancia: `Distância ao Cliente: ${distancia} KM`,
                id_cliente: cliente.data[0].id,
                icon: mapPinIcon
              };

              if(index === 0){
                for (var i = 0; i < positionsMap.length - 1; i++) {
                  positionsMap.pop();
                }
              }
              
              // positionsMap.push(dadosRetorno);
              if(pertenceRaioDistancia){
                positionsMapConsultaAtual.push(dadosRetorno);
              }
                

              return await dadosRetorno;

            
          });

        }

        await getDadosPontosColeta();

        setPositionsMap(positionsMapConsultaAtual);

        setPosition(null);
        setCenter([-12, -38]);
        setAtivado(true);

        setLoadMapa(true);
        
      } catch (error) {
          console.log("error: ", error);
      } 

    }

  };

  const handleClickButtonSalvar = async (e) => {

    if(valorSelecao){

      try {
        const idClientePesquisa = positionsMap[0].id_cliente;
        const nomeClientePesquisa = positionsMap[0].nome;

        var data = new Date();
        var dia     = data.getDate();
        var mes     = data.getMonth();
        var ano4    = data.getFullYear();
        var str_data = dia + '/' + (mes+1) + '/' + ano4;

        const descartes = [];
        let positionClienteInicial = [];

        positionsMap.forEach((position, index) => {

          if(index > 0){
            const dadosRetorno = {
              descricao: `O  cliente ${nomeClientePesquisa} pesquisou na data ${str_data} 
                          pelo produto ${valorSelecao.descricao}, sendo este um dos produtos do seu 
                          portifólio empresa ${position.nome} `,
              id_cliente: idClientePesquisa,
              id_ponto_coleta: position.id_cliente
            }
            descartes.push(dadosRetorno);
          }else{
            positionClienteInicial.push(position);
          }
          
        });

        const response = await api.post("/descarte_em_massa", descartes);
        
        setSeverityMessage("success");
        setAlertMessage("Pesquisa Salva com Sucesso!");
        setOpen(true);

        setTimeout(() => {
          setPositionsMap(positionClienteInicial);

          setPosition(null);
          setCenter([-12, -38]);
          setValorSelecao(null);
          setBotaoDesabilitado(true);
          setAtivado(true);

          setLoadMapa(true);  
        }, 3000);

      } catch (error) {
      
        setSeverityMessage("error");
        setAlertMessage(`Erro ao salvar pesquisa: ${error}!!`);
        setOpen(true);

      }

    }else{
      setBotaoDesabilitado(true);
      setSeverityMessage("error");
      setAlertMessage("Erro ao salvar pesquisa, informação do material reciclável não pode estar vazia!!")
      setOpen(true);  
    }

  };
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <AssignmentInd className={classes.icon} />
            <Link  color="inherit" href="/area_cliente" >
              <Typography variant="h6" color="inherit" className={classes.title} noWrap>
                EDescarte - Área Cliente
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </div>  
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          <Typography component="div" className={classes.typhographDiv} >    
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              EDescarte
            </Typography>
          
            <div className={classes.divForm}>

              <Autocomplete className={classes.autocompleteDimensao}
                value={valorSelecao}
                onChange={(event, newValue) => {
                  setValorSelecao(newValue);
                }}
                multiple={false}
                autoFocus={focusLabel}
                id="checkboxes-tags-demo"
                options={listaMaterialReciclado}
                disableCloseOnSelect={false}
                getOptionLabel={(option) => option.descricao}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.descricao}
                  </React.Fragment>
                )}
                
                renderInput={(params) => (
                  <TextField {...params} fullWidth variant="outlined" label="Lista de Materiais Recicláveis" placeholder="Escolha qual materia deseja descartar:" />
                )}               

              />

              <Button
                className={classes.pesquisarDimensao}
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClickButton}
                startIcon={<SendIcon />}
              >
                Pesquisar
              </Button>

            </div>


            {position && (
                <MapContainer 
                    class="leaflet-container" 
                    center={center} 
                    zoom={zoom} 
                    scrollWheelZoom={true} 
                    className={classes.mapa}
                    > 

                    <TileLayer 
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {(positionsMap.length > 0) && positionsMap.map((positionMap, index) => (

                      positionMap && (<Marker
                        key={positionMap.index}
                        position={[positionMap.latitude, positionMap.longitude]}
                       
                        icon={positionMap.icon}
                         
                      >
                        <Popup>

                          {positionMap.nome}
                          <br />
                          {positionMap.rua}
                          <br />
                          {positionMap.bairro}
                          <br />
                          {positionMap.telefone}
                          <br />
                          {positionMap.email}
                          <br />
                          {positionMap.distancia}
                          
                        </Popup> 

                          {(index === 0) && (
                            <Tooltip>Clique no ícone para obter suas informações pessoais</Tooltip>
                          )} 

                          {(index > 0) && (
                            <Tooltip>Empresa {positionMap.nome} - clique para obter mais dados</Tooltip>
                          )}
                       
                      </Marker>)

                    ))}
                    
                </MapContainer>
            )}
            
            <Button
              // fullWidth
              variant="contained"
              color="primary"
              disabled={botaoDesabilitado}
              className={classes.submit}
              onClick={handleClickButtonSalvar}
            >
              <AssignmentIndOutlinedIcon /> Salvar Pesquisa
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severityMessage}>
                 {alertMessage}
              </Alert>
            </Snackbar>

          </Typography>
          </Container>
        </Paper>        
      </main>    
     <Copyright /> 
    </React.Fragment>   

  );
}

// export default function LocalDescarte() {

//   function LocationMarker() {
//     const [position, setPosition] = useState(null)
//     const map = useMapEvents({
//       click() {
//         map.locate()
//       },
//       locationfound(e) {
//         setPosition(e.latlng)
//         map.flyTo(e.latlng, map.getZoom())
//       },
//     })
//     // const map = useMapEvents({
//     //   dblclick() {
//     //     console.log("1")
//     //     setPosition([-12.24135, -38.94416])
//     //     map.flyTo([-12.24135, -38.94416], map.getZoom())
//     //   },
//     // })

    

//     return position === null ? null : (
//       <Marker position={position}>
//         <Popup>You are here</Popup>
//       </Marker>
//     )
//   }

//   return(
//     <MapContainer
//       center={{ lat: 51.505, lng: -0.09 }}
//       zoom={13}
//       scrollWheelZoom={false}>
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       <LocationMarker />
//     </MapContainer>
//   )

// }