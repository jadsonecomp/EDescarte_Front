import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Copyright from "../../components/Copyright";
/* Material-Ui Imports  */
import CssBaseline from "@material-ui/core/CssBaseline";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Paper from '@material-ui/core/Paper';
import { login } from "../../services/auth";
import MuiAlert from '@material-ui/lab/Alert';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

/*Images*/
import ReciclageEmpresaImage from '../../assets/images/lixo-eletronico1.jpg';
import ReciclageClienteImage from '../../assets/images/lixo_eletronico1.jpeg';

/*Icons */


const loginUsuario = login

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    
    display: "flex",
    flexDirection: "column",
    flexWrap: 'wrap',
    alignItems: "center",

    width: "100%",
    height: "80%",

    // backgroundColor: theme.palette.primary.light  //'rgb(144, 238, 144)',
    backgroundColor: theme.palette.grey[200],

    
  },
  root2: {
    // maxWidth: 345,
    margin: theme.spacing(4, 4, 4, 4),
  },
  media: {
    height: 280,
  },
  icon: {
    marginRight: theme.spacing(2),
  }
}));

export default function Login() {
  const classes = useStyles(); //estilos do Material-UI
  const history = useHistory(); //redirecionar a página  
  


  return (
    // <Paper className={classes.fundoInicial} >
    <React.Fragment>
        <CssBaseline />
        <div>
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

        <Container component="main" maxWidth="md">

            <Paper className={classes.paper} elevation={5}>
              <Grid container>
                  <Grid item xs>
                    
                    <Card className={classes.root2}>

                        <CardActionArea href="/cadastro_cliente">
                            <CardMedia
                                className={classes.media}
                                component="img"
                                alt="Contemplative Reptile"
                                // height="140"
                                image={ReciclageClienteImage}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Cliente
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    
                    </Card>


                  </Grid>
                  <Grid item xs> 

                    <Card className={classes.root2}>
                        
                        <CardActionArea href="/cadastro_empresa">
                            <CardMedia
                                className={classes.media}
                                component="img"
                                alt="Contemplative Reptile"
                                // height="140"
                                image={ReciclageEmpresaImage}
                                title="Contemplative Reptile"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    Empresa de Coleta
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    
                    </Card>

                  </Grid>
              </Grid>
            </Paper>
          
        </Container >
        <Box mt={9}>
          <Copyright />
        </Box>
    </React.Fragment>
    // </Paper>
  );
}
