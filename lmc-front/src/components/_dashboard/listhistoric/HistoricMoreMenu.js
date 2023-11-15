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
import bookOpenOutline from '@iconify/icons-eva/book-open-outline';

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
import ComponentToPrintMasterfile from './ComponentToPrintMasterfile';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'auto',
    margin: 'auto',
    padding: '10em 2em 2em',
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
  numeroMaster,
  tailleMaster,
  typeMaster,
  datefabricationMaster,
  dateexpirationMaster,
  dateinspectionMaster,
  etatconteneurMaster,
  observationMaster,
  proprietaireMaster,
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

  const [masternumero, setMasterNumero] = useState(numeroMaster);
  const [masterdatefab, setMasterDateFab] = useState(datefabricationMaster);
  const [masterdateexp, setMasterDateExp] = useState(dateexpirationMaster);
  const [masterdateinsp, setMasterDateInsp] = useState(dateinspectionMaster);
  const [masterobservation, setMasterObservation] = useState(observationMaster);

  const [dataPrint, setDataPrint] = useState({});

  const componentToPrintRef = useRef();

  const printFactureMasterfile = () => {};

  useEffect(() => {
    // Fetch datas for the current historic
    axios(`${process.env.REACT_APP_BASE_URL}/newmasterfile/${idHistoric}`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        console.log('Datas stored : ', value.data);
        setDataPrint(value.data);
      })
      .catch(() => {});
  }, []);

  function disabledPrint() {
    if (masternumero !== '' && masternumero !== null) return false;
    return true;
  }

  /**
   * Informations for Type
   */
  const [mastertypeTab, setMasterTypeTab] = useState([]);
  const [mastertype, setMasterTypeInput] = useState(typeMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMasterTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [mastersizeTab, setMasterSizeTab] = useState([]);
  const [mastersizeInput, setMasterSizeInput] = useState(tailleMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMasterSizeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Materiel
   */
  const [masterownerTab, setMasterOwnerTab] = useState([]);
  const [masterownerInput, setMasterOwnerInput] = useState(proprietaireMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/owner/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMasterOwnerTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Etat Conteneur
   */
  const [masteretatTab, setMasterEtatTab] = useState([]);
  const [masteretatInput, setMasterEtatInput] = useState(etatconteneurMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/etat_conteneur/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMasterEtatTab(value.data);
      })
      .catch(() => {});
  }, []);

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
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const showSuccessToastMOD = () => {
    toast.success('Opération a été modifié avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const deleteListHistoric = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/newmasterfile/${idHistoric}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete Countrie success !');
        sendInformation(value);
        showSuccessToastSUP();
      })
      .catch(() => {});
  };

  // Print Facture
  function printFacture() {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/newmasterfile/${idHistoric}`,
        {
          numero: masternumero,
          taille: mastersizeInput,
          type: mastertype,
          datefabrication: masterdatefab,
          dateexpiration: masterdateexp,
          dateinspection: masterdateinsp,
          etatconteneur: masteretatInput,
          proprietaire: masterownerInput,
          observation: masterobservation,
          name: user.name,
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
    setMasterNumero('');
    setMasterSizeInput('');
    setMasterTypeInput('');
    setMasterDateFab('');
    setMasterDateExp('');
    setMasterDateInsp('');
    setMasterEtatInput('');
    setMasterOwnerInput('');
    setMasterObservation('');
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
              Modification de MasterFile
            </h2>
            <Card className="card-wrapper">
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le numéro de Conteneur"
                    variant="outlined"
                    value={masternumero}
                    onChange={(e) => {
                      setMasterNumero(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Taille:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mastersizeTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterSizeInput(newType.name);
                      } else {
                        setMasterSizeInput(null);
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
                  Type:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mastertypeTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterTypeInput(newType.name);
                      } else {
                        setMasterTypeInput(null);
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
                  Etat:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={masteretatTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterEtatInput(newType.name);
                      } else {
                        setMasterEtatInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sélectionner l'Etat de Conteneur"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Propriétaire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={masterownerTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterOwnerInput(newType.name);
                      } else {
                        setMasterOwnerInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner un Client" variant="outlined" />
                    )}
                  />
                </div>
              </Box>
              <Box className="box-2-wrapper">
                <div className="input-label-wrapper">
                  Date Fabrication:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    type="date"
                    variant="outlined"
                    value={masterdatefab}
                    onChange={(e) => {
                      setMasterDateFab(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date Dernière Insp.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    type="date"
                    variant="outlined"
                    value={masterdateexp}
                    onChange={(e) => {
                      setMasterDateExp(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date Prochaine Insp.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    type="date"
                    variant="outlined"
                    value={masterdateinsp}
                    onChange={(e) => {
                      setMasterDateInsp(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Observation.:{' '}
                  <TextField
                    className="basic-input"
                    label="Commentaires"
                    variant="outlined"
                    value={masterobservation}
                    onChange={(e) => {
                      setMasterObservation(e.target.value);
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
                  number={masternumero}
                  typeconteneurid={mastertype}
                  tailleconteneurid={mastersizeInput}
                  // client={masterclient}
                  datefabrication={masterdatefab}
                  constructeur={masterownerInput}
                  dateentrerservice={masterdateexp}
                  datederniereinspection={masterdateinsp}
                  etatconteneur={masteretatInput}
                  // dernierconstat={masterdernierconst}
                  // dernierconstat={masterdateexp}
                  observation={masterobservation}
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
        <MenuItem sx={{ color: 'green' }}>
          <ListItemIcon>
            <ReactToPrint
              // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
              // to the root node of the returned component as it will be overwritten.
              trigger={() => <Icon icon={bookOpenOutline} width={30} height={30} />}
              content={() => componentToPrintRef.current}
              suppressErrors
              onAfterPrint={() => printFactureMasterfile()}
            />
          </ListItemIcon>
          <ReactToPrint
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            trigger={() => (
              <ListItemText primary=" Fiche " primaryTypographyProps={{ variant: 'body2' }} />
            )}
            content={() => componentToPrintRef.current}
            suppressErrors
            onAfterPrint={() => printFactureMasterfile()}
          />
          <ComponentToPrintMasterfile
            ref={componentToPrintRef}
            constructeur={dataPrint.proprietaire}
            number={dataPrint.numero}
            tailleconteneurid={dataPrint.taille}
            etatconteneur={dataPrint.etatconteneur}
            typeconteneurid={dataPrint.type}
            datefabrication={dataPrint.datefabrication}
            dateentrerservice={dataPrint.dateexpiration}
            datederniereinspection={dataPrint.dateinspection}
            observation={dataPrint.observation}
          />
        </MenuItem>
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
