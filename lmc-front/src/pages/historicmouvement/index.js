import { filter } from 'lodash';
import { useState, useEffect, useRef } from 'react';
// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// material
import {
  Box,
  Button,
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  formLabelClasses
} from '@material-ui/core';

// Modal Importations
import { makeStyles } from '@material-ui/styles';

import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrintMouv';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import {
  HistoricListToolbar,
  HistoricMouvMoreMenu
} from '../../components/_dashboard/historicmouvement';
import { CheckUserAuth } from '../../utils/auth';

import './Historic.css';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: 'Numéro', alignRight: false },
  // { id: 'pays_id', label: 'Pays', alignRight: false },
  { id: 'taille', label: 'Taille', alignRight: false },
  { id: 'Type', label: 'Type', alignRight: false },
  // { id: 'materiel_id', label: 'Matériel', alignRight: false },
  // { id: 'proprietaire_id', label: 'Propriétaire', alignRight: false },
  { id: 'voyage', label: 'N° Voyage', alignRight: false },
  { id: 'bl', label: 'N° B/L', alignRight: false },
  // { id: 'constructeur', label: 'Constructeur', alignRight: false },
  { id: 'navire', label: 'Navire', alignRight: false },
  { id: 'eta', label: 'ETA', alignRight: false },
  { id: 'contenu', label: 'Contenu', alignRight: false },
  { id: 'poids', label: 'Poids', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  // { id: 'societe_inspection', label: 'Société Insp.', alignRight: false },
  // { id: 'dernier_constat', label: 'Dernier Const.', alignRight: false },
  { id: 'numeromemo', label: 'Numéro Memo', alignRight: false },
  { id: 'agence', label: 'Agence', alignRight: false },
  { id: 'caution', label: 'Caution', alignRight: false },
  { id: 'destination', label: 'Destination', alignRight: false },
  { id: 'dates', label: 'Date', alignRight: false },
  // { id: 'date_operation', label: 'Date Op.', alignRight: false },
  // { id: 'montant', label: 'Montant', alignRight: false },
  // { id: 'numero_recu', label: 'Numéro Réçu', alignRight: false },
  { id: 'name', label: 'Insérer par', alignRight: false },
  // { id: 'date', label: 'Date', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query.filterName || query.filterStartDate || query.filterEndDate) {
    let dataFiltered = null;

    if (query.filterName) {
      dataFiltered = filter(
        array,
        (_user) => _user.numero.toLowerCase().indexOf(query.filterName.toLowerCase()) !== -1
      );
    }

    if (query.filterStartDate) {
      const finalData = dataFiltered || array;
      dataFiltered = filter(
        finalData,
        (_user) => _user.dates.toLowerCase() >= query.filterStartDate.toLowerCase()
      );
    }
    if (query.filterEndDate) {
      const finalData = dataFiltered || array;
      dataFiltered = filter(
        finalData,
        (_user) => _user.dates.toLowerCase() >= query.filterEndDate.toLowerCase()
        // (_user) => new Date(query.filterEndDate).getTime() >= new Date(_user.dates).get.getTime()
      );
    }
    return dataFiltered;
  }
  return stabilizedThis.map((el) => el[0]);
  // if (query) {
  //   return filter(array, (_user) => _user.number.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  // }
  // return stabilizedThis.map((el) => el[0]);
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

export default function User() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [historic, setHistoric] = useState([]);
  const componentRef = useRef();

  const [dataChange, setDataChange] = useState(false);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/newmouvement/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoric(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/newmouvement/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoric(value.data);
      })
      .catch(() => {});
  }, [dataChange]);

  const isDataChange = () => {
    if (dataChange) {
      setDataChange(false);
    } else {
      setDataChange(true);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = historic.map((n) => n.numero);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, numero) => {
    const selectedIndex = selected.indexOf(numero);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, numero);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const handleFilterStartDate = (event) => {
    setFilterStartDate(event.target.value);
  };

  const handleFilterEndDate = (event) => {
    setFilterEndDate(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - historic.length) : 0;

  const filteredHistoric = applySortFilter(historic, getComparator(order, orderBy), {
    filterName,
    filterStartDate,
    filterEndDate
  });

  const isUserNotFound = filteredHistoric.length === 0;

  return (
    <Page title="Historique | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Historique Mouvements
          </Typography>
        </Stack>

        <ToastContainer />
        <CheckUserAuth />

        <Card>
          <HistoricListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterStartDate={handleFilterStartDate}
            onFilterEndDate={handleFilterEndDate}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={historic.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredHistoric
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        numero,
                        taille,
                        type,
                        voyage,
                        bl,
                        navire,
                        eta,
                        contenu,
                        poids,
                        client,
                        numeromemo,
                        agence,
                        caution,
                        destination,
                        dates,
                        name
                      } = row;

                      const isItemSelected = selected.indexOf(numero) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, numero)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {numero}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <br /> */}
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {taille}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {type}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {voyage}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {bl}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {navire}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {eta}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {contenu}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {poids}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {client}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {numeromemo}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {agence}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {caution}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {destination}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {dates}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {date}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell align="right">
                            <HistoricMouvMoreMenu
                              idHistoric={id}
                              numberMouvement={numero}
                              tailleMouvement={taille}
                              typeMouvement={type}
                              voyageMouvement={voyage}
                              blMouvement={bl}
                              navireMouvement={navire}
                              etaMouvement={eta}
                              contenuMouvement={contenu}
                              poidsMouvement={poids}
                              clientMouvement={client}
                              numeromemmoMouvement={numeromemo}
                              agenceMouvement={agence}
                              cautionMouvement={caution}
                              destinationMouvement={destination}
                              datesMouvement={dates}
                              nameMouvement={name}
                              sendInformation={(value) => isDataChange(value)}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={historic.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        {historic.length > 0 ? (
          <Card className="card-botton-wrapper-2">
            <Box className="box-botton-wrapper" />
            <div>
              <ReactToPrint
                // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
                // to the root node of the returned component as it will be overwritten.
                trigger={() => (
                  <Button variant="contained" color="primary">
                    Imprimer
                  </Button>
                )}
                content={() => componentRef.current}
                suppressErrors
              />
              <ComponentToPrint ref={componentRef} rows={filteredHistoric} />
            </div>
          </Card>
        ) : null}
      </Container>
    </Page>
  );
}
