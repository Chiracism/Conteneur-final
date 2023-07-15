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
import ComponentToPrintSurestarie from './ComponentToPrintSurestarie';

// import { CheckUserAuth } from '../../utils/auth';

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
  surestariedatemod,
  numeromod,
  exnaviremod,
  datearrivee,
  clientmod,
  portmod,
  sizemod,
  typemod,
  nombreconteneur,
  restitutiondate,
  cautionverseemod,
  nlsmod,
  lsdatemod,
  choixtypemod,
  detentionmod,
  surestariedureemod,
  surestariesdureemod,
  fraismod,
  facturermod,
  remboursermod,
  totalmod,
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

  // for Surestarie
  const [surestariedateInput, setSurestarieDateInput] = useState(surestariedatemod);
  const [surestarienumeroInput, setSurestarieNumeroInput] = useState(numeromod);
  const [mouvtypeInput, setMouvTypeInput] = useState(typemod);
  // const [surestarienavireInput, setSurestarieNavireInput] = useState('');
  const [surestariedatearriveeInput, setSurestarieDateArriveeInput] = useState(datearrivee);
  // const [surestarieclientInput, setSurestarieClientInput] = useState('');
  // const [surestarieportInput, setSurestariePortInput] = useState('');
  // const [surestariesizeInput, setSurestarieSizeInput] = useState('');
  const [surestarienombreInput, setSurestarieNombreInput] = useState(nombreconteneur);
  const [surestariedaterestitutionInput, setSurestarieDateRestitutionInput] =
    useState(restitutiondate);
  const [surestariecautionverseeInput, setSurestarieCautionVerseeInput] =
    useState(cautionverseemod);
  const [surestarienlsInput, setSurestarieNlsInput] = useState(nlsmod);
  const [surestariedatelsInput, setSurestarieDateLsInput] = useState(lsdatemod);
  // const [surestariechoixtypeInput, setSurestarieChoixTypeInput] = useState('');
  const [surestariedetentionInput, setSurestarieDetentionInput] = useState(detentionmod);
  const [surestariedureeInput, setSurestarieDureeInput] = useState(surestariedureemod);
  const [surestariesdureesInput, setSurestariesDureesInput] = useState(surestariesdureemod);
  const [surestariefraisInput, setSurestarieFraisInput] = useState(fraismod);
  const [surestariefacturerInput, setSurestarieFacturerInput] = useState(facturermod);
  const [surestarierembourserInput, setSurestarieRembourserInput] = useState(remboursermod);
  const [surestarietotalInput, setSurestarieTotalInput] = useState(totalmod);
  const [dataPrint, setDataPrint] = useState({});

  const componentToPrintRef = useRef();

  const printFactureSurestarie = () => {};

  useEffect(() => {
    // Fetch datas for the current surestarie
    axios(`${process.env.REACT_APP_BASE_URL}/newsurestarie/${idHistoric}`, {
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

  const [dataChange, setDataChange] = useState(false);

  const reloadPage = () => {
    window.location.reload();
  };

  function disabledPrint() {
    if (surestarienumeroInput !== '' && surestarienumeroInput !== null) return false;
    return true;
  }

  /**
   * Informations for MasterFile
   */
  // const [surestarienumeroTab, setSurestarieNumeroTab] = useState([]);
  // const [surestarienumeroInput, setSurestarieNumeroInput] = useState(numeromod);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/masterfile/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setSurestarieNumeroTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Type
   */
  const [mouvtypeTab, setMouvTypeTab] = useState([]);
  // const [mouvtypeInput, setMouvTypeInput] = useState(null);

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
   * Informations for Choix
   */
  const [sureschoixTab, setSuresChoixTab] = useState([]);
  const [sureschoixInput, setSuresChoixInput] = useState(choixtypemod);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/choix/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSuresChoixTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Port
   */
  const [surestarieportTab, setSurestariePortTab] = useState([]);
  const [surestarieportInput, setSurestariePortInput] = useState(portmod);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestariePortTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [surestariesizeTab, setSurestarieSizeTab] = useState([]);
  const [surestariesizeInput, setSurestarieSizeInput] = useState(sizemod);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieSizeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [surestarienavireTab, setSurestarieNavireTab] = useState([]);
  const [surestarienavireInput, setSurestarieNavireInput] = useState(exnaviremod);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [surestarieclientTab, setSurestarieClientTab] = useState([]);
  const [surestarieclientInput, setSurestarieClientInput] = useState(clientmod);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setSurestarieClientTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Site
   */
  const [mouvsiteTab, setMouvSiteTab] = useState([]);
  const [mouvsiteInput, setMouvSiteInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvSiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Sous-Site
   */
  const [mouvsoussiteTab, setMouvSoussiteTab] = useState([]);
  const [mouvsoussiteInput, setMouvSoussiteInput] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/soussite/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setMouvSoussiteTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Client
   */
  const [mouvclientTab, setMouvClientTab] = useState([]);
  const [mouvclientInput, setMouvClientInput] = useState(clientmod);

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

  const [reparatauxTab, setReparaTauxTab] = useState('');
  const [reparatauxInput, setReparaTauxInput] = useState('');
  const [suresdureeInput, setSuresDureeInput] = useState('');

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

  // Get the number of day between of two dates

  useEffect(() => {
    setSurestarieDetentionInput(
      (new Date(surestariedaterestitutionInput).getTime() -
        new Date(surestariedatearriveeInput).getTime()) /
        86400000 +
        1
    );
  }, [surestariedaterestitutionInput, surestariedatearriveeInput]);

  function validateCalcul() {
    if (surestariesizeInput === 20) {
      if (surestariedetentionInput < 33) {
        setSurestarieDureeInput(0);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(0);
        setSurestarieFraisInput(0);
        setSurestarieRembourserInput(surestariecautionverseeInput);
        setSurestarieTotalInput(0);
      } else if (surestariedetentionInput < 47) {
        setSurestarieDureeInput(surestariedetentionInput - 32);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput((surestariedetentionInput - 32) * 10);
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(0);
        }
        setSurestarieTotalInput(surestariefraisInput);
      } else {
        setSurestarieDureeInput(14);
        setSurestariesDureesInput(surestariedetentionInput - 32 - 14);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput(
          surestariedureeInput * 10 + (surestariedetentionInput - 32 - 14) * 20
        );
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(0);
        }
        setSurestarieTotalInput(surestariefraisInput);
      }
    } else if (surestariesizeInput === 40) {
      if (surestariedetentionInput < 33) {
        setSurestarieDureeInput(0);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(0);
        setSurestarieFraisInput(0);
        setSurestarieRembourserInput(surestariecautionverseeInput);
        setSurestarieTotalInput(0);
      } else if (surestariedetentionInput < 47) {
        setSurestarieDureeInput(surestariedetentionInput - 32);
        setSurestariesDureesInput(0);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput(surestariedureeInput * 20 + surestariesdureesInput * 20);
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(0);
        }
        setSurestarieTotalInput(surestariefraisInput);
      } else {
        setSurestarieDureeInput(14);
        setSurestariesDureesInput(surestariedetentionInput - 32 - 14);
        setSurestarieFacturerInput(surestariefraisInput);
        setSurestarieFraisInput(
          surestariedureeInput * 20 + (surestariedetentionInput - 32 - 14) * 40
        );
        if (surestariecautionverseeInput > surestariefraisInput) {
          setSurestarieRembourserInput(surestariecautionverseeInput - surestariefraisInput);
        } else {
          setSurestarieRembourserInput(0);
        }
        setSurestarieTotalInput(surestariefraisInput);
      }
    }
  }

  // React-Toastify-Notification
  const showSuccessToastMod = () => {
    toast.success('Opération a été enregistrée avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  // Print Facture
  function printFacture() {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/newsurestarie/${idHistoric}`,
        {
          // surestariedate: surestariedateInput,
          numero: surestarienumeroInput,
          size: surestariesizeInput,
          type: mouvtypeInput,
          navire: surestarienavireInput,
          port: surestarieportInput,
          typeofchoix: sureschoixInput,
          datearrivee: surestariedatearriveeInput,
          client: surestarieclientInput,
          caution: surestariecautionverseeInput,
          daterestitution: surestariedaterestitutionInput,
          detention: surestariedetentionInput,
          duree: surestariedureeInput,
          durees: surestariesdureesInput,
          rembourser: surestarierembourserInput,
          montantafacture: surestariefacturerInput,
          total: surestarietotalInput,
          name: user.name,
          // port: surestarieportInput,
          // size: surestariesizeInput,
          // nombreconteneur: surestarienombreInput,
          // restitutiondate: surestariedaterestitutionInput,
          // cautionversee: surestariecautionverseeInput,
          // nls: surestarienlsInput,
          // lsdate: surestariedatelsInput,
          // choixtype: sureschoixInput,
          // detention: surestariedetentionInput,
          // surestarieduree: surestariedureeInput,
          // surestariesduree: surestariesdureesInput,
          // frais: surestariefraisInput,
          // facturer: surestariefacturerInput,
          // rembourser: surestarierembourserInput,
          // total: surestarietotalInput,
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
    showSuccessToastMOD();
    setSurestarieDateInput('');
    setSurestarieDateArriveeInput('');
    setSurestarieNombreInput('');
    setSurestarieDateRestitutionInput('');
    setSurestarieCautionVerseeInput('');
    setSurestarieNlsInput('');
    setSurestarieDateLsInput('');
    setSurestarieDetentionInput('');
    setSurestarieDureeInput('');
    setSurestariesDureesInput('');
    setSurestarieFraisInput('');
    setSurestarieFacturerInput('');
    setSurestarieRembourserInput('');
    setSurestarieTotalInput('');
  }

  const isDataChange = () => {
    if (dataChange) {
      setDataChange(false);
    } else {
      setDataChange(true);
    }
  };

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
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000
    });
  };

  const showSuccessToastMOD = () => {
    toast.success('Opération a été modifié avec succès', {
      position: toast.POSITION.TOP_LEFT,
      autoClose: 1000
    });
  };

  const deleteListHistoric = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/newsurestarie/${idHistoric}`, {
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
              MODIFICATION FICHE SURRESTARIE
            </h2>
            <Card className="card-wrapper">
              <Box className="box-wrapper">
                {/* <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvementTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvNumberInput(newType.number);
                      } else {
                        setMouvNumberInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.number}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le numero" variant="outlined" />
                    )}
                  />
                </div> */}
                {/* <div className="input-label-wrapper">
                  Site:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={mouvsiteTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setMouvSiteInput(newType.name);
                      } else {
                        setMouvSiteInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner un Site" variant="outlined" />
                    )}
                  />
                </div> */}
                {/* <div className="input-label-wrapper">
                  Date Surestarie:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de la Surestarie"
                    type="date"
                    variant="outlined"
                    value={surestariedateInput}
                    onChange={(e) => {
                      setSurestarieDateInput(e.target.value);
                    }}
                  />
                </div> */}
                {/* <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={surestarienumeroTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setSurestarieNumeroInput(newType.number);
                      } else {
                        setSurestarieNumeroInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.number}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le numero" variant="outlined" />
                    )}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <TextField
                    className="basic-input"
                    variant="outlined"
                    value={surestarienumeroInput}
                    onChange={(e) => {
                      setSurestarieNumeroInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Type :{' '}
                  <TextField
                    className="basic-input"
                    variant="outlined"
                    value={mouvtypeInput}
                    onChange={(e) => {
                      setMouvTypeInput(e.target.value);
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
                </div> */}
                <div className="input-label-wrapper">
                  Navire :{' '}
                  <TextField
                    className="basic-input"
                    variant="outlined"
                    value={surestarienavireInput}
                    onChange={(e) => {
                      setSurestarieNavireInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Navire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={surestarienavireTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setSurestarieNavireInput(newType.name);
                      } else {
                        setSurestarieNavireInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le navire" variant="outlined" />
                    )}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Client :{' '}
                  <TextField
                    className="basic-input"
                    variant="outlined"
                    value={surestarieclientInput}
                    onChange={(e) => {
                      setSurestarieClientInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Client:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={surestarieclientTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setSurestarieClientInput(newType.name);
                      } else {
                        setSurestarieClientInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner un Client" variant="outlined" />
                    )}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Date Restitution:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Restitution"
                    type="date"
                    variant="outlined"
                    value={surestariedaterestitutionInput}
                    onChange={(e) => {
                      setSurestarieDateRestitutionInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  NLS:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le NLS"
                    variant="outlined"
                    value={surestarienlsInput}
                    onChange={(e) => {
                      setSurestarieNlsInput(e.target.value);
                    }}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Type de Choix:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={sureschoixTab}
                    // value={choix(Exportation)}
                    onChange={(event, newType) => {
                      if (newType) {
                        setSuresChoixInput(newType.name);
                      } else {
                        setSuresChoixInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sélectionner le type de Choix"
                        variant="outlined"
                      />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Detention:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le nombre de jour"
                    variant="outlined"
                    value={surestariedetentionInput}
                    onChange={(e) => {
                      setSurestarieDetentionInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Durée:{' '}
                  <TextField
                    className="basic-input"
                    label="Supérieur à 14 jours"
                    variant="outlined"
                    value={surestariesdureesInput}
                    onChange={(e) => {
                      setSurestariesDureesInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Frais:{' '}
                  <TextField
                    className="basic-input"
                    // label="Frais à payer"
                    variant="outlined"
                    value={surestariefraisInput}
                    onChange={(e) => {
                      setSurestarieFraisInput(e.target.value);
                    }}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Rembourser:{' '}
                  <TextField
                    className="basic-input"
                    // label="A rembourser "
                    variant="outlined"
                    value={surestarierembourserInput}
                    onChange={(e) => {
                      setSurestarieRembourserInput(e.target.value);
                    }}
                  />
                </div>
              </Box>
              <Box className="box-2-wrapper">
                {/* <div className="input-label-wrapper">
                  Taille:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={surestariesizeTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setSurestarieSizeInput(newType.name);
                      } else {
                        setSurestarieSizeInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner la Taille" variant="outlined" />
                    )}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Taille :{' '}
                  <TextField
                    className="basic-input"
                    variant="outlined"
                    value={surestariesizeInput}
                    onChange={(e) => {
                      setSurestarieSizeInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Port :{' '}
                  <TextField
                    className="basic-input"
                    variant="outlined"
                    value={surestarieportInput}
                    onChange={(e) => {
                      setSurestariePortInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Port:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={surestarieportTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setSurestariePortInput(newType.name);
                      } else {
                        setSurestariePortInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le Port" variant="outlined" />
                    )}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Date Arrivée:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date d'arrviée"
                    type="date"
                    variant="outlined"
                    value={surestariedatearriveeInput}
                    onChange={(e) => {
                      setSurestarieDateArriveeInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Nombre:{' '}
                  <TextField
                    className="basic-input"
                    label="Saisissez le nombre"
                    variant="outlined"
                    value={surestarienombreInput}
                    onChange={(e) => {
                      setSurestarieNombreInput(e.target.value);
                    }}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Caution Versée:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez le montant"
                    variant="outlined"
                    value={surestariecautionverseeInput}
                    onChange={(e) => {
                      setSurestarieCautionVerseeInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Ls Date:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez le ls date"
                    type="date"
                    variant="outlined"
                    value={surestariedatelsInput}
                    onChange={(e) => {
                      setSurestarieDateLsInput(e.target.value);
                    }}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Durée:{' '}
                  <TextField
                    className="basic-input"
                    label="Inférieur à 14jours"
                    variant="outlined"
                    value={surestariedureeInput}
                    onChange={(e) => {
                      setSurestarieDureeInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Facturer:{' '}
                  <TextField
                    className="basic-input"
                    // label="A Facturer"
                    variant="outlined"
                    value={surestariefacturerInput}
                    onChange={(e) => {
                      setSurestarieFacturerInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Total:{' '}
                  <TextField
                    className="basic-input"
                    // label="Total "
                    variant="outlined"
                    value={surestarietotalInput}
                    onChange={(e) => {
                      setSurestarieTotalInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Date:{' '}
                  <TextField
                    className="basic-input"
                    label="Total "
                    type="date"
                    variant="outlined"
                    value={DatepickerR}
                    onChange={(e) => {
                      setDatepickerInput(e.target.value);
                    }}
                  />
                </div> */}
                {/* <CFormGroup row>
                      <CCol md="3">
                        <CLabel htmlFor="date-input">Date Input</CLabel>
                      </CCol>
                      <CCol xs="12" md="9">
                        <CInput type="date" id="date-input" name="date-input" placeholder="date" />
                      </CCol>
                </CFormGroup> */}
                {/* <div className="input-label-wrapper">
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
            <Card className="card-botton-2-wrapper">
              <div>
                <Button variant="contained" color="primary" onClick={() => validateCalcul()}>
                  CALCUL SURESTARIE
                </Button>
              </div>
            </Card>
            <br />
            {/* <Card className="card-wrapper">
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
            </Card> */}
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
                <ComponentToPrintSurestarie
                  ref={componentRef}
                  numero={surestarienumeroInput}
                  datedernierereparation={surestariedateInput}
                  // typeconteneur={reparatypeInput}
                  tailleconteneur={surestariesizeInput}
                  client={surestarieclientInput}
                  detention={surestariedetentionInput}
                  port={surestarieportInput}
                  size={surestariesizeInput}
                  total={surestarietotalInput}
                  // proprietaireid={reparaownerInput}
                  // paysname={reparapaysInput}
                  // taux={reparatauxInput}
                  // heure={reparaheureInput}
                  // materielid={reparamaterielInput}
                  // total={reparatotal}
                  // numerorecu={repararecuInput}
                  // societereparation={reparasocrepInput}
                  // societelocation={reparasoclocInput}
                  // site={reparasiteInput}
                  // datederniereinspection={reparadateinspInput}
                  // societe={reparasocieteInput}
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
              onAfterPrint={() => printFactureSurestarie()}
            />
          </ListItemIcon>
          <ReactToPrint
            // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
            // to the root node of the returned component as it will be overwritten.
            trigger={() => (
              <ListItemText primary="Note de Débit" primaryTypographyProps={{ variant: 'body2' }} />
            )}
            content={() => componentToPrintRef.current}
            suppressErrors
            onAfterPrint={() => printFactureSurestarie()}
          />
          <ComponentToPrintSurestarie
            ref={componentToPrintRef}
            // constructeur={dataPrint.proprietaire}
            numero={dataPrint.numero}
            client={dataPrint.client}
            total={dataPrint.total}
            montantafacture={dataPrint.montantafacture}
            // tailleconteneurid={dataPrint.taille}
            // typeconteneurid={dataPrint.type}
            // datefabrication={dataPrint.datefabrication}
            // dateentrerservice={dataPrint.dateexpiration}
            // datederniereinspection={dataPrint.dateinspection}
            // observation={dataPrint.observation}
            rows={[
              {
                // number: dataPrint.numero,
                size: dataPrint.taille,
                port: dataPrint.port,
                detention: dataPrint.detention,
                total: dataPrint.total
              }
            ]}
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
