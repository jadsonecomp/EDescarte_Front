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
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';

import Link from "@material-ui/core/Link";

/* ícones */
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import Github from '@material-ui/icons/GitHub';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

/*Images*/
import ReciclageImage from '../../assets/images/recycle.jpg'


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
            <Link  color="inherit" href="/area_cliente" >
              <Typography variant="h6" color="inherit" className={classes.title} noWrap>
                EDescarte - Área Cliente
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>
      </div>  
      <main>                
        <Paper className={classes.fundoInicial} >
          <Container>
          {/* <Typography component="div" style={{ backgroundColor: 'rgba(29, 113, 216, 0.5)', height: '80vh' }}> */}
          <Typography component="div" style={{ backgroundColor: 'rgba(35, 72, 32, 0.8)', height: '204vh'}}>    
            <Typography component="h1" variant="h2" align="center" gutterBottom>
              Lixo Eletrônico
            </Typography>
            <Typography variant="h6" align="justify" paragraph style={{marginRight: '2vh', marginLeft: '2vh' }}>
                O lixo eletrônico, Resíduos de Equipamentos Elétricos e Eletrônicos (REEE) ou e-lixo são termos utilizados para se referir a todos os dispositivos eletroeletrônicos, pilhas, celulares, tablets, computadores a TVs, lavadoras de louça e de roupa, geladeiras entre outros, que foram descartados por seus donos, sem a intenção de reutilizá-los.
            </Typography>
            <Typography variant="h6" align="justify" paragraph style={{marginRight: '2vh', marginLeft: '2vh' }}>
                As pessoas, muitas vezes por desconhecimento de práticas adequadas de descartes ou falta de conhecimento de locais que recolham estes materiais, acabam descartando este lixo de maneira incorreta e com isso podem provocar danos ao meio ambiente, como a contaminação por materiais pesados, poluição dos aterros sanitários, além de poder causar dano a saúde pública em geral, com a contaminação do solo, rios, lenções freáticos afetando assim a população que depende destes recursos.  
            </Typography>
            <Typography variant="h6" align="justify" paragraph style={{marginRight: '2vh', marginLeft: '2vh' }}>
                Com base nestes possíveis danos socioambientais, econômicos (cerca de US$ 55 bilhões em materiais não reutilizados são perdidos no mundo anualmente) e o aumento gradual da produção de lixo eletrônico, no Brasil estima-se uma produção média de 1,5 milhão toneladas por ano e no mundo uma estimativa de 55 milhões de toneladas, a sociedade vem demonstrando cada vez mais preocupações com o descarte correto destes materiais.
            </Typography>
            <Typography variant="h6" align="justify" paragraph style={{marginRight: '2vh', marginLeft: '2vh' }}>
                Considerando que apenas 20% desse lixo eletrônico é reciclado e o impacto que ele causa, pesquisadores apontam que descarte correto nas empresas ou cooperativas que recebem esses materiais e os levam para a reciclagem é a solução ideal para amenizar a situação.
            </Typography>  
            <Typography variant="h6" align="justify" paragraph style={{marginRight: '2vh', marginLeft: '2vh' }}>
                Sendo assim, a relevância deste portal é enorme e contribui significativamente no processo para aproximar as pessoas das Empresas de Coleta e assim contribuir para a diminuição destes números do lixo eletrônico no Brasil.
            </Typography>    

            <Divider style={{ marginTop: '5rem'}} />

            <Grid container spacing={3} align="justify" className={classes.link} >
              <Grid item>
                <Typography variant="h5" align="justify" paragraph style={{marginRight: '2vh', marginLeft: '2vh' }}>
                    Segue abaixo alguns links importantes acerca do lixo eletrônico:
                </Typography>      
              </Grid>
              <Grid item > 
                <div className={classes.divForm}> 
                    <Avatar className={classes.avatar}>1</Avatar>
                    <Link  color="inherit" href="https://tecnoblog.net/309683/o-que-e-lixo-eletronico/" >
                        <Typography variant="h6" color="inherit" className={classes.title2} noWrap>
                            O que é lixo eletrônico? [e onde descartar corretamente]
                        </Typography>
                    </Link> 
                </div>              
                {/* <a href="https://tecnoblog.net/309683/o-que-e-lixo-eletronico/" target="_blank">
                    <Typography variant="h6" color="inherit" className={classes.title2} noWrap>O que é lixo eletrônico? [e onde descartar corretamente] </Typography>
                </a> */}
              </Grid>
              <Grid item>
                <div className={classes.divForm}> 
                    <Avatar className={classes.avatar}>2</Avatar>
                    <Link  color="inherit" href="https://www.ecycle.com.br/lixo-eletronico/" >
                        <Typography variant="h6" color="inherit" className={classes.title2} noWrap>
                            Lixo eletrônico: um grave problema do mundo moderno
                        </Typography>
                    </Link>
                </div> 
              </Grid>
              <Grid item>
                <div className={classes.divForm}> 
                    <Avatar className={classes.avatar}>3</Avatar>
                    <Link  color="inherit" href="https://greeneletron.org.br/blog/tudo-o-que-voce-precisa-saber-sobre-o-lixo-eletronico/" >
                        <Typography variant="h6" color="inherit" className={classes.title2} noWrap>
                            Tudo o que você precisa saber sobre o lixo eletrônico
                        </Typography>
                    </Link>
                </div> 
              </Grid>
              <Grid item>
                <div className={classes.divForm}> 
                    <Avatar className={classes.avatar}>4</Avatar>
                    <Link  color="inherit" href="https://www.todamateria.com.br/lixo-eletronico/" >
                        <Typography variant="h6" color="inherit" className={classes.title2} noWrap>
                            Lixo Eletrônico
                        </Typography>
                    </Link>
                </div>
              </Grid>
            </Grid>            
          </Typography>
          </Container>
        </Paper>        
      </main>    
     <Copyright /> 
    </React.Fragment>
  );
}