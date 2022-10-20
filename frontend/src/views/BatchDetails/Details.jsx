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
import {get} from "../../services/http";

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

export default function Details({id}) {
  const [batch, setBatch] = React.useState();
  const classes = useStyles();

  React.useEffect(() => {
    get(`batches/${id}`).then(res => {
      setBatch(res)
    })
  }, [])

  function getDateXDaysAgo(numOfDays, date = new Date()) {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
  }

  function getDifferenceBetweenDates(date1, date2){
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if(diffDays < 1) return {amount: diffHours, unit: 'horas'};
    else return {amount: diffDays, unit: 'dias'};
  }

  function getSampleState() {
    const state = batch.changes.filter(s => s.type === 'coccion').length > 0? 'coccion' : batch.changes.filter(s => s.type === 'visual').length > 0? 'visual': 'cargado';
    switch (state) {
      case 'cargado':
        if(getDateXDaysAgo(2).getTime() > new Date(batch.batch.productionDate)){
          return 'Listo para control visual';
        } else {
          const diff = getDifferenceBetweenDates(getDateXDaysAgo(2), new Date(batch.batch.productionDate))
          return `${diff.amount} ${diff.unit} hasta control visual`;
        }
      case 'visual':
        if(getDateXDaysAgo(7).getTime() > new Date(batch.batch.productionDate)){
          return 'Listo para cocción';
        } else {
          const diff = getDifferenceBetweenDates(getDateXDaysAgo(7), new Date(batch.batch.productionDate))
          return `${diff.amount} ${diff.unit} faltantes para cocción`;
        }
      case 'coccion':
        return `Listo, trizado: ${batch.batch.shatterLevel}`;
    }
  }

  return batch ? (
    <GridContainer>
      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Lote n° {batch.batch.batchNumber}</h4>
          </CardHeader>
          <CardBody style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              <h4> {batch.batch.product.type} {batch.batch.product.brand} </h4>
              <p> SKU: {batch.batch.sku} </p>
              <p> Producido: 2022/10/17 </p>
            </div>
            <h6> Trizado actual: <strong>{' '} {batch.batch.shatterLevel}% </strong></h6>
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={6} md={6}>
        <Card>
          <CardBody>
            <Container style={{backgroundColor: 'warning', display: 'flex', justifyContent: 'center'}}>
              <Timer/>
              <div style={{paddingLeft: 20}}> {batch.batch.state} </div>
            </Container>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Container style={{backgroundColor: 'warning', display: 'flex', justifyContent: 'space-between', padding: 0}}>
              <h4> Muestra </h4>
              <div style={styles.stateStyle}> {getSampleState()} </div>
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
              tableHead={["Responsable", "Cambio", "Fecha"]}
              tableData={batch.changes.map(c => [c.user.name, c.type === 'visual'? 'Control Visual': c.type === 'coccion' ? "Control Cocción" : "Nueva muestra", new Date(c.date).toUTCString().substring(0,16)])
              }
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  ) : <></>
}
