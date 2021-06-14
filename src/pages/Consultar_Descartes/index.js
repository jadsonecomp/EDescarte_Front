import React, {useEffect, useState} from 'react';
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
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import { getLogin } from "../../services/auth";
import api from "../../services/api";

import Link from "@material-ui/core/Link";

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';

/*Images*/
import ReciclageImage from '../../assets/images/recycle.jpg';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';


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
  title: {
    flexGrow: 1,
    marginRight: theme.spacing(2),
  },
  title2: {
    marginRight: theme.spacing(2),
  },
  link: {
    marginTop: '3rem', 
    flexDirection: "column",
  },
  divForm: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    marginLeft: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main
  },
  root2: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    color: theme.palette.common.white, 
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  

}));

export default function ConsultaDescartes() {
  const classes = useStyles();
  const [listaDescartes, setListaDescartes] = useState([]);

  useEffect(() => {
    (async function() {
        try {
            document.title = 'Consulta Descarte';

            const responseCliente = await api.get(`/cliente_login/${getLogin()}`);
            
            const responsePontoColeta = await api.get(`/ponto_coleta_cliente/${responseCliente.data[0].id}`);
            
            const responseListaDescarte = await api.get(`/descarte_ponto_coleta/${responsePontoColeta.data[0].id}`);
            
            setListaDescartes(responseListaDescarte.data);
        } catch (e) {
            console.error(e);
        }
    })();
   }, []);
  


  return (
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
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          {/* <Typography component="div" style={{ backgroundColor: 'rgba(29, 113, 216, 0.5)', height: '240vh' }}> */}
          <Typography component="div" style={{ backgroundColor: 'rgba(35, 72, 32, 0.8)', height: '204vh'}}>    
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Consultas para descarte dos usuários
            </Typography>
            
            <List >
                {listaDescartes.map((value, index) => {
                    // const labelId = `checkbox-list-secondary-label-${value}`;
                    const dataSplit = value.descricao.split("+");
                    const data = dataSplit[1];
                    
                    const produtoSplit = value.descricao.split("*");
                    const produto = produtoSplit[1];
                    
                    const usuarioSplit = value.descricao.split("-");
                    const usuario = usuarioSplit[1];
                    
                    const enderecoSplit = value.descricao.split("!");
                    const endereco = enderecoSplit[1];
                    
                    const contatoSplit = value.descricao.split("%");
                    const contato = contatoSplit[1];
                    

                    return (
                    
                      <React.Fragment>
                        <ListItem key={Math.random()} alignItems="flex-start">
                            <ListItemAvatar key={Math.random()}>
                                <Avatar className={classes.avatar}>
                                    <ContactMailOutlinedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText key={Math.random()}
                                primary={`Usuário ${usuario}`}
                                secondary={
                                    <React.Fragment >
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            {`${endereco}`} 
                                        </Typography >

                                        <br />

                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            {`${contato}`} 
                                        </Typography >

                                        <br />

                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            Material Pesquisado: 
                                        </Typography >
                                        <Typography
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            {` ${produto}`} 
                                        </Typography >
                                        
                                        <br />

                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            Data: 
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            {` ${data}`} 
                                        </Typography>
                                        
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </React.Fragment>
                    );
                })}
            </List>

                        
          </Typography>
          </Container>
        </Paper>        
      </main>    
     <Copyright /> 
    </React.Fragment>
  );
}