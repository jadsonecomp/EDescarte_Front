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
import Avatar from "@material-ui/core/Avatar";
import SaveAltOutlinedIcon from '@material-ui/icons/SaveAltOutlined';

import Link from "@material-ui/core/Link";

import api from "../../services/api";
import { getLogin } from "../../services/auth";

import '../../App.css';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';
/*Images*/
import SendIcon from '@material-ui/icons/Send';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
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
    backgroundColor: 'rgba(0, 0, 0, 0.0)',
    
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
    marginTop: theme.spacing(5),
  },

  autocompleteDimensao: {
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: "92%",
  },

  pesquisarDimensao: {
    marginRight: theme.spacing(5),
  },

  typhographDiv: {
    // backgroundColor: 'rgba(38, 33, 29, 0.1)', 
    backgroundColor: 'rgba(0, 0, 0, 0.0)', 
    height: '74vh',  //84vh
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
    marginLeft: theme.spacing(5),
    marginRight: theme.spacing(5),
    width: "92%",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },

  cadastroLogin: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    marginLeft: theme.spacing(5),
    width: "92%"
  },

}));


export default function LocalDescarte() {
  const classes = useStyles();
  
  const [listaMaterialReciclado, setListaMaterialReciclado] = useState([]);
  const [valorSelecao, setValorSelecao] = useState([]);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [open, setOpen] = useState(false);
  const [severityMessage, setSeverityMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [focusLabel, setFocusLabel] = useState(true);
  const [listaMaterialInicial, setListaMaterialInicial] = useState([]);
  const [idPontoColeta, setIdPontoColeta] = useState("");
  const [flagValor, setFlagValor] = useState(0);
  

  useEffect( () => {
 
    const setMateriaisReciclado = async e => {
                
        try {
          if(listaMaterialReciclado.length < 1){
            const materiaisReciclado = await api.get(`/material_reciclado`);         
            setListaMaterialReciclado(materiaisReciclado.data);  
          }                    
        } catch (error) {
            console.log("error: ", error);
        }  

    };

    const getProdutosAssociados = async e => {

      try {
        
        if((listaMaterialInicial.length) < 1 && (flagValor < 3)){

          setFlagValor(flagValor + 1);

          const responseCliente = await api.get(`/cliente_login/${getLogin()}`);   
          const responsePontoColeta = await api.get(`/ponto_coleta_cliente/${responseCliente.data[0].id}`);
          const responsePontoMaterial = await api.get(`/ponto_material_coleta/${responsePontoColeta.data[0].id}`);
        
          setIdPontoColeta(responsePontoColeta.data[0].id);

          console.log('responsePontoMaterial: ', responsePontoMaterial.data);

          const responsePontoMaterialData = responsePontoMaterial.data;

          console.log('responsePontoMaterialData: ', responsePontoMaterialData);

          let vetor = [];

          for (let index = 0; index < responsePontoMaterialData.length; index++) {
            const element = await api.get(`/material_reciclado/${responsePontoMaterialData[index].id_material_reciclado}`);
            vetor.push(element.data[0]);
          }

          console.log('vetor: ', vetor);

          // listaMaterialInicial.push(...vetor);
          setListaMaterialInicial(vetor);
          setValorSelecao(vetor);
          setListaMaterialReciclado([]);

          console.log('listaMaterialInicial: ', listaMaterialInicial);

        }

      } catch (error) {
          console.log("error: ", error);
      }  
      
    };

    // const materialReciclado = await api.get(`/material_reciclado/${pontoMaterial.id_material_reciclado}`);

    setMateriaisReciclado();

    getProdutosAssociados();

    console.log('listaMaterialInicialFORA: ', listaMaterialInicial);
    console.log('listaMaterialReciclado: ', listaMaterialReciclado);
      
  }, [listaMaterialReciclado, listaMaterialInicial]);

  useEffect( () => {
    console.log("valorSelecaoEffect: ", valorSelecao);
    if(valorSelecao.length > 0){
      setBotaoDesabilitado(false);  
    }else{
      setBotaoDesabilitado(true);   
    }
  }, [valorSelecao]);


  const handleClickButtonSalvar = async (e) => {

    // e.preventDefault();
    // console.log("e: ", e.target.value);
    console.log('valorSelecao: ', valorSelecao);
    console.log('idPontoColeta: ', idPontoColeta);

    if(valorSelecao.length > 0){

      try {
        
        const materiaisRecicladosPontosColeta = valorSelecao.map((value, index) => {
          return {
            id_ponto_coleta: idPontoColeta,
            id_material_reciclado: value.id
          }
        });

        console.log("materiaisRecicladosPontosColeta: ", materiaisRecicladosPontosColeta);

        const responseDelete = await api.delete(`/ponto_material_coleta/${idPontoColeta}`);
        
        const responseCreate = await api.post("/ponto_material_em_massa", materiaisRecicladosPontosColeta);
        
        setSeverityMessage("success");
        setAlertMessage("Associação efetuada com Sucesso!");
        setOpen(true);

        

      } catch (error) {
      
        setSeverityMessage("error");
        setAlertMessage(`Erro ao salvar associação: ${error}!!`);
        setOpen(true);

      }

    }else{
      
      setSeverityMessage("error");
      setAlertMessage("Erro ao salvar associação, informação do material reciclável não pode estar vazia!!")
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
        {/* {((listaMaterialReciclado) && (listaMaterialReciclado.length > 0) && 
          (listaMaterialInicial) ) && (     */}
        <AppBar position="relative">
          <Toolbar>
            <AssignmentInd className={classes.icon} />
            <Link  color="inherit" href="/area_empresa" >
              <Typography variant="h6" color="inherit" className={classes.title} noWrap>
                EDescarte - Área Empresa
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
        {/* )} */}
      </div>  
      <main>   
        {/* {((listaMaterialReciclado) && (listaMaterialReciclado.length > 0) && 
          (listaMaterialInicial) ) && (              */}
        <Paper className={classes.fundoInicial} >
          <Container>
          <Typography component="div" className={classes.typhographDiv} > 

            <div className={classes.cadastroLogin}>

              <Avatar className={classes.avatar}>
                  <SaveAltOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" align="center">
                  Associar Materiais Recicláveis à Empresa de Coleta
              </Typography> 

            </div>
              
            

            <div className={classes.divForm}>

              {/* <Autocomplete className={classes.autocompleteDimensao}
                value={valorSelecao}
                onChange={(event, newValue) => {
                  setValorSelecao(newValue);
                  console.log("newValue: ", newValue);
                  if(newValue.length > 0){
                    setBotaoDesabilitado(false);  
                  }else{
                    setBotaoDesabilitado(true);   
                  }
                }}
                multiple={true}
                autoFocus={focusLabel}
                id="checkboxes-tags-demo"
                options={listaMaterialReciclado}
                disableCloseOnSelect={false}
                getOptionLabel={(option) => option.descricao}
                defaultValue={listaMaterialInicial}
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

              /> */}
              {((listaMaterialReciclado) && (listaMaterialReciclado.length > 0) && 
                (listaMaterialInicial) ) && (
                <Autocomplete className={classes.autocompleteDimensao}
                  // value={valorSelecao}
                  onChange={(event, newValue) => {
                    setValorSelecao(newValue);
                    if(newValue.length > 0){
                      setBotaoDesabilitado(false);  
                    }else{
                      setBotaoDesabilitado(true);   
                    }
                  }}
                  multiple={true}
                  autoFocus={focusLabel}
                  id="checkboxes-tags-demo"
                  options={listaMaterialReciclado}
                  disableCloseOnSelect={true}
                  getOptionLabel={(option) => option.descricao}
                  defaultValue={listaMaterialInicial}
                  getOptionSelected={(option, value) => option.descricao === value.descricao }
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
              )}
            </div>

            

            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={botaoDesabilitado}
              className={classes.submit}
              onClick={handleClickButtonSalvar}
            >
              <SaveOutlinedIcon /> Salvar
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity={severityMessage}>
                 {alertMessage}
              </Alert>
            </Snackbar>

            

          </Typography>
          </Container>
        </Paper>  
        {/* )}       */}
      </main>

      {/* {((listaMaterialReciclado) && (listaMaterialReciclado.length > 0) && 
                (listaMaterialInicial) ) && (      */}
        <Copyright />
      {/* )}  */}
      
    </React.Fragment>  
    
    

  );
}



// /* eslint-disable no-use-before-define */
// import React from 'react';
// import Autocomplete from '@material-ui/lab/Autocomplete';
// import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 500,
//     '& > * + *': {
//       marginTop: theme.spacing(3),
//     },
//   },
// }));

// export default function LimitTags() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Autocomplete
//         multiple
//         limitTags={2}
//         id="multiple-limit-tags"
//         options={top100Films}
//         getOptionLabel={(option) => option.title}
//         defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
//         renderInput={(params) => (
//           <TextField {...params} variant="outlined" label="limitTags" placeholder="Favorites" />
//         )}
//       />
//     </div>
//   );
// }

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 },
  { title: 'Casablanca', year: 1942 },
  { title: 'City Lights', year: 1931 },
  { title: 'Psycho', year: 1960 },
  { title: 'The Green Mile', year: 1999 },
  { title: 'The Intouchables', year: 2011 },
  { title: 'Modern Times', year: 1936 },
  { title: 'Raiders of the Lost Ark', year: 1981 },
  { title: 'Rear Window', year: 1954 },
  { title: 'The Pianist', year: 2002 },
  { title: 'The Departed', year: 2006 },
  { title: 'Terminator 2: Judgment Day', year: 1991 },
  { title: 'Back to the Future', year: 1985 },
  { title: 'Whiplash', year: 2014 },
  { title: 'Gladiator', year: 2000 },
  { title: 'Memento', year: 2000 },
  { title: 'The Prestige', year: 2006 },
  { title: 'The Lion King', year: 1994 },
  { title: 'Apocalypse Now', year: 1979 },
  { title: 'Alien', year: 1979 },
  { title: 'Sunset Boulevard', year: 1950 },
  { title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb', year: 1964 },
  { title: 'The Great Dictator', year: 1940 },
  { title: 'Cinema Paradiso', year: 1988 },
  { title: 'The Lives of Others', year: 2006 },
  { title: 'Grave of the Fireflies', year: 1988 },
  { title: 'Paths of Glory', year: 1957 },
  { title: 'Django Unchained', year: 2012 },
  { title: 'The Shining', year: 1980 },
  { title: 'WALL·E', year: 2008 },
  { title: 'American Beauty', year: 1999 },
  { title: 'The Dark Knight Rises', year: 2012 },
  { title: 'Princess Mononoke', year: 1997 },
  { title: 'Aliens', year: 1986 },
  { title: 'Oldboy', year: 2003 },
  { title: 'Once Upon a Time in America', year: 1984 },
  { title: 'Witness for the Prosecution', year: 1957 },
  { title: 'Das Boot', year: 1981 },
  { title: 'Citizen Kane', year: 1941 },
  { title: 'North by Northwest', year: 1959 },
  { title: 'Vertigo', year: 1958 },
  { title: 'Star Wars: Episode VI - Return of the Jedi', year: 1983 },
  { title: 'Reservoir Dogs', year: 1992 },
  { title: 'Braveheart', year: 1995 },
  { title: 'M', year: 1931 },
  { title: 'Requiem for a Dream', year: 2000 },
  { title: 'Amélie', year: 2001 },
  { title: 'A Clockwork Orange', year: 1971 },
  { title: 'Like Stars on Earth', year: 2007 },
  { title: 'Taxi Driver', year: 1976 },
  { title: 'Lawrence of Arabia', year: 1962 },
  { title: 'Double Indemnity', year: 1944 },
  { title: 'Eternal Sunshine of the Spotless Mind', year: 2004 },
  { title: 'Amadeus', year: 1984 },
  { title: 'To Kill a Mockingbird', year: 1962 },
  { title: 'Toy Story 3', year: 2010 },
  { title: 'Logan', year: 2017 },
  { title: 'Full Metal Jacket', year: 1987 },
  { title: 'Dangal', year: 2016 },
  { title: 'The Sting', year: 1973 },
  { title: '2001: A Space Odyssey', year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: 'Toy Story', year: 1995 },
  { title: 'Bicycle Thieves', year: 1948 },
  { title: 'The Kid', year: 1921 },
  { title: 'Inglourious Basterds', year: 2009 },
  { title: 'Snatch', year: 2000 },
  { title: '3 Idiots', year: 2009 },
  { title: 'Monty Python and the Holy Grail', year: 1975 },
];
