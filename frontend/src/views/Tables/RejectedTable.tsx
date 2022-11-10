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
  state: string,
  samples: {state: string, packingDate: string}[]
}

// @ts-ignore
const useStyles = makeStyles(styles);

export default function InProgressTable() {
  const classes = useStyles();
  const [batches, setBatches] = React.useState<{ batches: Batch[], changes: any[][] }>();
  const [tableData, setTableData] = React.useState<string[][]>();

  React.useEffect(() => {
    get('batches/state/RECHAZADO').then(res => {
      setBatches(res);
      setTableData(res.batches.map((b: Batch, key: number) => {
        const changesWithoutNull = res.changes.filter(c => c.id === b.id)[0].changes.filter(obj=>obj);
        return [`${b.id}`,
          `${b.batchNumber}`,
          `${b.product.type} ${b.product.brand}`,
          b.productionDate,
          `${b.state}`,
          `${b.shatterLevel}%`,
          `${changesWithoutNull.filter((c: any) => c.type === 'coccion')[0].user.name}`
        ]}));
    })
  }, [])

  return (
    <GridContainer>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Lotes Rechazados por el Sistema</h4>
          <p className={classes.cardCategoryWhite}>
            En esta tabla se encuentran los lotes que fueron rechazados en el proceso de control de calidad. (Trizado mayor igual a 25%)
          </p>
        </CardHeader>
        <CardBody>
          {tableData && batches &&
            <Table
              tableHeaderColor="primary"
              tableHead={["Nro de Lote", "Producto", "Produccion", "Estado", "Trizado", "Responsable"]}
              defaultOrderBy={3}
              defaultOrder={'desc'}
              tableData={tableData}
              type={'batch'}
              ids={batches.batches.map(b => b.id)}
            />
          }
        </CardBody>
      </Card>
    </GridContainer>
  );
}
