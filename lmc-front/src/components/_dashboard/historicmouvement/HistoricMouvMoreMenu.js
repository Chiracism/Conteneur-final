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
    padding: '20em 2em 2em',
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
  numberMouvement,
  tailleMouvement,
  typeMouvement,
  voyageMouvement,
  blMouvement,
  navireMouvement,
  etaMouvement,
  contenuMouvement,
  poidsMouvement,
  clientMouvement,
  numeromemmoMouvement,
  agenceMouvement,
  cautionMouvement,
  destinationMouvement,
  datesMouvement,
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

  // for Mouvement

  const [mouvvoyageInput, setMouvVoyageInput] = useState(voyageMouvement);
  const [mouvblInput, setMouvBlInput] = useState(blMouvement);
  const [mouvetaInput, setMouvEtaInput] = useState(etaMouvement);
  const [mouvcontenuInput, setMouvContenuInput] = useState(contenuMouvement);
  const [mouvpoidsInput, setMouvPoidsInput] = useState(poidsMouvement);
  const [mouvnumeromemoInput, setMouvNumeroMemoInput] = useState(numeromemmoMouvement);
  const [mouvcautionInput, setMouvCautionInput] = useState(cautionMouvement);
  const [mouvdestinationInput, setMouvDestinationInput] = useState(destinationMouvement);
  const [mouvdatesInput, setMouvDatesInput] = useState(datesMouvement);

  const [dataChange, setDataChange] = useState(false);

  function disabledPrint() {
    if (mouvnumberInput !== '' && mouvnumberInput !== null) return false;
    return true;
  }

  /**
   * Informations for NewMasterFile N° Conteneur
   */
  const [mouvementTab, setMouvementTab] = useState([]);
  const [mouvnumberInput, setMouvNumberInput] = useState(numberMouvement);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/newmasterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvementTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   *Informations for Type
   */
  const [mouvtypeTab, setMouvTypeTab] = useState([]);
  const [mouvtypeInput, setMouvTypeInput] = useState(typeMouvement);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Port
   */
  // const [mouvportTab, setMouvPortTab] = useState([]);
  // const [mouvportInput, setMouvPortInput] = useState(portMouvement);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setMouvPortTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Taille
   */
  const [moutailleTab, setMouvTailleTab] = useState([]);
  const [mouvtailleInput, setMouvTailleInput] = useState(tailleMouvement);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvTailleTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [mouvnavireTab, setMouvNavireTab] = useState([]);
  const [mouvnavireInput, setMouvNavireInput] = useState(navireMouvement);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Etat Conteneur
   */
  // const [mouvetatTab, setMouvEtatTab] = useState([]);
  // const [mouvetatInput, setMouvEtatInput] = useState(etatconteneurMouvement);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/etat_conteneur/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setMouvEtatTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Site
   */
  // const [mouvsiteTab, setMouvSiteTab] = useState([]);
  // const [mouvsiteInput, setMouvSiteInput] = useState(siteMouvement);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setMouvSiteTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Agence
   */
  const [mouvagenceTab, setMouvAgenceTab] = useState([]);
  const [mouvagenceInput, setMouvAgenceInput] = useState(agenceMouvement);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/agence/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvAgenceTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [mouvclientTab, setMouvClientTab] = useState([]);
  const [mouvclientInput, setMouvClientInput] = useState(clientMouvement);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvClientTab(value.data);
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
    toast.warning('Opération a été supprimé avec succès', {
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
      .delete(`${process.env.REACT_APP_BASE_URL}/newmouvement/${idHistoric}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete Mouvement success !');
        sendInformation(value);
        setIsOpen(false);
        handleClose();
        showSuccessToastSUP();
      })
      .catch(() => {});
  };

  // Print Facture
  function printFacture() {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/newmouvement/${idHistoric}`,
        {
          numero: mouvnumberInput,
          taille: mouvtailleInput,
          type: mouvtypeInput,
          voyage: mouvvoyageInput,
          bl: mouvblInput,
          navire: mouvnavireInput,
          eta: mouvetaInput,
          contenu: mouvcontenuInput,
          poids: mouvpoidsInput,
          client: mouvclientInput,
          numeromemo: mouvnumeromemoInput,
          agence: mouvagenceInput,
          caution: mouvcautionInput,
          destination: mouvdestinationInput,
          dates: mouvdatesInput,
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
    setMouvNumberInput('');
    setMouvTailleInput('');
    setMouvTypeInput('');
    setMouvVoyageInput('');
    setMouvBlInput('');
    setMouvNavireInput('');
    setMouvEtaInput('');
    setMouvContenuInput('');
    setMouvPoidsInput('');
    setMouvClientInput('');
    setMouvNumeroMemoInput('');
    setMouvAgenceInput('');
    setMouvCautionInput('');
    setMouvDestinationInput('');
    setMouvDatesInput('');
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
              MODIFICATION FICHE MOUVEMENT CONTENEUR
            </h2>
            <Card className="card-wrapper">
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvementTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvNumberInput(newType.numero);
                        setMouvTailleInput(newType.taille);
                        setMouvTypeInput(newType.type);
                      } else {
                        setMouvNumberInput(null);
                        setMouvTailleInput(null);
                        setMouvTypeInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.numero}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le numero" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  N° Voyage:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvvoyageInput}
                    onChange={(e) => {
                      setMouvVoyageInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  N° B/L:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvblInput}
                    onChange={(e) => {
                      setMouvBlInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Navire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvnavireTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvNavireInput(newType.name);
                      } else {
                        setMouvNavireInput(null);
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
                  Poids:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    type="date"
                    variant="outlined"
                    value={mouvpoidsInput}
                    onChange={(e) => {
                      setMouvPoidsInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Client:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvclientTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvClientInput(newType.name);
                      } else {
                        setMouvClientInput(null);
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
                  Agence:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvagenceTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvAgenceInput(newType.name);
                      } else {
                        setMouvAgenceInput(null);
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
                  Destination:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvdestinationInput}
                    onChange={(e) => {
                      setMouvDestinationInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Type:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvtypeTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvTypeInput(newType.name);
                      } else {
                        setMouvTypeInput(null);
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
                  Etat:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvetatTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvEtatInput(newType.name);
                      } else {
                        setMouvEtatInput(null);
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
                  Date Mouv.:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    type="date"
                    variant="outlined"
                    value={mouvdatemouvInput}
                    onChange={(e) => {
                      setMouvDateMouvInput(e.target.value);
                    }}
                  />
                </div> */}
              </Box>
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  Taille:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvtailleInput}
                    onChange={(e) => {
                      setMouvTailleInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Type:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvtypeInput}
                    onChange={(e) => {
                      setMouvTypeInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  ETA:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    type="date"
                    variant="outlined"
                    value={mouvetaInput}
                    onChange={(e) => {
                      setMouvEtaInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Contenu:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvcontenuInput}
                    onChange={(e) => {
                      setMouvContenuInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  N° Memo:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvnumeromemoInput}
                    onChange={(e) => {
                      setMouvNumeroMemoInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Caution:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvcautionInput}
                    onChange={(e) => {
                      setMouvCautionInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de mouvement"
                    variant="outlined"
                    value={mouvdatesInput}
                    onChange={(e) => {
                      setMouvDatesInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Sous-site:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvsoussiteTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvSoussiteInput(newType.name);
                      } else {
                        setMouvSoussiteInput(null);
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
                  Navire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvnavireTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvNavireInput(newType.name);
                      } else {
                        setMouvNavireInput(null);
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
                  Port:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvportTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvPortInput(newType.name);
                      } else {
                        setMouvPortInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le port" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-3-wrapper">
                  Nombre:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le nombre"
                    variant="outlined"
                    value={mouvnombreInput}
                    onChange={(e) => {
                      setMouvNombreInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Observation.:{' '}
                  <TextField
                    className="basic-input"
                    label="Commentaires..."
                    variant="outlined"
                    value={mouvobservationInput}
                    onChange={(e) => {
                      setMouvObservationInput(e.target.value);
                    }}
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
                  client={mouvclientInput}
                  number={mouvnumberInput}
                  taille={mouvtailleInput}
                  type={mouvtypeInput}
                  voyage={mouvvoyageInput}
                  bl={mouvblInput}
                  navire={mouvnavireInput}
                  eta={mouvetaInput}
                  contenu={mouvcontenuInput}
                  poids={mouvpoidsInput}
                  numeromemo={mouvnumeromemoInput}
                  agence={mouvagenceInput}
                  caution={mouvcautionInput}
                  destination={mouvdestinationInput}
                  dates={mouvdatesInput}
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
