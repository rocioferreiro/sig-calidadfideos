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

// @ts-ignore
const useStyles = makeStyles(styles);

export default function InProgressTable() {
  const classes = useStyles();
  const [batches, setBatches] = React.useState();

  React.useEffect(() => {
    get('batches/state/PROCESANDO').then(res => {
      console.log(res)
    })
  }, [])

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
              tableHead={["Nro de Lote", "Producto", "Produccion", "Estado de Muestra"]}
              tableData={[
                ["1", "Tirabuzon Marolio", "10/10/2022", "Listo para Control"],
                ["2", "Coditos Marolio", "10/10/2022", "2hs hasta control"],
                ["3", "Tirabuzon Marolio", "10/10/2022", "3 dias hasta control"],
                ["4", "Coditos Marolio", "10/10/2022", "Listo para Control"],
                ["5", "Tirabuzon Lucchetti", "10/10/2022", "4hs hasta control"],
                ["6", "Tirabuzon Marolio", "10/10/2022", "8 dias hasta control"],
              ]}
            />
          </CardBody>
        </Card>
    </GridContainer>
  );
}
