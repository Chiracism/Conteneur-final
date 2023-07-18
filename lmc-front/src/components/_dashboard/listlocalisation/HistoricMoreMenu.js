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
  numeroLocal,
  tailleLocal,
  typeLocal,
  positionLocal,
  navireLocal,
  exportLocal,
  datedepartLocal,
  portLocal,
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

  const [localtailleInput, setLocalTailleInput] = useState(tailleLocal);
  const [localtypeInput, setLocalTypeInput] = useState(typeLocal);
  // const [localdocderefInput, setLocalDocdeRefInput] = useState(docderefLocal);
  const [localdatedepartInput, setLocalDateDepartInput] = useState(datedepartLocal);

  const [dataPrint, setDataPrint] = useState({});

  const componentToPrintRef = useRef();

  const printFactureMasterfile = () => {};

  useEffect(() => {
    // Fetch datas for the current historic
    axios(`${process.env.REACT_APP_BASE_URL}/positionnement/${idHistoric}`, {
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

  /**
   * Informations for N° Conteneur
   */
  const [localnumeroTab, setLocalNumeroTab] = useState([]);
  const [localnumeroInput, setLocalNumeroInput] = useState(numeroLocal);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/newmasterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setLocalNumeroTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for position
   */
  const [localpositionTab, setLocalPositionTab] = useState([]);
  const [localpositionInput, setLocalPositionInput] = useState(positionLocal);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/position/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setLocalPositionTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Port
   */
  const [localportTab, setLocalPortTab] = useState([]);
  const [localportInput, setLocalPortInput] = useState(portLocal);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setLocalPortTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Navire
   */
  const [localnavireTab, setLocalNavireTab] = useState([]);
  const [localnavireInput, setLocalNavireInput] = useState(navireLocal);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setLocalNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  const [localexportTab, setLocalExportTab] = useState([]);
  const [localexportInput, setLocalExportInput] = useState(exportLocal);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/categorie/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setLocalExportTab(value.data);
      })
      .catch(() => {});
  }, []);

  function disabledPrint() {
    if (localnumeroInput !== '' && localnumeroInput !== null) return false;
    return true;
  }

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
    toast.success('Opération a été modifié avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const deleteListHistoric = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/positionnement/${idHistoric}`, {
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
        `${process.env.REACT_APP_BASE_URL}/positionnement/${idHistoric}`,
        {
          numero: localnumeroInput,
          taille: localtailleInput,
          type: localtypeInput,
          position: localpositionInput,
          navire: localnavireInput,
          datedepart: localdatedepartInput,
          port: localportInput,
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
    setLocalNumeroInput('');
    setLocalTailleInput('');
    setLocalTypeInput('');
    setLocalPositionInput('');
    setLocalNavireInput('');
    setLocalDateDepartInput('');
    setLocalPortInput('');
    showSuccessToastMOD();
    // reloadPage();
  }

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
              Modification de Fiche de Localisation Conteneur
            </h2>
            <Card className="card-wrapper">
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  N° Conteneur:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={localnumeroTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setLocalNumeroInput(newType.numero);
                        setLocalTailleInput(newType.taille);
                        setLocalTypeInput(newType.type);
                      } else {
                        setLocalNumeroInput(null);
                        setLocalTailleInput(null);
                        setLocalTypeInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.numero}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le numéro" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Position:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={localpositionTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setLocalPositionInput(newType.name);
                      } else {
                        setLocalPositionInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner la position" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Date de Départ:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    type="date"
                    variant="outlined"
                    value={localdatedepartInput}
                    onChange={(e) => {
                      setLocalDateDepartInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Navire:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={localnavireTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setLocalNavireInput(newType.name);
                      } else {
                        setLocalNavireInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner la position" variant="outlined" />
                    )}
                  />
                </div>
              </Box>
              <Box className="box-wrapper">
                <div className="input-label-wrapper">
                  Taille:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    variant="outlined"
                    value={localtailleInput}
                    onChange={(e) => {
                      setLocalTailleInput(e.target.value);
                    }}
                  />
                </div>
                <div className="input-label-wrapper">
                  Type:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    variant="outlined"
                    value={localtypeInput}
                    onChange={(e) => {
                      setLocalTypeInput(e.target.value);
                    }}
                  />
                </div>
                {/* <div className="input-label-wrapper">
                  Réf. Document:{' '}
                  <TextField
                    className="basic-input"
                    // label="Saisissez la date de Fabrication"
                    variant="outlined"
                    value={localdocderefInput}
                    onChange={(e) => {
                      setLocalDocdeRefInput(e.target.value);
                    }}
                  />
                </div> */}
                <div className="input-label-wrapper">
                  Port de Décharg.:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={localportTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setLocalPortInput(newType.name);
                      } else {
                        setLocalPortInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Sélectionner le port" variant="outlined" />
                    )}
                  />
                </div>
                <div className="input-label-wrapper">
                  Export:{' '}
                  <Autocomplete
                    className="combo-box-completion"
                    options={localexportTab}
                    onChange={(event, newType) => {
                      if (newType) {
                        setLocalExportInput(newType.name);
                      } else {
                        setLocalExportInput(null);
                      }
                    }}
                    getOptionLabel={(option) => option.name}
                    style={{ width: 400 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sélectionner l'Element Export"
                        variant="outlined"
                      />
                    )}
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
                  numeroL={localnumeroInput}
                  tailleL={localtailleInput}
                  typeL={localtypeInput}
                  positionL={localpositionInput}
                  navireL={localnavireInput}
                  datedepartL={localdatedepartInput}
                  portL={localportInput}
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
        {/* <MenuItem sx={{ color: 'green' }}>
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
            typeconteneurid={dataPrint.type}
            datefabrication={dataPrint.datefabrication}
            dateentrerservice={dataPrint.dateexpiration}
            datederniereinspection={dataPrint.dateinspection}
            observation={dataPrint.observation}
          />
        </MenuItem> */}
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
