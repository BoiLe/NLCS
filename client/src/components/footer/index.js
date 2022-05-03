import { Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import theme from "../../Theme";
import useStyles from "./Styles";
export default function Footer() {
  const classes = useStyles(theme);
  return (
    <Box
      bgcolor="text.primary"
      className={classes.Box}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 1, sm: 1 }} pb={{ xs: 5, sm: 0 }}>
          Medician shop &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
}
