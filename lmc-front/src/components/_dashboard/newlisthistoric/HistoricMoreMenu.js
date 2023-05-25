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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'auto',
    margin: 'auto',
    padding: '40em 2em 2em',
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
  numberMaster,
  namenavireMaster,
  paysisMaster,
  typeconteneuridMaster,
  tailleconteneuridMaster,
  materielidMaster,
  proprietaireidMaster,
  etatconteneurid,
  constructeurMaster,
  datefabricationMaster,
  dateentrerserviceMaster,
  datederniereinspectionMaster,
  valeurassureeMaster,
  deviseidMaster,
  societeinspectionMaster,
  dernierconstatMaster,
  siteidMaster,
  soussiteidMaster,
  datemouvementMaster,
  observationMaster,
  clientMaster,
  dateoperationMaster,
  montantMaster,
  numerorecuMaster,
  dateMaster,
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

  const [masternumber, setMasterNumber] = useState(numberMaster);
  // const [mastercountrieTab, setMasterCountrieTab] = useState([]);
  // const [mastertype, setMasterTypeInput] = useState('');
  // const [mastersizeInput, setMasterSizeInput] = useState('');
  // const [mastermateriel, setMasterMaterielInput] = useState('');
  // const [masterowner, setMasterOwner] = useState('');
  // const [masteretatInput, setMasterEtatInput] = useState('');
  const [mastercontructeur, setMasterConstructeur] = useState(constructeurMaster);
  const [masterdatefab, setMasterDateFab] = useState(datefabricationMaster);
  const [masterdateentrer, setMasterDateEntrer] = useState(dateentrerserviceMaster);
  const [masterdatederniere, setMasterDateDerniere] = useState(datederniereinspectionMaster);
  const [mastervaleur, setMasterValeur] = useState(valeurassureeMaster);
  // const [masterdeviseinput, setMasterDeviseInput] = useState('');
  const [mastersocieteinsp, setMasterSocieteInsp] = useState(societeinspectionMaster);
  const [masterdernierconst, setMasterDernierConst] = useState(dernierconstatMaster);
  // const [mastersiteInput, setMasterSiteInput] = useState('');
  // const [mastersoussiteInput, setMasterSoussiteInput] = useState('');
  const [masterdatemouv, setMasterDateMouv] = useState(datemouvementMaster);
  const [masterobservation, setMasterObservation] = useState(observationMaster);
  // const [masterclient, setMasterClientInput] = useState('');
  const [masterdateop, setMasterDateOp] = useState(dateoperationMaster);
  const [mastermontant, setMasterMontant] = useState(montantMaster);
  const [masternumero, setMasterNumero] = useState(numerorecuMaster);

  function disabledPrint() {
    if (navirenameInput !== '' && navirenameInput !== null) return false;
    return true;
  }

  /**
   * Informations for Countrie
   */
  const [mastercountrieTab, setMasterCountrieTab] = useState([]);
  const [mastercountrieInput, setMasterCountrieInput] = useState(paysisMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMasterCountrieTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Type
   */
  const [mastertypeTab, setMasterTypeTab] = useState([]);
  const [mastertype, setMasterTypeInput] = useState(typeconteneuridMaster);

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
  const [mastersizeInput, setMasterSizeInput] = useState(tailleconteneuridMaster);

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
  const [mastermaterielTab, setMasterMaterielTab] = useState([]);
  const [mastermateriel, setMasterMaterielInput] = useState(materielidMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/materiel/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMasterMaterielTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Materiel
   */
  const [masterownerTab, setMasterOwnerTab] = useState([]);
  const [masterownerInput, setMasterOwnerInput] = useState(proprietaireidMaster);

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
   * Informations for Port
   */
  const [portTab, setPortTab] = useState([]);
  const [portnameInput, setPortNameInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setPortTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [navireTab, setNavireTab] = useState([]);
  const [navirenameInput, setNavireNameInput] = useState(namenavireMaster);

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
   * Informations for Etat Conteneur
   */
  const [masteretatTab, setMasterEtatTab] = useState([]);
  const [masteretatInput, setMasterEtatInput] = useState(etatconteneurid);

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
   * Informations for Devise
   */
  const [deviseTab, setDeviseTab] = useState([]);
  const [masterdeviseInput, setMasterDeviseInput] = useState(deviseidMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/devise/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setDeviseTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Site
   */
  const [siteTab, setSiteTab] = useState([]);
  const [mastersiteInput, setMasterSiteInput] = useState(siteidMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Sous-Site
   */
  const [soussiteTab, setSoussiteTab] = useState([]);
  const [mastersoussiteInput, setMasterSoussiteInput] = useState(soussiteidMaster);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/soussite/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSoussiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [clientTab, setClientTab] = useState([]);
  const [masterclient, setMasterClientInput] = useState(clientMaster);

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
    toast.success('Opération a été modifiée avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const deleteListHistoric = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/masterfile/${idHistoric}`, {
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
        `${process.env.REACT_APP_BASE_URL}/masterfile/${idHistoric}`,
        {
          number: masternumber,
          namenavire: navirenameInput,
          paysid: mastercountrieInput,
          typeconteneurid: mastertype,
          tailleconteneurid: mastersizeInput,
          materielid: mastermateriel,
          proprietaireid: masterownerInput,
          etatconteneurid: masteretatInput,
          constructeur: mastercontructeur,
          datefabrication: masterdatefab,
          dateentrerservice: masterdateentrer,
          datederniereinspection: masterdatederniere,
          valeurassuree: mastervaleur,
          deviseid: masterdeviseInput,
          societeinspection: mastersocieteinsp,
          dernierconstat: masterdernierconst,
          siteid: mastersiteInput,
          soussiteid: mastersoussiteInput,
          datemouvement: masterdatemouv,
          observation: masterobservation,
          client: masterclient,
          dateoperation: masterdateop,
          montant: mastermontant,
          numerorecu: masternumero,
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
    setMasterNumber('');
    setMasterConstructeur('');
    setMasterDateFab('');
    setMasterDateEntrer('');
    setMasterDateDerniere('');
    setMasterValeur('');
    setMasterSocieteInsp('');
    setMasterDernierConst('');
    setMasterDateMouv('');
    setMasterObservation('');
    setMasterDateOp('');
    setMasterMontant('');
    setMasterNumero('');
    setMasterCountrieInput('');
    setMasterTypeInput('');
    setMasterSizeInput('');
    setMasterSizeInput('');
    setMasterMaterielInput('');
    setMasterOwnerInput('');
    setNavireNameInput('');
    setMasterEtatInput('');
    setMasterDeviseInput('');
    setMasterSiteInput('');
    setMasterSoussiteInput('');
    setMasterClientInput('');
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
                    value={masternumber}
                    onChange={(e) => {
                      setMasterNumber(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Pays :{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mastercountrieTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterCountrieInput(newType.name);
                      } else {
                        setMasterCountrieInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Pays" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Type :{' '}
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
                  Client:{' '}
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
                  Date Fab.:{' '}
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
                  Date Inspection:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de la derniere inspectin"
                    type="date"
                    variant="outlined"
                    value={masterdatederniere}
                    onChange={(e) => {
                      setMasterDateDerniere(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  V.A.:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez la valeur assuree"
                    variant="outlined"
                    value={mastervaleur}
                    onChange={(e) => {
                      setMasterValeur(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Societe:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez la societe d'inspection"
                    variant="outlined"
                    value={mastersocieteinsp}
                    onChange={(e) => {
                      setMasterSocieteInsp(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Site:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={siteTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterSiteInput(newType.name);
                      } else {
                        setMasterSiteInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner un Site" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date Mouv.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    type="date"
                    variant="outlined"
                    value={masterdatemouv}
                    onChange={(e) => {
                      setMasterDateMouv(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Client:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={clientTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterClientInput(newType.name);
                      } else {
                        setMasterClientInput(null);
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
                  Montant:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le montant"
                    variant="outlined"
                    value={mastermontant}
                    onChange={(e) => {
                      setMasterMontant(e.target.value);
                    }}
                  />
                </div>
              </Box>
              <Box className="box-2-wrapper">
                <div className="input-label-wrapper">
                  Navire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={navireTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setNavireNameInput(newType.name);
                      } else {
                        setNavireNameInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le navire" variant="outlined" />
                    )}
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
                  Materiel:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mastermaterielTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterMaterielInput(newType.name);
                      } else {
                        setMasterMaterielInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Materiel" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Constructeur:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le nom du Constructeur"
                    variant="outlined"
                    value={mastercontructeur}
                    onChange={(e) => {
                      setMasterConstructeur(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date Entree:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date d'entree en Service"
                    type="date"
                    variant="outlined"
                    value={masterdateentrer}
                    onChange={(e) => {
                      setMasterDateEntrer(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-3-wrapper">
                  N° Fiche :{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le numéro de fiche"
                    variant="outlined"
                    value={fileNumb}
                    onChange={(e) => {
                      setFileNumb(e.target.value);
                    }}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Devise:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={deviseTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterDeviseInput(newType.name);
                      } else {
                        setMasterDeviseInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner la Devise" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Constat:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le dernier constat"
                    variant="outlined"
                    value={masterdernierconst}
                    onChange={(e) => {
                      setMasterDernierConst(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Sous-site:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={soussiteTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMasterSoussiteInput(newType.name);
                      } else {
                        setMasterSoussiteInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Sous-site" variant="outlined" />
                    )}
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
                <div className="input-label-wrapper">
                  Date Op.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de l'operation"
                    type="date"
                    variant="outlined"
                    value={masterdateop}
                    onChange={(e) => {
                      setMasterDateOp(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Numero :{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le numero recu"
                    variant="outlined"
                    value={masternumero}
                    onChange={(e) => {
                      setMasterNumero(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-3-wrapper">
                  Envoi :{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez ce champ"
                    variant="outlined"
                    value={send}
                    onChange={(e) => setSend(e.target.value)}
                  />
                </div> */}
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
                  number={masternumber}
                  typeconteneurid={mastertype}
                  tailleconteneurid={mastersizeInput}
                  client={masterclient}
                  datefabrication={masterdatefab}
                  constructeur={mastercontructeur}
                  dateentrerservice={masterdateentrer}
                  datederniereinspection={masterdatederniere}
                  dernierconstat={masterdernierconst}
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
