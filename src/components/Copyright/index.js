import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    // color: "white"
  }
}));

export default function Copyright() {
  const classes = useStyles(); 
  return (
    <Typography variant="body2" className={classes.footer} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/jadsonecomp">
        EDescarte LDTA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
