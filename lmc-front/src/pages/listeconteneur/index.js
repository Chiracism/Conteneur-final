import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import axios from 'axios';
// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwt from 'jsonwebtoken';

import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Autocomplete,
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

// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../components/_dashboard/user';
import {
  ListeConteneurToolbar,
  ListeConteneurMoreMenu
} from '../../components/_dashboard/listeconteneur';

// import { numberValidation } from '../../utils/validate';
import { CheckUserAuth } from '../../utils/auth';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'numero', align: 'left', label: 'Numéro Conteneur', alignRight: false },
  { id: 'taille', label: 'Taille', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'billoflading', label: 'B/L', alignRight: false },
  { id: 'navire', label: 'Navire', alignRight: false },
  { id: 'eta', label: 'ETA', alignRight: false },
  { id: 'client', label: 'Client', alignRight: false },
  { id: 'agence', label: 'Agence', alignRight: false },
  { id: 'caution', label: 'Caution', alignRight: false },
  { id: 'observation', label: 'Observation', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
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
    width: 1000,
    height: 600
  }
}));

export default function Listeconteneur() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('numero');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [user, setUser] = useState(null);

  const [listeconteneurTab, setListeconteneurTab] = useState([]);
  const [numeroInput, setNumeroInput] = useState('');
  // const [tailleInput, setTailleInput] = useState('');
  // const [typeInput, setTypeInput] = useState('');
  const [billofladingInput, setBillOfLadingInput] = useState('');
  // const [navireInput, setNavireInput] = useState('');
  const [etaInput, setEtaInput] = useState('');
  // const [clientInput, setClientInput] = useState('');
  // const [agenceInput, setAgenceInput] = useState('');
  const [cautionInput, setCautionInput] = useState('');
  const [observationInput, setObservationInput] = useState('');

  const [dataChange, setDataChange] = useState(false);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const classes = useStyles();

  /**
   * Informations for MasterFile
   */
  const [surestarienumeroTab, setSurestarieNumeroTab] = useState([]);
  const [surestarienumeroInput, setSurestarieNumeroInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/newmasterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieNumeroTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/listeconteneur/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setListeconteneurTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/listeconteneur/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setListeconteneurTab(value.data);
      })
      .catch(() => {});
  }, [dataChange]);

  /**
   * Informations for Taille
   */
  const [tailleTab, setTailleTab] = useState([]);
  const [tailleInput, setTailleInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setTailleTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Type
   */
  const [typeTab, setTypeTab] = useState([]);
  const [typeInput, setTypeInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [navireTab, setNavireTab] = useState([]);
  const [navireInput, setNavireInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [clientTab, setClientTab] = useState([]);
  const [clientInput, setClientInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setClientTab(value.data);
      })
      .catch(() => {});
  }, []);

  // /**
  //  * Informations for Agence
  //  */
  // const [agenceTab, setAgenceTab] = useState([]);
  // const [agenceInput, setAgenceInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/agence/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setAgenceTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Agence
   */
  const [agenceTab, setAgenceTab] = useState([]);
  const [agenceInput, setAgenceInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/agence/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setAgenceTab(value.data);
      })
      .catch(() => {});
  }, []);

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
    toast.success('Le Conteneur a été enregistré avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1200
    });
  };

  const addListeConteneur = (surestarienumeroInput, tailleInput, typeInput, billofladingInput) => {
    if (
      surestarienumeroInput !== '' &&
      surestarienumeroInput !== null &&
      tailleInput !== '' &&
      tailleInput !== null &&
      typeInput !== '' &&
      typeInput !== null &&
      billofladingInput !== '' &&
      billofladingInput !== null
    )
      axios
        .post(
          `${process.env.REACT_APP_BASE_URL}/listeconteneur/`,
          {
            numero: surestarienumeroInput,
            taille: tailleInput,
            type: typeInput,
            billoflading: billofladingInput,
            navire: navireInput,
            eta: etaInput,
            client: clientInput,
            agence: agenceInput,
            caution: cautionInput,
            observation: observationInput,
            name: user.name,
            date: new Date()
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
            }
          }
        )
        .then(() => {
          isDataChange();
          handleClose();

          setNumeroInput('');
          setTailleInput('');
          setTypeInput('');
          setBillOfLadingInput('');
          setNavireInput('');
          setEtaInput('');
          setClientInput('');
          setAgenceInput('');
          setCautionInput('');
          setObservationInput('');
          showSuccessToast();
        })
        .catch(() => {
          setNumeroInput('');
          setTailleInput('');
          setTypeInput('');
          setBillOfLadingInput('');
          setNavireInput('');
          setEtaInput('');
          setClientInput('');
          setAgenceInput('');
          setCautionInput('');
          setObservationInput('');
        });
  };

  useEffect(() => {
    // Get User Auth
    const tokenData = localStorage.getItem('lmc_token');

    if (tokenData) {
      const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);

      setUser(user);
    }
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = setListeconteneurTab.map((n) => n.numero);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - setListeconteneurTab.length) : 0;

  const filteredlisteconteneur = applySortFilter(
    listeconteneurTab,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredlisteconteneur.length === 0;

  return (
    <Page title="Conteneur | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Conteneur
          </Typography>
          <Button
            variant="contained"
            startIcon={<Icon icon={plusFill} />}
            onClick={() => handleOpen()}
          >
            Nouveau Conteneur
          </Button>
        </Stack>

        <ToastContainer />
        <CheckUserAuth />

        {openModal ? (
          <Modal
            aria-describedby="simple-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={handleClose}
          >
            <div className={classes.paper}>
              <h2 align="center" id="simple-modal-title">
                Conteneur
              </h2>
              <Card className="card-wrapper">
                <Box className="box-wrapper">
                  <div className="input-label-wrapper">
                    N° Conteneur:{' '}
                    <Autocomplete
                      className="combo-box-completion"
                      options={surestarienumeroTab}
                      onChange={(event, newType) => {
                        if (newType) {
                          setSurestarieNumeroInput(newType.numero);
                        } else {
                          setSurestarieNumeroInput(null);
                        }
                      }}
                      getOptionLabel={(option) => option.numero}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sélectionner le numero" variant="outlined" />
                      )}
                    />
                  </div>
                  {/* <div className="input-label-wrapper">
                    N° Conteneur:{' '}
                    <TextField
                      label="Saisissez le numéro de conteneur"
                      variant="outlined"
                      style={{ marginTop: 20, marginBottom: 20 }}
                      value={numeroInput}
                      onChange={(e) => setNumeroInput(e.target.value)}
                    />
                  </div> */}
                  <div className="input-label-wrapper">
                    Taille:{' '}
                    <Autocomplete
                      className="combo-box-completion"
                      options={tailleTab}
                      onChange={(event, newType) => {
                        if (newType) {
                          setTailleInput(newType.name);
                        } else {
                          setTailleInput(null);
                        }
                      }}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sélectionner la Taille" variant="outlined" />
                      )}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    Navire:{' '}
                    <Autocomplete
                      className="combo-box-completion"
                      options={navireTab}
                      onChange={(event, newType) => {
                        if (newType) {
                          setNavireInput(newType.name);
                        } else {
                          setNavireInput(null);
                        }
                      }}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sélectionner le Navire" variant="outlined" />
                      )}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    Client:{' '}
                    <Autocomplete
                      className="combo-box-completion"
                      options={clientTab}
                      onChange={(event, newType) => {
                        if (newType) {
                          setClientInput(newType.name);
                        } else {
                          setClientInput(null);
                        }
                      }}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sélectionner le Client" variant="outlined" />
                      )}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    Montant de la Caution :{' '}
                    <TextField
                      label="Saisissez le montant"
                      variant="outlined"
                      style={{ marginTop: 20, marginBottom: 20 }}
                      value={cautionInput}
                      onChange={(e) => setCautionInput(e.target.value)}
                    />
                  </div>
                </Box>
                <Box className="box-wrapper">
                  <div className="input-label-wrapper">
                    Bill of lading / BL :{' '}
                    <TextField
                      label="Saisissez le Bill of Landing"
                      variant="outlined"
                      style={{ marginTop: 20, marginBottom: 20 }}
                      value={billofladingInput}
                      onChange={(e) => setBillOfLadingInput(e.target.value)}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    Type:{' '}
                    <Autocomplete
                      className="combo-box-completion"
                      options={typeTab}
                      onChange={(event, newType) => {
                        if (newType) {
                          setTypeInput(newType.name);
                        } else {
                          setTypeInput(null);
                        }
                      }}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sélectionner le type" variant="outlined" />
                      )}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    ETA:{' '}
                    <TextField
                      className="basic-input"
                      // label="Saisissez la date de Fabrication"
                      type="date"
                      variant="outlined"
                      value={etaInput}
                      onChange={(e) => {
                        setEtaInput(e.target.value);
                      }}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    Agence:{' '}
                    <Autocomplete
                      className="combo-box-completion"
                      options={agenceTab}
                      onChange={(event, newType) => {
                        if (newType) {
                          setAgenceInput(newType.name);
                        } else {
                          setAgenceInput(null);
                        }
                      }}
                      getOptionLabel={(option) => option.name}
                      style={{ width: 400 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Sélectionner l'Agence" variant="outlined" />
                      )}
                    />
                  </div>
                  <div className="input-label-wrapper">
                    Observation:{' '}
                    <TextField
                      className="basic-input"
                      label="Commentaires"
                      variant="outlined"
                      value={observationInput}
                      onChange={(e) => {
                        setObservationInput(e.target.value);
                      }}
                    />
                  </div>
                </Box>
              </Card>
              <Button
                onClick={() =>
                  addListeConteneur(
                    surestarienumeroInput,
                    tailleInput,
                    typeInput,
                    billofladingInput,
                    navireInput,
                    etaInput,
                    clientInput,
                    agenceInput,
                    cautionInput,
                    observationInput
                  )
                }
                variant="contained"
                startIcon={<Icon icon={plusFill} />}
              >
                Ajouter
              </Button>
            </div>
          </Modal>
        ) : null}

        <Card>
          <ListeConteneurToolbar
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
                  rowCount={setListeconteneurTab.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredlisteconteneur
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const {
                        id,
                        numero,
                        taille,
                        type,
                        billoflading,
                        navire,
                        eta,
                        client,
                        agence,
                        caution,
                        observation,
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
                                {billoflading}
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
                                {client}
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
                                {observation}
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
                            <ListeConteneurMoreMenu
                              idListeconteneur={id}
                              numeroInput={numeroInput}
                              tailleInput={tailleInput}
                              typeInput={typeInput}
                              billofladingInput={billofladingInput}
                              navireInput={navireInput}
                              etaInput={etaInput}
                              agenceInput={agenceInput}
                              clientInput={clientInput}
                              observationInput={observationInput}
                              name={name}
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
            count={setListeconteneurTab.length}
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
