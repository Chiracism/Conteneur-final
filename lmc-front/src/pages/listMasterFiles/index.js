import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
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

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import { HistoricListToolbar, HistoricMoreMenu } from '../../components/_dashboard/listhistoric';

// import { numberValidation } from '../../utils/validate';
import { CheckUserAuth } from '../../utils/auth';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: 'Numéro', alignRight: false },
  // { id: 'pays_id', label: 'Pays', alignRight: false },
  { id: 'typeconteneurid', label: 'Type', alignRight: false },
  { id: 'tailleconteneurid', label: 'Taille', alignRight: false },
  // { id: 'materiel_id', label: 'Matériel', alignRight: false },
  // { id: 'proprietaire_id', label: 'Propriétaire', alignRight: false },
  { id: 'etatconteneurid', label: 'Etat', alignRight: false },
  // { id: 'constructeur', label: 'Constructeur', alignRight: false },
  { id: 'datefabrication', label: 'Date Fab.', alignRight: false },
  { id: 'dateentrerservice', label: 'Date E/S.', alignRight: false },
  { id: 'datederniereinspection', label: 'Date D/I.', alignRight: false },
  { id: 'valeurassuree', label: 'Valeur Assurée', alignRight: false },
  { id: 'deviseid', label: 'Devise', alignRight: false },
  // { id: 'societe_inspection', label: 'Société Insp.', alignRight: false },
  // { id: 'dernier_constat', label: 'Dernier Const.', alignRight: false },
  { id: 'siteid', label: 'Site', alignRight: false },
  // { id: 'sous_site_id', label: 'Sous-site', alignRight: false },
  // { id: 'date_mouvement', label: 'Date Mouv.', alignRight: false },
  // { id: 'observation', label: 'Observation', alignRight: false },
  // { id: 'client', label: 'Client', alignRight: false },
  // { id: 'date_operation', label: 'Date Op.', alignRight: false },
  { id: 'montant', label: 'Montant', alignRight: false },
  { id: 'numerorecu', label: 'Numéro Réçu', alignRight: false },
  // { id: 'name', label: 'Utilisateur', alignRight: false },
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
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
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
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [historicTab, setHistoricTab] = useState([]);
  const [countrieindexInput, setCountrieIndexInput] = useState('');
  const [countrienameInput, setCountrieNameInput] = useState('');

  const [historic, setHistoric] = useState('');

  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoric(value.data);
      })
      .catch(() => {});
  }, []);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setCountrieTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setHistoricTab(value.data);
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
      const newSelecteds = setHistoricTab.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - setHistoricTab.length) : 0;

  const filteredHistoric = applySortFilter(historicTab, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredHistoric.length === 0;

  return (
    <Page title="Liste | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Liste des Masterfiles
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
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={setHistoricTab.length}
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
                        number,
                        namenavire,
                        paysid,
                        typeconteneurid,
                        tailleconteneurid,
                        materielid,
                        proprietaireid,
                        etatconteneurid,
                        constructeur,
                        datefabrication,
                        dateentrerservice,
                        datederniereinspection,
                        valeurassuree,
                        deviseid,
                        societeinspection,
                        dernierconstat,
                        siteid,
                        soussiteid,
                        datemouvement,
                        observation,
                        client,
                        dateoperation,
                        montant,
                        numerorecu,
                        date,
                        name
                      } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

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
                              onChange={(event) => handleClick(event, number)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {number}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {typeconteneurid}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" align="center" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography align="center" variant="subtitle2" noWrap>
                                {tailleconteneurid}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {etatconteneurid}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {datefabrication}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {dateentrerservice}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {datederniereinspection}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {valeurassuree}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {deviseid}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {siteid}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
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
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" justifyContent="center" spacing={2}>
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="right">
                            <HistoricMoreMenu
                              idHistoric={id}
                              numberMaster={number}
                              namenavireMaster={namenavire}
                              paysisMaster={paysid}
                              typeconteneuridMaster={typeconteneurid}
                              tailleconteneuridMaster={tailleconteneurid}
                              materielidMaster={materielid}
                              proprietaireidMaster={proprietaireid}
                              etatconteneurid={etatconteneurid}
                              constructeurMaster={constructeur}
                              datefabricationMaster={datefabrication}
                              dateentrerserviceMaster={dateentrerservice}
                              datederniereinspectionMaster={datederniereinspection}
                              valeurassureeMaster={valeurassuree}
                              deviseidMaster={deviseid}
                              societeinspectionMaster={societeinspection}
                              dernierconstatMaster={dernierconstat}
                              siteidMaster={siteid}
                              soussiteidMaster={soussiteid}
                              datemouvementMaster={datemouvement}
                              observationMaster={observation}
                              clientMaster={client}
                              dateoperationMaster={dateoperation}
                              montantMaster={montant}
                              numerorecuMaster={numerorecu}
                              dateMaster={date}
                              // indexCountrie={index}
                              // nameCountrie={name}
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
            count={setHistoricTab.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
