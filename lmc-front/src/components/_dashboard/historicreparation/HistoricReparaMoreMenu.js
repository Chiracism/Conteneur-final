import { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import jwt from 'jsonwebtoken';
// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editOutline from '@iconify/icons-eva/edit-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Autocomplete,
  Button,
  Box,
  Card,
  Container,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';

// Modal
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';

import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

// import { CheckUserAuth } from '../../utils/auth';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'auto',
    margin: 'auto',
    padding: '35em 2em 2em',
    // top: '2%',
    // overflow: 'scroll',
    // overflow: 'auto'
    // overflowY: 'scroll',
    // overflowX: 'scroll',
    overflow: 'scroll'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '4px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    // width: 1400,
    // height: 1000,
    // width: 100%,
    // height: 100%,
    // paddingTop: 50,
    // overflow: 'scroll'
    // overflow: 'auto'
    // overflowY: 'scroll',
    // overflowX: 'scroll',
    overflow: 'scroll'
  }
}));

// ----------------------------------------------------------------------

export default function UserMoreMenu({
  idHistoric,
  reparanumero,
  reparadernieredate,
  reparatypeconteneur,
  reparatailleconteneur,
  reparaproprietaire,
  reparapaysname,
  reparattaux,
  reparaheure,
  reparamateriel,
  reparattotal,
  reparanumerorecu,
  reparasocieterepara,
  reparasocietelocation,
  reparasite,
  reparadernieredateinsp,
  reparasociete,
  sendInformation
}) {
  const classes = useStyles();

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const componentRef = useRef();
  // const [index, setIndex] = useState(indexCountrie);
  // const [name, setName] = useState(nameCountrie);
  const [user, setUser] = useState(null);

  //   for Réparation
  //   const [reparanumeroInput, setReparaNumeroInput] = useState('');
  const [reparadatereparaInput, setReparaDateReparaInput] = useState(reparadernieredate);
  const [reparaheureInput, setReparaHeureInput] = useState(reparaheure);
  // const [reparamaterielInput, setReparaMaterielInput] = useState('');
  const [reparatotal, setReparaTotal] = useState(reparattotal);
  const [repararecuInput, setReparaRecuInput] = useState(reparanumerorecu);
  const [reparasocrepInput, setReparaSocRepInput] = useState(reparasocieterepara);
  const [reparasoclocInput, setReparaSocLocInput] = useState(reparasocietelocation);
  // const [reparasiteInput, setReparaSiteInput] = useState('');
  const [reparadateinspInput, setReparaDateInspInput] = useState(reparadernieredateinsp);
  const [reparasocieteInput, setReparaSocieteInput] = useState(reparasociete);

  const [dataChange, setDataChange] = useState(false);

  function disabledPrint() {
    if (reparanumeroInput !== '' && reparanumeroInput !== null) return false;
    return true;
  }

  const isDataChange = () => {
    if (dataChange) {
      setDataChange(false);
    } else {
      setDataChange(true);
    }
  };

  /**
   * Informations for MasterFile
   */
  const [reparationTab, setReparationTab] = useState([]);
  const [reparanumeroInput, setReparaNumeroInput] = useState(reparanumero);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparationTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Type
   */
  const [reparationtypeTab, setReparationTypeTab] = useState([]);
  const [reparatypeInput, setReparaTypeInput] = useState(reparatypeconteneur);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparationTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Proprietaire
   */
  const [reparaownerTab, setReparaOwnerTab] = useState([]);
  const [reparaownerInput, setReparaOwnerInput] = useState(reparaproprietaire);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/owner/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaOwnerTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Countrie
   */

  const [reparapaysTab, setReparaPaysTab] = useState([]);
  const [reparapaysInput, setReparaPaysInput] = useState(reparapaysname);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaPaysTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [reparatailleTab, setReparaTailleTab] = useState([]);
  const [reparatailleInput, setReparaTailleInput] = useState(reparatailleconteneur);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaTailleTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taux
   */
  const [reparatauxTab, setReparaTauxTab] = useState('');
  const [reparatauxInput, setReparaTauxInput] = useState(reparattaux);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/rate/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaTauxTab(value.data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setReparaTotal(reparatauxInput * reparaheureInput);
  }, [reparatauxInput, reparaheureInput]);

  const [reparataux, setReparaTaux] = useState(0);
  // const [reparaheure, setReparaHeure] = useState(0);

  /**
   * Informations for Materiel
   */
  const [reparamaterielTab, setReparaMaterielTab] = useState([]);
  const [reparamaterielInput, setReparaMaterielInput] = useState(reparamateriel);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/materiel/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaMaterielTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Site
   */
  const [reparasiteTab, setReparaSiteTab] = useState([]);
  const [reparasiteInput, setReparaSiteInput] = useState(reparasite);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setReparaSiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  // const [mouvclientTab, setMouvClientTab] = useState([]);
  // const [mouvclientInput, setMouvClientInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setMouvClientTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Table
   */

  useEffect(() => {
    // Get User Auth
    const tokenData = localStorage.getItem('lmc_token');

    if (tokenData) {
      const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);

      setUser(user);
    }
  }, []);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // React-Toastify-Notification
  const showSuccessToastSUP = () => {
    toast.warning('Opération a été supprimée avec succès', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000
    });
  };

  const showSuccessToastMOD = () => {
    toast.success('Opération a été modifiée avec succès', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000
    });
  };

  const deleteListHistoric = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/reparation/${idHistoric}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete reparation success !');
        sendInformation(value);
        showSuccessToastSUP();
      })
      .catch(() => {});
  };

  // Print Facture
  function printFacture() {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/reparation/${idHistoric}`,
        {
          numero: reparanumeroInput,
          datedernierereparation: reparadatereparaInput,
          typeconteneur: reparatypeInput,
          tailleconteneur: reparatailleInput,
          proprietaireid: reparaownerInput,
          paysname: reparapaysInput,
          taux: reparatauxInput,
          heure: reparaheureInput,
          materielid: reparamaterielInput,
          total: reparatotal,
          numerorecu: repararecuInput,
          societereparation: reparasocrepInput,
          societelocation: reparasoclocInput,
          site: reparasiteInput,
          datederniereinspection: reparadateinspInput,
          societe: reparasocieteInput,
          date: new Date()
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then(() => {})
      .catch(() => {});
    setIsOpen(false);
    handleClose();
    setReparaDateReparaInput('');
    setReparaHeureInput('');
    setReparaHeureInput('');
    setReparaTotal('');
    setReparaRecuInput('');
    setReparaSocRepInput('');
    setReparaSocLocInput('');
    setReparaDateInspInput('');
    setReparaSocieteInput('');
    showSuccessToastMOD();
    // reloadPage();
  }

  // const modifyListHistoric = () => {
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_BASE_URL}/masterfile/${idHistoric}`,
  //       {
  //         number: masternumber,
  //         nameNavire: navirenameInput,
  //         paysid: mastercountrieInput,
  //         typeconteneurid: mastertype,
  //         tailleconteneurid: mastersizeInput,
  //         materielid: mastermateriel,
  //         proprietaireid: masterownerInput,
  //         etatconteneurid: masteretatInput,
  //         constructeur: mastercontructeur,
  //         datefabrication: masterdatefab,
  //         dateentrerservice: masterdateentrer,
  //         datederniereinspection: masterdatederniere,
  //         valeurassuree: mastervaleur,
  //         deviseid: masterdeviseInput,
  //         societeinspection: mastersocieteinsp,
  //         dernierconstat: masterdernierconst,
  //         siteid: mastersiteInput,
  //         soussiteid: mastersoussiteInput,
  //         datemouvement: masterdatemouv,
  //         observation: masterobservation,
  //         client: masterclient,
  //         dateoperation: masterdateop,
  //         montant: mastermontant,
  //         numerorecu: masternumero
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //         }
  //       }
  //     )
  //     .then((value) => {
  //       sendInformation(value.data);
  //       setIsOpen(false);
  //       handleClose();
  //       showSuccessToastMOD();
  //     })
  //     .catch(() => {});
  // };

  return (
    <>
      <ToastContainer />
      {/* <CheckUserAuth /> */}
      {openModal ? (
        <Modal
          aria-labelledby="example-custom-modal-styling-title"
          dialogClassName="modal-90w"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <h2 align="center" id="example-custom-modal-styling-title">
              MODIFICATION FICHE MOUVEMENT CONTENEUR
            </h2>
            <Card className="card-wrapper">
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparationTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaNumeroInput(newType.number);
                      } else {
                        setReparaNumeroInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.number}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le numero" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date Réparation.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de reparation"
                    type="date"
                    variant="outlined"
                    value={reparadatereparaInput}
                    onChange={(e) => {
                      setReparaDateReparaInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Type:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparationtypeTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaTypeInput(newType.name);
                      } else {
                        setReparaTypeInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Type" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Propriétaire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparaownerTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaOwnerInput(newType.name);
                      } else {
                        setReparaOwnerInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sélectionner le Propriétaire"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Taux:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparatauxTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaTauxInput(newType.amount);
                      } else {
                        setReparaTauxInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.amount}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le taux" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Materiel:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparamaterielTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaMaterielInput(newType.name);
                      } else {
                        setReparaMaterielInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le matériel" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Société Rép.:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le nom de la societe"
                    variant="outlined"
                    value={reparasocrepInput}
                    onChange={(e) => {
                      setReparaSocRepInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Location:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez l'adresse de la Société"
                    variant="outlined"
                    value={reparasoclocInput}
                    onChange={(e) => {
                      setReparaSocLocInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date Insp.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la Date"
                    type="date"
                    variant="outlined"
                    value={reparadateinspInput}
                    onChange={(e) => {
                      setReparaDateInspInput(e.target.value);
                    }}
                  />
                </div>
              </Box>
              <Box className="box-2-wrapper">
                <div className="input-label-wrapper">
                  Taille:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparatailleTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaTailleInput(newType.name);
                      } else {
                        setReparaTailleInput(null);
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
                  Pays:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparapaysTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaPaysInput(newType.name);
                      } else {
                        setReparaPaysInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Pays" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-3-wrapper">
                  Nombre Heure:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le nomre d'heure"
                    variant="outlined"
                    value={reparaheureInput}
                    onChange={(e) => {
                      setReparaHeureInput(e.target.value);
                    }}
                  />
                </div>

                <div className="input-label-wrapper">
                  Total:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez la date de r"
                    variant="outlined"
                    value={reparatotal}
                    // onChange={(e) => {
                    //   setReparaTotalInput(e.target.value);
                    // }}
                  />
                </div>

                <div className="input-label-wrapper">
                  Réçu.:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le numero"
                    variant="outlined"
                    value={repararecuInput}
                    onChange={(e) => {
                      setReparaRecuInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Site:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={reparasiteTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setReparaSiteInput(newType.name);
                      } else {
                        setReparaSiteInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Site" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Société:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez la Société"
                    variant="outlined"
                    value={reparasocieteInput}
                    onChange={(e) => {
                      setReparaSocieteInput(e.target.value);
                    }}
                  />
                </div>
              </Box>
            </Card>
            {/* <Button
              onClick={() => modifyListHistoric()}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              Sauvegarder
            </Button> */}
            <Card className="card-botton-2-wrapper">
              <div>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" color="primary" disabled={disabledPrint()}>
                      Imprimer & Sauvegarder
                    </Button>
                  )}
                  content={() => componentRef.current}
                  suppressErrors
                  onAfterPrint={() => printFacture()}
                />
                <ComponentToPrint
                  ref={componentRef}
                  numero={reparanumeroInput}
                  datedernierereparation={reparadatereparaInput}
                  typeconteneur={reparatypeInput}
                  tailleconteneur={reparatailleInput}
                  proprietaireid={reparaownerInput}
                  paysname={reparapaysInput}
                  taux={reparatauxInput}
                  heure={reparaheureInput}
                  materielid={reparamaterielInput}
                  total={reparatotal}
                  numerorecu={repararecuInput}
                  societereparation={reparasocrepInput}
                  societelocation={reparasoclocInput}
                  site={reparasiteInput}
                  datederniereinspection={reparadateinspInput}
                  societe={reparasocieteInput}
                  rows={[]}
                />
              </div>
            </Card>
          </div>
        </Modal>
      ) : null}

      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={40} height={40} />
          </ListItemIcon>
          <ListItemText primary=" Modifier " primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteListHistoric()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary=" Effacer " primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
