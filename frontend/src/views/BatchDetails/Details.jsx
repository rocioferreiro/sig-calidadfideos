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
import {Timer, Edit} from "@material-ui/icons";
import {get} from "../../services/http";
import {useHistory} from "react-router-dom";

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
  const [samples, setSamples] = React.useState([]);
  const [currentSample, setCurrentSample] = React.useState('A');
  const classes = useStyles();
  const history = useHistory();

  React.useEffect(() => {
    get(`batches/${id}`).then(res => {
      setBatch(res)
      setSamples(res.changes.filter(c=>c).filter(c => c.type === 'creation').map(c => c.date).sort((a, b)=> new Date(a)- new Date(b)))
    })
  }, [])

  React.useEffect(() => {
    if(samples.length > 0) {
      const date = new Date(Math.max.apply(null, samples.map(function(e) {
        return new Date(e);
      })))
      setCurrentSample(letterByDate(date))
    }
  }, [samples])

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
    if(batch.changes[0] === 0) return {text: 'Agregar muestra', action: () => {history.push(`/batch/${batch.batch.id}/add`)}}
    const notNullChanges = batch.changes.filter(c=>c);
    const state = notNullChanges.filter(s => s.type === 'coccion').length > 0? 'coccion' : notNullChanges.filter(s => s.type === 'visual').length > 0? 'visual': 'cargado';
    switch (state) {
      case 'cargado':
        if(getDateXDaysAgo(2).getTime() > new Date(batch.batch.productionDate)){
          return {text: 'Listo para control visual', action: () => {history.push(`/visual/${batch.batch.id}/${batch.batch.samples[0].id}`)}};
        } else {
          const diff = getDifferenceBetweenDates(getDateXDaysAgo(2), new Date(batch.batch.productionDate))
          return {text:`${diff.amount} ${diff.unit} hasta control visual`, action: () => {}};
        }
      case 'visual':
        if(getDateXDaysAgo(7).getTime() > new Date(batch.batch.productionDate)){
          return {text: 'Listo para coccion', action: () => {
            history.push(`/coccion/${batch.batch.id}/${batch.batch.samples[0].id}`)
          }};
        } else {
          const diff = getDifferenceBetweenDates(getDateXDaysAgo(7), new Date(batch.batch.productionDate))
          return {text:`${diff.amount} ${diff.unit} faltantes para cocción`, action: () => {}};
        }
      case 'coccion':
        return {text:`Listo, trizado: ${batch.batch.shatterLevel}`, action: () => {}};
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
              <p> SKU: {batch.batch.product.SKU} </p>
              <p> Producido: {new Date(batch.batch.productionDate).toUTCString().substring(0,16)} </p>
            </div>
            {batch.batch.samples.length > 0 && batch.batch.samples[0].state === 'visual'?
              <h6> {batch.batch.shatterLevel > 0 ? 'Trizado: Leve Trizado' : 'Trizado: OK'}</h6> :
              batch.batch.samples.length > 0 && batch.batch.samples[0].state === 'coccion'?
              <h6> Trizado actual: <strong>{' '} {batch.batch.shatterLevel}% </strong></h6> : <h6> </h6>
            }
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
              <div style={{display: 'flex'}}>
                <h4 >{getSampleState().text === 'Agregar muestra' ? 'No hay Muestra' : `Muestra ${currentSample}`}  </h4>
                <div style={{display: (getSampleState().text === 'Agregar muestra' || batch.batch.samples[0].state === 'trizado') ? 'none': 'flex', alignItems: 'center', paddingLeft: 10}} onClick={() => {history.push(`/batch/${batch.batch.id}/add`)}}> <Edit/> </div>
              </div>
              <div style={styles.stateStyle} onClick={getSampleState().action}> {getSampleState().text} </div>
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
            {batch.changes[0] !== 0 ?
            <Table
              tableHeaderColor="warning"
              tableHead={["Responsable", "Cambio", "Fecha de Empaquetado", "Fecha de Cambio"]}
              defaultOrderBy={4}
              defaultOrder={'desc'}
              tableData={batch.changes.filter(c=>c).map(c => [
                `${c.id}`,
                c.user.name, c.type === 'visual'? `Control Visual de ${letterByDate(c.date)}`: c.type === 'coccion' ? `Control Cocción de ${letterByDate(c.date)}` : `Nueva muestra: ${letterByDate(c.date)}`,
                c.newSample.packingDate,
                c.date])
              }
            /> :
              <p> No se realizó ningun cambio todavía! </p>
            }
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  ) : <></>

  function letterByDate(d) {
    let filtered = samples.filter(s => new Date(s).getTime() <= new Date(d).getTime())
    const letterIndex = samples.indexOf(filtered[filtered.length-1]);
    const A = 'A'.charCodeAt(0);
    let numberToCharacter = number => {
      return number <= 0 ? String.fromCharCode(A) : String.fromCharCode(A + number);
    };
    return numberToCharacter(letterIndex);
  }
}


