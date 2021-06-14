import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Copyright from '../../components/Copyright';


import api from "../../services/api";
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ContactMailOutlinedIcon from '@material-ui/icons/ContactMailOutlined';
import Avatar from "@material-ui/core/Avatar";


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
    //backgroundImage: `url(${ReciclageImage})`,//'url(https://picsum.photos/800)', /* imagem randômica */
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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  divider: {
    marginTop: theme.spacing(5),
  },
  inline: {
    display: 'inline',
    color: theme.palette.common.white, 
  },
  corpy: {
      marginTop: theme.spacing(5)
  }

}));

export default function Album() {
  const classes = useStyles();
  const [listaCampanhaDescartes, setListaCampanhaDescartes] = useState([]);

  useEffect(() => {
    (async function() {
      try {
          document.title = 'Página Inicial';

          const responseCampanhas = await api.get(`/campanha_coleta`);
          
          setListaCampanhaDescartes(responseCampanhas.data);
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
            <Link  color="inherit" href="/" >
                <Typography variant="h6" color="inherit" className={classes.title} noWrap>
                    EDescarte
                </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </div>  
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          {/* <Typography component="div" style={{ backgroundColor: 'rgba(29, 113, 216, 0.5)', height: '84vh' }}> */}
          <Typography component="div" style={{ backgroundColor: 'rgba(35, 72, 32, 0.8)', height: '100%' }}>    
            
            <Typography variant="h5" align="center" gutterBottom>
              Campanhas de Coleta de Lixo Eletrônico
            </Typography>                
              

            <List >
                {listaCampanhaDescartes.map((value, index) => {
                    // const labelId = `checkbox-list-secondary-label-${value}`;

                    return (
                    
                      <React.Fragment>
                        <ListItem key={Math.random()} alignItems="flex-start">
                            <ListItemAvatar key={Math.random()}>
                                <Avatar className={classes.avatar}>
                                    <ContactMailOutlinedIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText key={Math.random()}
                                primary={`Empresa de Coleta ${value.id_ponto_coleta} promove a seguinte campanha: `}
                                secondary={
                                    <React.Fragment >
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            {`${value.descricao}`} 
                                        </Typography >

                                        <br />

                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                        >
                                            {`Data: ${value.data_campanha}`} 
                                        </Typography >

                                        <br />
                                        
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




     <Copyright className={classes.corpy} /> 
    </React.Fragment>
  );
}