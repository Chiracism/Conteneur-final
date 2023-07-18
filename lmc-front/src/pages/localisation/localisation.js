import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
// react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import jwt from 'jsonwebtoken';

// Material UI Component
import { Card, Stack, Container, Typography, Autocomplete } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
// import Date from '@material-ui/core/Date';
// import { DatePicker } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';

import ReactToPrint from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

import './Masterfile.css';
import { numberValidation } from '../../utils/validate';

// components
import Page from '../../components/Page';
import { CheckUserAuth } from '../../utils/auth';

// ----------------------------------------------------------------------

export default function Masterfile() {
  const componentRef = useRef();
  const [user, setUser] = useState(null);
  const [blNumb, setBlNumb] = useState('');
  const [fileNumb, setFileNumb] = useState('');
  const [send, setSend] = useState('');
  const [rows, setRows] = useState([]);

  const [masternumero, setMasterNumero] = useState('');
  const [localtailleInput, setLocalTailleInput] = useState('');
  const [localtypeInput, setLocalTypeInput] = useState('');
  // const [localdocderefInput, setLocalDocdeRefInput] = useState('');
  const [localdatedepartInput, setLocalDateDepartInput] = useState('');
  // const [masternumber, setMasterNumber] = useState('');
  const [dataPrint, setDataPrint] = useState({});

  useEffect(() => {
    // Fetch datas for the current localisation
    axios(`${process.env.REACT_APP_BASE_URL}/newmasterfile/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setDataPrint(value.data);
      })
      .catch(() => {});
  }, []);

  // useEffect(() => {
  //   // Fetch datas for the current localisation
  //   axios(`${process.env.REACT_APP_BASE_URL}/newsurestarie/${idHistoric}`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       console.log('Datas stored : ', value.data);
  //       setDataPrint(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  const reloadPage = () => {
    window.location.reload();
  };

  function disabledPrint() {
    if (localnumeroInput !== '' && localnumeroInput !== null) return false;
    return true;
  }

  // React-Toastify-Notification
  const showSuccessToast = () => {
    toast.success('Fiche de Localisation a été enregistré avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1100
    });
  };

  // Print Facture
  function printFacture() {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/positionnement/`,
        {
          rows,
          numero: localnumeroInput,
          taille: localtailleInput,
          type: localtypeInput,
          position: localpositionInput,
          // docderef: localdocderefInput,
          datedepart: localdatedepartInput,
          port: localportInput,
          navire: navirenameInput,
          exportat: localexportInput,
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
    setLocalNumeroInput('');
    setLocalTailleInput('');
    setLocalTypeInput('');
    setLocalPositionInput('');
    // setLocalDocdeRefInput('');
    setLocalDateDepartInput('');
    setLocalExportInput('');
    setNavireNameInput('');
    setLocalPortInput('');
    showSuccessToast();
    // reloadPage();
  }

  /**
   * Informations for N° Conteneur
   */
  const [localnumeroTab, setLocalNumeroTab] = useState([]);
  const [localnumeroInput, setLocalNumeroInput] = useState(null);

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
   * Informations for Type
   */
  const [mastertypeTab, setMasterTypeTab] = useState([]);
  const [mastertype, setMasterTypeInput] = useState(null);

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
  const [mastersizeInput, setMasterSizeInput] = useState(null);

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
   * Informations for position
   */
  const [localpositionTab, setLocalPositionTab] = useState([]);
  const [localpositionInput, setLocalPositionInput] = useState(null);

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
   * Informations for Materiel
   */
  const [localexportTab, setLocalExportTab] = useState([]);
  const [localexportInput, setLocalExportInput] = useState(null);

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

  /**
   * Informations for Port
   */
  // const [portTab, setPortTab] = useState([]);
  // const [portnameInput, setPortNameInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/port/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setPortTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Navire
   */
  const [navireTab, setNavireTab] = useState([]);
  const [navirenameInput, setNavireNameInput] = useState(null);

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
  const [masteretatInput, setMasterEtatInput] = useState(null);

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
   * Informations for Port
   */
  const [localportTab, setLocalPortTab] = useState([]);
  const [localportInput, setLocalPortInput] = useState(null);

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

  function renderText(number) {
    if (number === 1) {
      return 'CONVENTIONNEL < 50 T :';
    }

    if (number === 2) {
      return 'CONVENTIONNEL > 50 T < 500 T :';
    }

    if (number === 3) {
      return '16%';
    }

    if (number === 4) {
      return '10%';
    }

    return '';
  }

  return (
    <Page title="MasterFile | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Localisations des Conteneurs
          </Typography>
          <Box>
            <Button variant="contained" color="primary" onClick={() => reloadPage()}>
              Rafraîchir
            </Button>
          </Box>
        </Stack>

        <ToastContainer />
        <CheckUserAuth />

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
                  <TextField {...params} label="Sélectionner le Navire" variant="outlined" />
                )}
              />
            </div>
            {/* <div className="input-label-wrapper">
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
                  <TextField {...params} label="Sélectionner le propriétaire" variant="outlined" />
                )}
              />
            </div> */}
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
                  <TextField {...params} label="Sélectionner l'Element Export" variant="outlined" />
                )}
              />
            </div>
            {/* <div className="input-label-wrapper">
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
            </div> */}
          </Box>
        </Card>

        <Card className="import-card-wrapper"> </Card>

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
              rows={rows}
              ref={componentRef}
              numeroL={localnumeroInput}
              tailleL={localtailleInput}
              typeL={localtypeInput}
              positionL={localpositionInput}
              exportatL={localexportInput}
              navireL={navirenameInput}
              datedepartL={localdatedepartInput}
              portL={localportInput}
            />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
