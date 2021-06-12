import React, {useEffect} from 'react';
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Copyright from '../../components/Copyright';

import Link from "@material-ui/core/Link";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { getLogin } from "../../services/auth";

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Github from '@material-ui/icons/GitHub';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
/*Images*/
import ReciclageImage from '../../assets/images/reciclar.jpg';
import ReciclageImage2 from '../../assets/images/como-ganhar-dinheiro-com-reciclagem-1.jpg';


const useStyles = makeStyles((theme) => ({  
  icon: {
    marginRight: theme.spacing(2),
  },  
  fundoInicial: {
    position: 'relative',    
    color: theme.palette.common.white,
    marginBottom: theme.spacing(0),
    backgroundImage: `url(${ReciclageImage2})`,//'url(https://picsum.photos/800)', /* imagem randômica */
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
  title2: {
    flexGrow: 1,
    marginRight: theme.spacing(0),
    marginLeft: theme.spacing(2),
  },
  menuItem: {
    backgroundColor: theme.palette.primary,
  },
  divForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  

}));

export default function Album() {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    document.title = 'Exemplo React - Página Inicial';
   }, []);
  
   const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseMinhaConta = () => {
    setAnchorEl(null);
    history.push("/atualiza_empresa");
  };
  const handleCloseSair = () => {
    setAnchorEl(null);
    history.push("/");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <AssignmentInd className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.title} noWrap>
              EDescarte - Área Empresa
            </Typography>
            <Link  color="inherit" href="/associar_produtos" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Associar Produtos
              </Typography>  
            </Link>
            <Link  color="inherit" href="/consultar_descartes" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Consultar Descartes
              </Typography>  
            </Link>
            <Link  color="inherit" href="/campanhas_coleta" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Campanhas de Coleta
              </Typography>  
            </Link>
            {/* <Link  color="inherit" href="/atualiza_cliente" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Atualizar Dados
              </Typography>  
            </Link>
            <Link  color="inherit" href="/" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Logout
              </Typography>  
            </Link> */}


            <div className={classes.divForm}>

              <Typography onClick={handleMenu} variant="h6" color="inherit" className={classes.title2} >
                Olá, {getLogin()}
              </Typography>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
                className={classes.menuItem}
                color="inherit"
              >
                <MenuItem onClick={handleCloseMinhaConta}>Minha conta</MenuItem>
                <MenuItem onClick={handleCloseSair}>Sair</MenuItem>
              </Menu>
            </div>



          </Toolbar>
        </AppBar>
      </div>  
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          <Typography component="div" style={{ backgroundColor: 'rgba(35, 72, 32, 0.3)', height: '84vh' }}>    
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              EDescarte
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Seja bem-vindo ao nosso Portal. Aqui é possível obter informações relevantes acerca do lixo eletrônico e principalmente localizar os pontos de coleta mais próximos a você, acesse a nossa barra de menu e descubra mais sobre nosso Portal.
            </Typography>                        
          </Typography>
          </Container>
        </Paper>        
      </main>    
     <Copyright /> 
    </React.Fragment>
  );
}