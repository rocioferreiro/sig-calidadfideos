import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
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
    get('batches/state/PARA LIBERAR').then(res => {
      get('batches/state/CONCESION').then(res2 => {
        const batchesInfo = [...res.batches, ...res2.batches];
        const changesInfo = res.changes[0].changes !== 0 ? [...res.changes, ...res2.changes] : res2.changes;
        setBatches({batches: batchesInfo, changes: changesInfo});
        setTableData(batchesInfo.map((b: Batch, key: number) =>
          [`${b.id}`,
            `${b.batchNumber}`,
            `${b.product.type} ${b.product.brand}`,
             b.productionDate,
            `${b.state}`,
            `${b.shatterLevel}%`,
            `${changesInfo.filter(c => c.id === b.id)[0].changes.filter(c => c).filter((c: any) => c.type === 'coccion')[0].user.name}`
          ]));
      })
    })
  }, [])

  return (
    <GridContainer>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>Lotes Finalizados para Liberaci??n</h4>
          <p className={classes.cardCategoryWhite}>
            En esta tabla se encuentran los lotes que fueron aprobados en el proceso de control de calidad y aquellos marcados como concesi??n. (Trizado menor a 25%)
          </p>
        </CardHeader>
        <CardBody>
          {tableData && batches &&
            <Table
              tableHeaderColor="primary"
              tableHead={["Nro de Lote", "Producto", "Produccion", "Estado", "Trizado", "Responsable"]}
              defaultOrderBy={3}
              defaultOrder={'desc'}
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
