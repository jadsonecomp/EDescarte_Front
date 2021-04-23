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
    marginRight: theme.spacing(1)
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
    marginTop: theme.spacing(1)
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
  }
}));

export default function Cadastro_Cliente() {
  const classes = useStyles(); //estilos do Material-UI
  const history = useHistory(); //redirecionar a página
  const [nome, setNome] = useState("");
  const [nome_fantasia, setNomeFantasia] = useState("");
  const [documento, setDocumento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [cep, setCep] = useState("");
  const [pais, setPais] = useState("");
  const [estado, setEstado] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [bairro, setBairro] = useState("");
  const [numero, setNumero] = useState("");
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [buscaCep, setBuscaCep] = useState(true);
  const [buscaCepNumero, setBuscaCepNumero] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [helperTextCep, setHelperTextCep] = useState("");
  const [numeroFocus, SetNumeroFocus] = useState(false);
  const [error, setError] = useState(false);
  const [errorCep, setErrorCep] = useState(false);
  const [open, setOpen] = useState(false);
  const [severityMessage, setSeverityMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");


  useEffect(() => {
    if (login.trim() && senha.trim() && nome.trim() && documento.trim() && email.trim() && pais.trim() && estado.trim() && cidade.trim() && bairro.trim() && rua.trim() && numero.trim() && cep.trim() && nome_fantasia.trim() ) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }
    if(cep.trim){
        setBuscaCep(true);
    } else{
        setBuscaCep(false);
    }

  }, [login, senha, nome, documento, email, cep, pais, estado, cidade, bairro, rua, numero, cep, nome_fantasia]);

  // Nota: O array [] deps vazio significa
  // que este useEffect será executado uma vez
  // semelhante ao componentDidMount()
  useEffect(() => {    
      document.title = 'Exemplo React - Área Reservada';     
  }, []);

  
  const validaCadastro = async e => {
    e.preventDefault();
    try {
        const response = await api.post("/cliente", { nome, documento, telefone, celular, email, login, senha });
        const id_cliente = response.data.id;
        
        try {
            const responseEmpresa = await api.post("/ponto_coleta", { nome_fantasia, id_cliente})
            const responseEnd = await api.post("/endereco", { pais, estado, cidade, bairro, rua, numero, cep, id_cliente });
            loginUsuario("", login);

            setError(false);
            setHelperText("Cadastro Realizado com Sucesso! Aguarde...");
            setTimeout(function(){ setHelperText(""); }, 2000);

            setSeverityMessage("success");
            setAlertMessage("Cadastro Realizado com Sucesso!")
            setOpen(true);

            setTimeout(function(){ history.push("/login"); }, 3000);
            
        } catch (erro) {
            setError(true);
            setHelperText("Dados informados são inválidos!");
            setTimeout(function(){ setHelperText(""); }, 2000);
            const responseEnd = await api.delete(`/cliente/${id_cliente}`);

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

  const getCep = async e => {
    
    try {
        const response = await apiCep.get(`/${cep}/json`);
        setPais("Brasil");
        setEstado(response.data.uf);
        setCidade(response.data.localidade);
        setBairro(response.data.bairro);
        setRua(response.data.logradouro);
        setErrorCep(false);
        setBuscaCepNumero(false);
        setHelperTextCep("Endereço encontrado");
        setTimeout(function(){ setHelperTextCep(""); }, 2000);
        SetNumeroFocus(true);
    } catch (err) {
        setPais("");
        setEstado("");
        setCidade("");
        setBairro("");
        setRua("");
        setErrorCep(true);
        setBuscaCepNumero(true);
        SetNumeroFocus(false);
        setHelperTextCep("Cep inválido");
        setTimeout(function(){ setHelperTextCep(""); }, 2000);
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
                <Link  color="inherit" href="/" >
                    <Typography variant="h6" color="inherit" className={classes.title} noWrap>
                    EDescarte
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
                        Cadastro
                    </Typography>
                </div>
                <form className={classes.form} noValidate onSubmit={validaCadastro}>
                    <Typography component="h4">
                        Dados Pessoais
                    </Typography>
                    <div className={classes.divForm}>
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome do Usuário"
                            name="nome"
                            autoComplete="nome"
                            autoFocus
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                    <AccountCircleIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="nome_fantasia"
                            label="Nome Fantasia"
                            name="nome_fantasia"
                            autoComplete="nome_fantasia"
                            value={nome_fantasia}
                            onChange={e => setNomeFantasia(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                    <AccountCircleIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div className={classes.divForm}>  
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="documento"
                            label="Documento do Usuário"
                            name="documento"
                            autoComplete="documento"
                            value={documento}
                            onChange={e => setDocumento(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AssignmentIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="E-mail do Usuário"
                            type="email"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <MailOutlineIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                    </div>        

                    <div className={classes.divForm}>
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="telefone"
                            label="Telefone do Usuário"
                            name="telefone"
                            autoComplete="telefone"
                            value={telefone}
                            onChange={e => setTelefone(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="celular"
                            label="Celular do Usuário"
                            name="celular"
                            autoComplete="celular"
                            value={celular}
                            onChange={e => setCelular(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <PhoneAndroidIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    
                    <div className={classes.divForm}>
                    <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="login"
                            label="Login do Usuário"
                            name="login"
                            autoComplete="login"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircleIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            error={error}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon fontSize="large" className={classes.icone}/>
                                </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <Typography component="h4">
                        Dados de Endereço
                    </Typography>
                    <div className={classes.divForm}>
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="cep"
                            label="Cep"
                            name="cep"
                            autoComplete="cep"
                            value={cep}
                            onChange={e => setCep(e.target.value)}
                            error={errorCep}
                            helperText={helperTextCep}
                            InputProps={{
                                onBlur: event => {
                                    const { key } = event;
                                    getCep();
                                    
                                },
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="pais"
                            label="País"
                            name="pais"
                            autoComplete="pais"
                            value={pais}
                            onChange={e => setPais(e.target.value)}
                            disabled={buscaCep}
                            error={error}
                            InputProps={{
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
                            }}
                        />
                    </div>
                    <div className={classes.divForm}>
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="estado"
                            label="Estado"
                            name="estado"
                            autoComplete="estado"
                            value={estado}
                            onChange={e => setEstado(e.target.value)}
                            disabled={buscaCep}
                            error={error}
                            InputProps={{
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="cidade"
                            label="Cidade"
                            name="cidade"
                            autoComplete="cidade"
                            value={cidade}
                            onChange={e => setCidade(e.target.value)}
                            disabled={buscaCep}
                            error={error}
                            InputProps={{
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
                            }}
                        />
                    </div>
                    <div className={classes.divForm}>
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="bairro"
                            label="Bairro"
                            name="bairro"
                            autoComplete="bairro"
                            value={bairro}
                            onChange={e => setBairro(e.target.value)}
                            disabled={buscaCep}
                            error={error}
                            InputProps={{
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
                            }}
                        />
                        <TextField
                            className={classes.rowEspace}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="rua"
                            label="Rua"
                            name="rua"
                            autoComplete="rua"
                            value={rua}
                            onChange={e => setRua(e.target.value)}
                            disabled={buscaCep}
                            error={error}
                            InputProps={{
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="numero"
                            label="Numero"
                            name="numero"
                            autoComplete="numero"
                            value={numero}
                            onChange={e => setNumero(e.target.value)}
                            // disabled={buscaCepNumero}
                            error={error}
                            autoFocus={numeroFocus}
                            helperText={helperText}
                            InputProps={{
                                // startAdornment: (
                                // <InputAdornment position="start">
                                //     {/* <AccountCircleIcon fontSize="large" style={{ color: "green" }}/> */}
                                //     <PersonPinCircleIcon fontSize="large" className={classes.icone}/>
                                // </InputAdornment>
                                // ),
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
