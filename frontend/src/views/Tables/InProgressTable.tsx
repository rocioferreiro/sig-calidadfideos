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
import {useHistory} from "react-router-dom";
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
  samples: {state: string, packingDate: string}[]
}

// @ts-ignore
const useStyles = makeStyles(styles);

export default function InProgressTable() {
  const classes = useStyles();
  const [batches, setBatches] = React.useState<Batch[]>([]);

  React.useEffect(() => {
    get('batches/state/PROCESANDO').then(res => {
      setBatches(res.batches)
    })
  }, [])

  function getState(batch: Batch){

  }

  return (
    <GridContainer>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Nro de Lote", "Producto", "Produccion", "Estado de Control Visual", "Estado de Cocción"]}
              tableData={batches.map(b => [`${b.batchNumber}`, `${b.product.type} ${b.product.brand}`, b.productionDate, "Listo para Control", "Listo para Control" ])}

            />
          </CardBody>
        </Card>
    </GridContainer>
  );
}
