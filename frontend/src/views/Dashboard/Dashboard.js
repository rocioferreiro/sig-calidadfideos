import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import {CheckCircle, NotInterested, Report, TrackChanges, Warning as WarningIcon} from "@material-ui/icons";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Danger from "../../components/Typography/Danger.js";
import Warning from "../../components/Typography/Warning.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";


import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import {InfoRounded} from "@material-ui/icons";
import Success from "../../components/Typography/Success";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {get} from "../../services/http";
import Chartist from "chartist";

const useStyles = makeStyles(styles);

const efficiencyExamples = [92, 90, 87, 85, 82, 89, 97, 91, 87, 85, 89];
const pncVisualExamples = [90, 91, 92, 93, 89, 87, 90, 89, 87, 91, 89];
const pncExamples = [19, 17, 20, 21, 18, 17, 19, 23, 16, 20, 19];
const rejectedExamples = [7, 6, 5, 7, 8, 9, 10, 8, 7, 6, 7];
const concessionExamples = [11, 10, 9, 10, 12, 13, 11, 11, 12, 14, 10];

export default function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const [headerValues, setHeaderValues] = React.useState();
  const [efficiencyChartInfo, setEfficiencyChartInfo] = React.useState(dailySalesChart);
  const [pncChartInfo, setPncChartInfo] = React.useState(emailsSubscriptionChart);
  const [pncVisualChartInfo, setPncVisualChartInfo] = React.useState(emailsSubscriptionChart);
  const [rejectedChartInfo, setRejectedChartInfo] = React.useState(completedTasksChart);
  const [concessionChartInfo, setConcessionChartInfo] = React.useState(dailySalesChart);

  React.useEffect(() => {
    let delays = 80,
      durations = 500;
    let delays2 = 80,
      durations2 = 500;
    let month = [
      {num: 1, name: "Ene"},
      {num: 2, name: "Feb"},
      {num: 3, name: "Mar"},
      {num: 4, name: "Abr"},
      {num: 5, name: "May"},
      {num: 6, name: "Jun"},
      {num: 7, name: "Jul"},
      {num: 8, name: "Ago"},
      {num: 9, name: "Sep"},
      {num: 10, name: "Oct"},
      {num: 11, name: "Nov"},
      {num: 12, name: "Dic"},
    ];
    let labels = [12];
    let d = new Date();
    d.setDate(1);
    for (let i=11; i>=0; i--) {
      labels[i] = month[d.getMonth()];
      d.setMonth(d.getMonth() - 1);
    }
    get('dashboardHeader').then(res => {
      setHeaderValues(res);
    })
    get('efficiencyMonthly').then(res => {
      let series = [12];
      for (let i=11; i>=0; i--) {
        series[i] = res.efficiencyByMonth.filter(j => j.month === labels[i].num).length < 1 ? efficiencyExamples[i] : parseInt(res.efficiencyByMonth.filter(j => j.month === labels[i].num)[0].value);
      }

      const info = {
        data: {
          labels: labels.map(l => l.name),
          series: [series],
        },
        options: {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 30,
          high: 100,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        // for animation
        animation: {
          draw: function (data) {
            if (data.type === "line" || data.type === "area") {
              data.element.animate({
                d: {
                  begin: 600,
                  dur: 700,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint,
                },
              });
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease",
                },
              });
            }
          },
        },
      }
      setEfficiencyChartInfo(info);
    })
    get('rejectedMonthly').then(res => {
      let series = [12];
      for (let i=11; i>=0; i--) {
        series[i] = res.rejectedByMonth.filter(j => j.month === labels[i].num).length < 1 ? rejectedExamples[i] : parseInt(res.rejectedByMonth.filter(j => j.month === labels[i].num)[0].value);
      }

      const info = {
        data: {
          labels: labels.map(l => l.name),
          series: [series],
        },
        options: {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 30,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        // for animation
        animation: {
          draw: function (data) {
            if (data.type === "line" || data.type === "area") {
              data.element.animate({
                d: {
                  begin: 600,
                  dur: 700,
                  from: data.path
                    .clone()
                    .scale(1, 0)
                    .translate(0, data.chartRect.height())
                    .stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint,
                },
              });
            } else if (data.type === "point") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: "ease",
                },
              });
            }
          },
        },
      }
      setRejectedChartInfo(info);
    })
    get('concessionMonthly').then(res => {
      let series = [12];
      for (let i=11; i>=0; i--) {
        series[i] = res.concessionByMonth.filter(j => j.month === labels[i].num).length < 1 ? concessionExamples[i] : parseInt(res.concessionByMonth.filter(j => j.month === labels[i].num)[0].value);
      }

      const info = {
        data: {
          labels: labels.map(l => l.name),
          series: [series],
        },
        options: {
          lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 30,
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
        animation: {
          draw: function (data) {
            if (data.type === "bar") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays2,
                  dur: durations2,
                  from: 0,
                  to: 1,
                  easing: "ease",
                },
              });
            }
          },
        },
      }
      setConcessionChartInfo(info);
    })
    get('pncMonthly').then(res => {
      let series = [12];
      for (let i=11; i>=0; i--) {
        series[i] = res.pncByMonth.filter(j => j.month === labels[i].num).length < 1 ? pncExamples[i] : parseInt(res.pncByMonth.filter(j => j.month === labels[i].num)[0].value);
      }
      const info = {
        data: {
          labels: labels.map(l => l.name),
          series: [series],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 40,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
        animation: {
          draw: function (data) {
            if (data.type === "bar") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays2,
                  dur: durations2,
                  from: 0,
                  to: 1,
                  easing: "ease",
                },
              });
            }
          },
        },
      }
      setPncChartInfo(info);
    })
    get('pncByVisualMonthly').then(res => {
      let series = [12];
      for (let i=11; i>=0; i--) {
        series[i] = res.pncByMonth.filter(j => j.month === labels[i].num).length < 1 ? pncVisualExamples[i] : parseInt(res.pncByMonth.filter(j => j.month === labels[i].num)[0].value);
      }
      const info = {
        data: {
          labels: labels.map(l => l.name),
          series: [series],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 70,
          high: 100,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
        animation: {
          draw: function (data) {
            if (data.type === "bar") {
              data.element.animate({
                opacity: {
                  begin: (data.index + 1) * delays2,
                  dur: durations2,
                  from: 0,
                  to: 1,
                  easing: "ease",
                },
              });
            }
          },
        },
      }
      setPncVisualChartInfo(info);
    })
  }, [])

  return (
    <div>
      {headerValues && <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color={headerValues.efficiency >= 90 ? "success" : headerValues.efficiency >= 75 ? 'warning' : 'danger'}>
                <TrackChanges />
              </CardIcon>
              <p className={classes.cardCategory}>Eficacia de análisis de lotes</p>
              <h3 className={classes.cardTitle}>
                {(Math.round(headerValues.efficiency * 100) / 100).toFixed(2)} <small>%</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {headerValues.efficiency >= 90 ?
                  <Success>
                    <CheckCircle />
                    Valor mejor al esperado
                  </Success> :
                  headerValues.efficiency >= 75 ?
                    <Warning>
                      <InfoRounded />
                      Amuntar ligeramente
                    </Warning>
                    :
                    <Danger>
                      <WarningIcon />
                      Debe aumentar
                    </Danger>
                }

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color={headerValues.pncPercentage <= 5 ? "success" : headerValues.pncPercentage <= 15 ? 'warning' : 'danger'}>
                <Report />
              </CardIcon>
              <p className={classes.cardCategory}>Producto no conforme</p>
              <h3 className={classes.cardTitle}>
                {(Math.round(headerValues.pncPercentage * 100) / 100).toFixed(2)} <small>%</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {headerValues.pncPercentage <= 5 ?
                  <Success>
                    <CheckCircle />
                    Valor mejor al esperado
                  </Success> :
                  headerValues.pncPercentage <= 15 ?
                    <Warning>
                      <InfoRounded />
                      Reducir ligeramente
                    </Warning>
                    :
                    <Danger>
                      <WarningIcon />
                      Debe reducirse
                    </Danger>
                }

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader stats icon>
              <CardIcon color={headerValues.rejectedPercentage <= 2 ? "success" : headerValues.rejectedPercentage <= 10 ? 'warning' : 'danger'}>
                <NotInterested />
              </CardIcon>
              <p className={classes.cardCategory}>Porcentaje de lotes rechazados</p>
              <h3 className={classes.cardTitle}>
                {(Math.round(headerValues.rejectedPercentage * 100) / 100).toFixed(2)} <small>%</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {headerValues.rejectedPercentage <= 2 ?
                  <Success>
                    <CheckCircle />
                    Valor mejor al esperado
                  </Success> :
                  headerValues.rejectedPercentage <= 10 ?
                    <Warning>
                      <InfoRounded />
                      Reducir ligeramente
                    </Warning>
                    :
                    <Danger>
                      <WarningIcon />
                      Debe reducirse
                    </Danger>
                }

              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <Button onClick={() => history.push('/batch/new')}> Agregar nuevo lote </Button>
          </Card>
        </GridItem>
      </GridContainer>}

      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          {efficiencyChartInfo && <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={efficiencyChartInfo.data}
                type="Line"
                options={efficiencyChartInfo.options}
                listener={efficiencyChartInfo.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Eficiencia de analisis (%)</h4>
              <p className={classes.cardCategory}>
                Totales mensuales de eficiencia del ultimo año
              </p>
            </CardBody>
          </Card>}
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={pncChartInfo.data}
                type="Bar"
                options={pncChartInfo.options}
                responsiveOptions={pncChartInfo.responsiveOptions}
                listener={pncChartInfo.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Producto No Conforme (%)</h4>
              <p className={classes.cardCategory}>Porcentaje no conforme de analizados por mes</p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={rejectedChartInfo.data}
                type="Line"
                options={rejectedChartInfo.options}
                listener={rejectedChartInfo.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Lotes Rechazados (%)</h4>
              <p className={classes.cardCategory}>Porcentaje rechazados de analizados por mes</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={concessionChartInfo.data}
                type="Bar"
                options={concessionChartInfo.options}
                responsiveOptions={concessionChartInfo.responsiveOptions}
                listener={concessionChartInfo.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Concesion de Liberados (%)</h4>
              <p className={classes.cardCategory}>
                Porcentaje de concesion de los liberados por mes
              </p>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={pncVisualChartInfo.data}
                type="Bar"
                options={pncVisualChartInfo.options}
                responsiveOptions={pncVisualChartInfo.responsiveOptions}
                listener={pncVisualChartInfo.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>No Conformes por control visual (%)</h4>
              <p className={classes.cardCategory}>Porcentaje de PNC que obtuvo trizado en el control visual</p>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
