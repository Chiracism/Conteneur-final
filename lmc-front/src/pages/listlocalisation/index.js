import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Box,
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  TextField
} from '@material-ui/core';

// Modal Importations
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';

import ReactToPrint from 'react-to-print';
import ComponentToPrintSurestarie from './ComponentToPrintSurestarie';

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import {
  HistoricListToolbar,
  HistoricMoreMenu
} from '../../components/_dashboard/listlocalisation';

// import { numberValidation } from '../../utils/validate';
import { CheckUserAuth } from '../../utils/auth';
import './HistoricSurestarie.css';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'numero', label: 'Numéro', alignRight: false },
  { id: 'taille', label: 'Taille', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'position', label: 'Position', alignRight: false },
  // { id: 'docderef', label: 'Document de Référence', alignRight: false },
  { id: 'datedepart', label: 'Date de Départ', alignRight: false },
  { id: 'port', label: 'Port', alignRight: false },
  { id: 'exportat', label: 'Element Export.', alignRight: false },
  { id: 'name', label: 'Insérer par', alignRight: false },
  { id: 'createdAt', label: 'Date de creation', alignRight: false },
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
        (_user) => _user.createdAt.toLowerCase() >= query.filterStartDate.toLowerCase()
      );
    }

    if (query.filterEndDate) {
      const finalData = dataFiltered || array;
      dataFiltered = filter(
        finalData,
        (_user) => _user.createdAt.toLowerCase() <= query.filterEndDate.toLowerCase()
        // (_user) =>
        //   new Date(query.filterEndDate).getTime() >= new Date(_user.createdAt).get.getTime()
      );
    }
    return dataFiltered;
  }
  return stabilizedThis.map((el) => el[0]);
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
    padding: theme.spacing(2, 4, 3),
    width: 700,
    height: 400
  }
}));

export default function Countrie() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('desc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('id');
  const [filterName, setFilterName] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [historicTab, setHistoricTab] = useState([]);
  const [countrieindexInput, setCountrieIndexInput] = useState('');
  const [countrienameInput, setCountrieNameInput] = useState('');

  const [historic, setHistoric] = useState([]);
  const componentRef = useRef();

  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/positionnement/`, {
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
    axios(`${process.env.REACT_APP_BASE_URL}/positionnement/`, {
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

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // React-Toastify-Notification
  const showSuccessToast = () => {
    toast.success('Le Pays a été enregistré avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1200
    });
  };

  // const addCountrie = (countrieindexInput, countrienameInput) => {
  //   if (countrieindexInput !== '' && countrieindexInput !== null && countrienameInput !== '')
  //     axios
  //       .post(
  //         `${process.env.REACT_APP_BASE_URL}/countrie/`,
  //         { index: countrieindexInput, name: countrienameInput },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //           }
  //         }
  //       )
  //       .then(() => {
  //         isDataChange();
  //         handleClose();

  //         setCountrieIndexInput('');
  //         setCountrieNameInput('');
  //         showSuccessToast();
  //       })
  //       .catch(() => {
  //         setCountrieIndexInput('');
  //         setCountrieNameInput('');
  //       });
  // };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = setHistoric.map((n) => n.numero);
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
    <Page title="Liste | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des Localisations
          </Typography>
          {/* <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => handleOpen()}
          >
            Nouveau Pays
          </Button> */}
        </Stack>

        <ToastContainer />
        <CheckUserAuth />

        {/* {openModal ? (
          <Modal
            aria-describedby="simple-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <h2 id="simple-modal-title">Ajouter un Pays</h2>
              <TextField
                label="Saisissez l'Index"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={countrieindexInput}
                onChange={(e) => setCountrieIndexInput(e.target.value)}
              />
              <TextField
                label="Saisissez le Nom"
                variant="outlined"
                style={{ marginTop: 20, marginBottom: 20 }}
                value={countrienameInput}
                onChange={(e) => setCountrieNameInput(e.target.value)}
              />
              <Button
                onClick={() => addCountrie(countrieindexInput, countrienameInput)}
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
              >
                Ajouter
              </Button>
            </div>
          </Modal>
        ) : null} */}

        <Card>
          <HistoricListToolbar
            numSelected={selected.length}
            filterName={filterName}
            filterStartDate={filterStartDate}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterByName}
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
                        position,
                        // docderef,
                        exportat,
                        datedepart,
                        port,
                        navire,
                        createdAt,
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
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {numero}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {taille}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" align="center" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography align="center" variant="subtitle2" noWrap>
                                {type}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {position}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {docderef}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {datedepart}
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
                                {port}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {exportat}
                              </Typography>
                            </Stack>
                          </TableCell>
                          {/* <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {montant}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {numerorecu}
                              </Typography>
                            </Stack>
                          </TableCell> */}
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {createdAt}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <HistoricMoreMenu
                              idHistoric={id}
                              numeroLocal={numero}
                              tailleLocal={taille}
                              typeLocal={type}
                              positionLocal={position}
                              navireLocal={navire}
                              datedepartLocal={datedepart}
                              exportLocal={exportat}
                              portLocal={port}
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
              <ComponentToPrintSurestarie ref={componentRef} rows={filteredHistoric} />
            </div>
          </Card>
        ) : null}
      </Container>
    </Page>
  );
}
