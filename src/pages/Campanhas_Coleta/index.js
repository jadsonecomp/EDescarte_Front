import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "../../components/Copyright";
/* Material-Ui Imports  */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { getLogin } from "../../services/auth";

import Paper from '@material-ui/core/Paper';
import api from "../../services/api";
import apiCep from "../../services/apiCep";
import { login } from "../../services/auth";
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PhoneIcon from '@material-ui/icons/Phone';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import LockIcon from '@material-ui/icons/Lock';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Link from "@material-ui/core/Link";


/*Images*/
import ReciclageImage from '../../assets/images/reciclagem-lixo-eletronico-02.jpg'



const loginUsuario = login

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cadastro: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    width: "100%"
  },
  divForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  rowEspace: {
    marginRight: theme.spacing(0),
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  icone: {
    color: theme.palette.secondary.main
  },
  form: {
    width: "100%", 
    marginTop: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fundoInicial: {
    position: 'relative',    
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${ReciclageImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  tArea: {
    width: "100%", 
    marginTop: theme.spacing(3)    
  }

}));

export default function Cadastro_Cliente() {
  const classes = useStyles(); //estilos do Material-UI
  const history = useHistory(); //redirecionar a página
  
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  
  const [helperText, setHelperText] = useState("");
  
  const [error, setError] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [severityMessage, setSeverityMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  
  const [dataEvento, setDataEnvento] = useState("");
  const [campanhaColeta, setCampanhaColeta] = useState("");


  useEffect(() => {

    if (dataEvento.trim() && campanhaColeta.trim() ) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }

  }, [dataEvento, campanhaColeta]);

  // Nota: O array [] deps vazio significa
  // que este useEffect será executado uma vez
  // semelhante ao componentDidMount()
  useEffect(() => {    
      document.title = 'Campanhas Coleta'; 
      
  }, []);

  
  const validaCadastro = async e => {
    e.preventDefault();
    try {

        const responseCliente = await api.get(`/cliente_login/${getLogin()}`);
            
        const responsePontoColeta = await api.get(`/ponto_coleta_cliente/${responseCliente.data[0].id}`);

        const campanha = {
            descricao: campanhaColeta,
            id_ponto_coleta: responsePontoColeta.data[0].id,
            data_campanha: dataEvento
        };
        
        try {

            const response = await api.post("/campanha_coleta", campanha);
        

            setError(false);
            setHelperText("Cadastro Realizado com Sucesso! Aguarde...");
            setTimeout(function(){ setHelperText(""); }, 2000);

            setSeverityMessage("success");
            setAlertMessage("Cadastro Realizado com Sucesso!")
            setOpen(true);

            setTimeout(function(){ 
                setCampanhaColeta("");
                setDataEnvento("");
             }, 3000);
            
        } catch (erro) {
            setError(true);
            setHelperText("Dados informados são inválidos!");
            setTimeout(function(){ setHelperText(""); }, 2000);
            // const responseEnd = await api.delete(`/cliente/${id_cliente}`);

            setSeverityMessage("error");
            setAlertMessage("Erro ao realizar cadastro, revisar os dados informados!!")
            setOpen(true);
        }

        
    } catch (err) {
        setError(true);
        setHelperText("Dados informados são inválidos!");
        setTimeout(function(){ setHelperText(""); }, 2000);

        setSeverityMessage("error");
        setAlertMessage("Erro ao realizar cadastro, revisar os dados informados!!")
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
    // <Paper className={classes.fundoInicial} >
    <React.Fragment>
         <CssBaseline />
         <div className={classes.root}>
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
         </div>      

         {/* <Container component="main" maxWidth="xs"> */}
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.cadastro}>
                    <Avatar className={classes.avatar}>
                        <AssignmentIndOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Cadastro das Campanhas de Coleta
                    </Typography>
                </div>
                <form className={classes.form} noValidate onSubmit={validaCadastro}>
                    
                    <div className={classes.divForm}>
                        <TextareaAutosize
                            className={classes.form}
                            rowsMax={4}
                            rowsMin={4}
                            // aria-label="Texto da campanha de coleta"
                            // placeholder="Maximum 4 rows"
                            // defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                            //     ut labore et dolore magna aliqua."

                            variant="outlined"
                            margin="normal"
                            required
                            id="campanha"
                            label="Texto da campanha de coleta"
                            name="campanha"
                            autoComplete="campanha"
                            autoFocus
                            value={campanhaColeta}
                            onChange={e => setCampanhaColeta(e.target.value)}
                            // error={error}
                        />
                    
                    </div>

                    <div className={classes.divForm}>
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            // fullWidth
                            id="date"
                            label="Birthday"
                            type="date"
                            // defaultValue={dataEventoInicial}
                            value={dataEvento}
                            onChange={e => setDataEnvento(e.target.value)}
                            error={error}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    
                    </div>
                    
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={botaoDesabilitado}
                        className={classes.submit}
                    >
                        <AssignmentIndOutlinedIcon /> Cadastrar
                    </Button>
                    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity={severityMessage}>
                            {alertMessage}
                        </Alert>
                    </Snackbar>
                </form>
            </div>
        </Container>
        <Box mt={8}>
            <Copyright />
        </Box>
    </React.Fragment>    
    // </Paper>
  );
}
