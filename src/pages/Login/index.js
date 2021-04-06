import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "../../components/Copyright";
/* Material-Ui Imports  */
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Paper from '@material-ui/core/Paper';
import api from "../../services/api";
import { login } from "../../services/auth";
import InputAdornment from '@material-ui/core/InputAdornment';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import { useForm } from "react-hook-form";

/*Images*/
import ReciclageImage from '../../assets/images/reciclagem-lixo-eletronico-02.jpg'

/*Icons */
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';


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
    width: "100%"
  },
  icone: {
    color: theme.palette.secondary.main
  },
  footer: {
    color: theme.palette.primary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  fundoInicial: {
    position: 'relative',    
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${ReciclageImage})`,//'url(https://picsum.photos/800)', /* imagem randômica */
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
  }
}));

export default function Login() {
  const classes = useStyles(); //estilos do Material-UI
  const history = useHistory(); //redirecionar a página
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrarUsuario, setLembrarUsuario] = useState(false);
  const [botaoDesabilitado, setBotaoDesabilitado] = useState(true);
  const [helperText, setHelperText] = useState("");
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [severityMessage, setSeverityMessage] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (login.trim() && senha.trim()) {
      setBotaoDesabilitado(false);
    } else {
      setBotaoDesabilitado(true);
    }
  }, [login, senha]);

  // Nota: O array [] deps vazio significa
  // que este useEffect será executado uma vez
  // semelhante ao componentDidMount()
  useEffect(() => {    
      document.title = 'Exemplo React - Área Reservada';     
    if (localStorage.getItem("usuario")) {
      setLembrarUsuario(true);
      setLogin(localStorage.getItem("usuario"));
    }
  }, []);

  useEffect(() => {
    if (lembrarUsuario) {
      localStorage.setItem("usuario", login);
    } else {
      localStorage.removeItem("usuario");
    }
  }, [lembrarUsuario, login]);

  const alteraLembrar = e => {
    setLembrarUsuario(!lembrarUsuario);
  };
  const validaLogin = async e => {
    e.preventDefault();
    try {
        const response = await api.post("/login", { login, senha });
        loginUsuario(response.data.token, login);
        setError(false);
        setHelperText("Login OK! Aguarde...");
        setTimeout(function(){ setHelperText(""); }, 2000);

        setSeverityMessage("success");
        setAlertMessage("Login Realizado com Sucesso!")
        setOpen(true);
        //history.push("/dashboard");
    } catch (err) {
        setError(true);
        setHelperText("O usuário ou a senha informados são inválidos!");
        setTimeout(function(){ setHelperText(""); }, 2000);

        setSeverityMessage("error");
        setAlertMessage("Erro ao realizar Login, usuário ou a senha informados são inválidos!!")
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
              <Link  color="inherit" href="/" >
                <Typography variant="h6" color="inherit" className={classes.title} noWrap>
                  EDescarte
                </Typography>
              </Link>
            </Toolbar>
          </AppBar>
        </div>      

        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>

              <div className={classes.cadastroLogin}>

                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Área Reservada
                </Typography>

              </div>

              <form className={classes.form} noValidate onSubmit={validaLogin}>
              <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label="Login do Usuário"
                  name="login"
                  autoComplete="login"
                  autoFocus
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
                  helperText={helperText}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon fontSize="large" className={classes.icone}/>
                      </InputAdornment>
                    ),
                  }}
              />
              <FormControlLabel
                  control={
                  <Switch
                      checked={lembrarUsuario}
                      onChange={alteraLembrar}
                      name="lembrar"
                  />
                  }
                  label="Lembrar o usuário"
              />
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={botaoDesabilitado}
                  className={classes.submit}
              >
                  <LockOutlinedIcon /> Acessar
              </Button>
              <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity={severityMessage}>
                      {alertMessage}
                  </Alert>
              </Snackbar>
              <Grid container>
                  <Grid item xs>
                  <Link href="#" variant="body2">
                      Esqueceu a senha?
                  </Link>
                  </Grid>
                  <Grid item>
                  <Link href="/cadastro_cliente" variant="body2">
                      {"Ainda não tem uma conta?"}
                  </Link>
                  </Grid>
              </Grid>
              </form>
          </div>
          
        </Container >
        <Box mt={8}>
          <Copyright />
        </Box>
    </React.Fragment>
    // </Paper>
  );
}
