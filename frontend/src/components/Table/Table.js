import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle.js";
import {useHistory} from "react-router-dom";
import {Box, TableSortLabel} from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, ids } = props;
  const history = useHistory();
  const [order, setOrder] = React.useState(props.defaultOrder);
  const [orderBy, setOrderBy] = React.useState(props.defaultOrderBy);
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const onRequestSort = ( event, property ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    <TableSortLabel
                      active={orderBy === key+1}
                      direction={orderBy === key+1 ? order : 'asc'}
                      onClick={createSortHandler(key+1)}
                    >
                      {prop}
                      {orderBy === key+1 ? (
                        <Box component="span" >
                          {/*{order === 'desc' ? 'sorted descending' : 'sorted ascending'}*/}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {stableSort(tableData, getComparator(order, orderBy)).map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow} onClick={()=>props.type === 'batch' ? history.push(`/batch/${prop[0]}`) : {}}>
                {prop.slice(1).map((prop, key) => {
                  if(Date.parse(prop) && new Date(prop).getFullYear() >= 2022){
                    return (
                      <TableCell className={classes.tableCell} key={key}>
                        {new Date(prop).toUTCString().substring(0,22)}
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  ids: PropTypes.arrayOf(PropTypes.number),
  defaultOrderBy: PropTypes.number,
  defaultOrder: PropTypes.string,
};


function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
