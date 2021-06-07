import React, {useEffect} from 'react';
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

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Github from '@material-ui/icons/GitHub';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
/*Images*/
import ReciclageImage from '../../assets/images/reciclar.jpg'


const useStyles = makeStyles((theme) => ({  
  icon: {
    marginRight: theme.spacing(2),
  },  
  fundoInicial: {
    position: 'relative',    
    color: theme.palette.common.black,
    marginBottom: theme.spacing(0),
    backgroundImage: `url(${ReciclageImage})`,//'url(https://picsum.photos/800)', /* imagem randômica */
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
  

}));

export default function Album() {
  const classes = useStyles();

  useEffect(() => {
    document.title = 'Exemplo React - Página Inicial';
   }, []);
  


  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <AssignmentInd className={classes.icon} />
            <Typography variant="h6" color="inherit" className={classes.title} noWrap>
              EDescarte - Área Cliente
            </Typography>
            <Link  color="inherit" href="/lixo_eletronico" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Lixo Eletrônico
              </Typography>  
            </Link>
            <Link  color="inherit" href="/local_descarte" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Locais de Descarte
              </Typography>  
            </Link>
            <Link  color="inherit" href="/" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Logout
              </Typography>  
            </Link>
          </Toolbar>
        </AppBar>
      </div>  
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          <Typography component="div" style={{ backgroundColor: 'rgba(38, 33, 29, 0.1)', height: '84vh' }}>    
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              EDescarte
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Seja bem-vindo ao nosso Portal. Aqui é possível obter informações relevantes acerda do lixo eletrônico e principalmente localizar os pontos de coleta mais próximos a você, acesse a nossa barra de menu e descubra mais sobre nosso Portal.
            </Typography>                        
          </Typography>
          </Container>
        </Paper>        
      </main>    
     <Copyright /> 
    </React.Fragment>
  );
}