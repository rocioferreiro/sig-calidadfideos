import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Table from "../../components/Table/Table.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
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
};

type Batch = {
  id: number,
  sku: number,
  batchNumber: number,
  product: {type: string, brand: string},
  productionDate: string,
  shatterLevel: number,
  samples: {state: string, packingDate: string}[]
}

// @ts-ignore
const useStyles = makeStyles(styles);

export default function InProgressTable() {
  const classes = useStyles();
  const [batches, setBatches] = React.useState<{ batches: Batch[], changes: any[][] }>();
  const [tableData, setTableData] = React.useState<string[][]>();

  React.useEffect(() => {
    get('batches/state/PROCESANDO').then(res => {
      setBatches(res);
      setTableData(res.batches.map((b: Batch, key: number) =>
        [`${b.id}`,
          `${b.batchNumber}`,
          `${b.product.type} ${b.product.brand}`,
          b.productionDate,
          getSampleState({batch: b, changes: res.changes.filter(c => c.id === b.id)[0].changes.filter(c => c)}).visual,
          getSampleState({batch: b, changes: res.changes.filter(c => c.id === b.id)[0].changes.filter(c => c)}).coccion
        ]));
    })
  }, [])

  function getDateXDaysAgo(numOfDays: number, date = new Date()) {
    const daysAgo = new Date(date.getTime());
    daysAgo.setDate(date.getDate() - numOfDays);
    return daysAgo;
  }

  function getDifferenceBetweenDates(date1: Date, date2: Date){
    const diffTime = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    if(diffDays < 1) return {amount: diffHours, unit: 'hora/s'};
    else return {amount: Math.ceil(diffDays), unit: 'dia/s'};
  }

  function getSampleState(batch: { batch: Batch, changes: any[] }) {
    if(batch.changes[0] === 0 || batch.changes.length < 1) return {visual: 'Falta agregar muestra', coccion: 'Falta control visual para desbloquear'}
    const notNullChanges = batch.changes.filter(c=>c);
    const state = notNullChanges.filter(s => s.type === 'coccion').length > 0? 'coccion' : notNullChanges.filter(s => s.type === 'visual').length > 0? 'visual': 'cargado';
    switch (state) {
      case 'cargado':
        if(getDateXDaysAgo(2).getTime() > new Date(batch.batch.samples[0].packingDate).getTime()){
          return {visual: 'Listo para control', coccion: 'Falta control visual para desbloquear'};
        } else {
          const diff = getDifferenceBetweenDates(getDateXDaysAgo(2), new Date(batch.batch.samples[0].packingDate))
          return {visual: `${diff.amount} ${diff.unit} faltante/s`, coccion: 'Falta control visual para desbloquear'}
        }
      case 'visual':
        if(getDateXDaysAgo(7).getTime() > new Date(batch.batch.productionDate).getTime()){
          return {visual: `Listo, ${batch.batch.shatterLevel > 0? 'LEVE TRIZADO' : 'OK'}`, coccion: 'Listo para control'};
        } else {
          const diff = getDifferenceBetweenDates(getDateXDaysAgo(7), new Date(batch.batch.samples[0].packingDate))
          return {visual: `Listo, ${batch.batch.shatterLevel > 0? 'LEVE TRIZADO' : 'OK'}`, coccion: `${diff.amount} ${diff.unit} faltante/s`}
        }
      case 'coccion':
        return {visual: `Listo`, coccion: `Listo, trizado: ${batch.batch.shatterLevel}`};
    }
  }

  return (
    <GridContainer>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Lotes en Proceso</h4>
            <p className={classes.cardCategoryWhite}>
              En esta tabla se encuentran los lotes que todavia estan en proceso de control de calidad.
            </p>
          </CardHeader>
          <CardBody>
            {tableData && batches &&
              <Table
                tableHeaderColor="primary"
                tableHead={["Nro de Lote", "Producto", "Produccion", "Estado de Control Visual", "Estado de Cocción"]}
                defaultOrderBy={3}
                defaultOrder={'asc'}
                type={'batch'}
                tableData={tableData}
                ids={batches.batches.map(b => b.id)}
              />
            }
          </CardBody>
        </Card>
    </GridContainer>
  );
}
