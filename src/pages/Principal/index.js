import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Copyright from '../../components/Copyright';

import Link from "@material-ui/core/Link";

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';

/*Images*/
import ReciclageImage from '../../assets/images/reciclagem-lixo-eletronico-02.jpg'


const useStyles = makeStyles((theme) => ({  
  icon: {
    marginRight: theme.spacing(2),
  },  
  fundoInicial: {
    position: 'relative',    
    color: theme.palette.common.white,
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
              EDescarte
            </Typography>
            <Link  color="inherit" href="/campanhas_ativas" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Campanhas de Coleta
              </Typography>  
            </Link>
            <Link  color="inherit" href="/login" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Login
              </Typography>  
            </Link>
            <Link  color="inherit" href="/cadastro" >
              <Typography variant="h6" color="inherit" className={classes.title} >
                Cadastro
              </Typography>  
            </Link>
          </Toolbar>
        </AppBar>
      </div>  
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          {/* <Typography component="div" style={{ backgroundColor: 'rgba(29, 113, 216, 0.5)', height: '80vh' }}> */}
          <Typography component="div" style={{ backgroundColor: 'rgba(38, 33, 29, 0.5)', height: '84vh' }}>    
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              EDescarte
            </Typography>
            <Typography variant="h5" align="center" paragraph>
              Saiba mais sobre o que é lixo eletrônico e encontre os pontos de coleta mais próximos de você
            </Typography>                        
              {/* <Grid container spacing={3} justify="center" style={{ marginTop: '5rem'}}>
                <Grid item>                
                  <Button variant="contained" color="primary" href="/login" startIcon={<LockOutlinedIcon/>}>
                    Login
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="secondary" href="https://github.com/ricardoleme/exemplo-reactjs-material-ui" startIcon={<Github />}>
                    Código Fonte
                  </Button>
                </Grid>
              </Grid>             */}
          </Typography>
          </Container>
        </Paper>        
      </main>    
     <Copyright /> 
    </React.Fragment>
  );
}