import React from 'react';
import { FormControl, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory, useParams } from 'react-router-dom';
import { useFormik } from 'formik';

import Layout from '../../components/Layout';
import GridItem from '../../components/Grid/GridItem.js';
import GridContainer from '../../components/Grid/GridContainer.js';
import Button from '../../components/CustomButtons/Button.js';
import Card from '../../components/Card/Card.js';
import CardHeader from '../../components/Card/CardHeader.js';
import CardBody from '../../components/Card/CardBody.js';
import CardFooter from '../../components/Card/CardFooter.js';
import {get, post} from '../../services/http';


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

export default function NewSample(){
  const classes = useStyles();
  const params = useParams();
  const history = useHistory();
  const [batchNumber, setBatchNumber] = React.useState(0);
  const formik = useFormik({
    initialValues: {
      packingDate: new Date()
    },
    onSubmit: values => {
      post(`samples/${params.id}/${localStorage.getItem('id')}`, {
        packingDate: values.packingDate,
        state: 'cargado'
      }, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      }).then(() => {
        history.push(`/batch/${params.id}`)
      }).catch(e => {
        alert(e);
      })
    },
  });

  React.useEffect(() => {
    get(`batches/${params.id}`).then(res => {
      setBatchNumber(res.batch.batchNumber)
    })
  }, [])

  return <Layout>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Nueva Muestra para el Lote n° {batchNumber}</h4>
        <p className={classes.cardCategoryWhite}>Complete fecha de envasado del paquete</p>
      </CardHeader>
      <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <FormControl
              className={classes.formControl}
              fullWidth={true}
            >
              <TextField
                id="packingDate"
                label="Fecha de envasado"
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
