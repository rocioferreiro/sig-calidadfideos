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
import {get, post} from "../../services/http";
import {useHistory} from "react-router-dom";

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
  const [products, setProducts] = React.useState([]);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      sku: '',
      productId: '',
      batchNumber: '',
      productionDate: new Date(),
    },
    onSubmit: values => {
      if(values.batchNumber.toString().length > 10 || values.batchNumber.toString().length < 10) alert('El numero de lote debe ser de 10 caracteres!')
      else {
        post('batches', {
          productId: Number(values.productId),
          batchNumber: Number(values.batchNumber),
          productionDate: values.productionDate,
          state: 'PROCESANDO',
          shatterLevel: 0
        }, {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }).then(() => {
          history.push('/admin/inprogress')
        }).catch(e => {
          debugger;
          alert(e);
        })
      }
    },
  });

  React.useEffect(() => {
    get('products').then(res => {
      setProducts(res.prods)
    })
  }, [])

  return <Layout>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Nuevo Lote</h4>
        <p className={classes.cardCategoryWhite}>Complete los datos del lote</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <FormControl
              className={classes.formControl}
              fullWidth={true}
            >
              <InputLabel htmlFor="product">SKU - Producto</InputLabel>
              <Select
                value={formik.values.product}
                onChange={formik.handleChange}
                inputProps={{
                  name: 'productId',
                  id: 'productId',
                }}
              >
                <MenuItem value="">
                  <em>Vaciar</em>
                </MenuItem>
                {products.map(p => {
                  return <MenuItem value={p.id}>{p.SKU} - {p.type} {p.brand}</MenuItem>
                })}

                {/*<MenuItem value={2}>Coditos Marolio</MenuItem>*/}
                {/*<MenuItem value={3}>Tirabuzon Lucchetti</MenuItem>*/}
              </Select>
            </FormControl>
          </GridItem>

        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nro de Lote"
              id="batchNumber"
              formControlProps={{
                fullWidth: true,
              }}
              inputProps={{
                value: formik.values.batchNumber,
                onChange: formik.handleChange,
                max: "9999999999",
                min: "1000000000",
                type: 'number'
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <FormControl
              className={classes.formControl}
              fullWidth={true}
            >
              <TextField
                id="productionDate"
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
        <Button color="primary" onClick={formik.submitForm} type={'submit'}> CREAR </Button>
      </CardFooter>
    </Card>
  </Layout>

}
