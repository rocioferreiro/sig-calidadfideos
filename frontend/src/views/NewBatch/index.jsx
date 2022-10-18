import React from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

import Layout from "../../components/Layout";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import {useFormik} from "formik";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  formControl: {
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative",
    verticalAlign: "unset",
  },
  textField: {
    // marginLeft: 12,
    // marginRight: 12,
    // width: 200,
  },
};

// @ts-ignore
const useStyles = makeStyles(styles);

export default function NewBatch(){
  const classes = useStyles();
  const products = [
    {type: '', brand: ''},
    {type: 'tirabuzon', brand: 'Marolio'},
    {type: 'coditos', brand: 'Marolio'},
    {type: 'coditos', brand: 'Lucchetti'},
  ]
  const formik = useFormik({
    initialValues: {
      sku: '',
      product: 1,
      batchNumber: '',
      date: new Date(),
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return <Layout>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Nuevo Lote</h4>
        <p className={classes.cardCategoryWhite}>Complete los datos del lote</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="SKU"
              id="sku"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: formik.values.sku,
                onChange: formik.handleChange
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nro de Lote"
              id="batchNumber"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: formik.values.batchNumber,
                onChange: formik.handleChange
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <FormControl
              className={classes.formControl}
              fullWidth={true}
            >
              <InputLabel htmlFor="product">Producto</InputLabel>
              <Select
                value={formik.values.product}
                onChange={formik.handleChange}
                inputProps={{
                  name: 'product',
                  id: 'product',
                }}
              >
                <MenuItem value="">
                  <em>Vaciar</em>
                </MenuItem>
                <MenuItem value={1}>Tirabuzon Marolio</MenuItem>
                <MenuItem value={2}>Coditos Marolio</MenuItem>
                <MenuItem value={3}>Tirabuzon Lucchetti</MenuItem>
              </Select>
            </FormControl>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <FormControl
              className={classes.formControl}
              fullWidth={true}
            >
              <TextField
                id="date"
                label="Fecha de producción"
                type="datetime-local"
                value={formik.values.date}
                onChange={formik.handleChange}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button color="primary" onClick={formik.submitForm}> CREAR </Button>
      </CardFooter>
    </Card>
  </Layout>

}
