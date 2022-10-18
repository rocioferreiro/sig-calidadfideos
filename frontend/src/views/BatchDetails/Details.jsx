import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import GridItem from "../../components/Grid/GridItem";
import {Container} from "@material-ui/core";
import {Timer} from "@material-ui/icons";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
  stateStyle: {
    backgroundColor: "#61d05d",
    paddingRight: 20,
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',
    borderRadius: '20px',
    fontSize: 18
  }
};

// @ts-ignore
const useStyles = makeStyles(styles);

export default function Details() {
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Lote n° 45</h4>
          </CardHeader>
          <CardBody style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <h4> Moñitos Marolio </h4>
              <p> SKU: 2367152417492379 </p>
              <p> Producido: 2022/10/17 </p>
            </div>
            <h6> Trizado actual: <strong>{' '} 8% </strong></h6>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardBody>
            <Container style={{backgroundColor: 'warning', display: 'flex', justifyContent: 'center'}}>
              <Timer/>
              <div style={{paddingLeft: 20}}> PROCESANDO </div>
            </Container>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Container style={{backgroundColor: 'warning', display: 'flex', justifyContent: 'space-between', padding: 0}}>
              <h4> Muestra n°1 </h4>
              <div style={styles.stateStyle}> 5 horas para proximo control </div>
            </Container>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Cambios</h4>
            <p className={classes.cardCategoryWhite}>
              Todos los cambios realizados sobre el lote
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={["Responsable", "Cambio", "Estado anterior", "Estado actual"]}
              tableData={[
                ["Jane Doe", "Control Cocción", "7% de trizado", "8% de trizado"],
                ["Peter Parker", "Control Visual", "Espera", "7% de trizado"],
                ["Minerva Hooper", "Nueva muestra", "", "Espera"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
