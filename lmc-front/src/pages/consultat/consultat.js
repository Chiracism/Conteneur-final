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

export default function Consultat() {
  const componentRef = useRef();
  const [user, setUser] = useState(null);
  const [blNumb, setBlNumb] = useState('');
  const [fileNumb, setFileNumb] = useState('');
  const [send, setSend] = useState('');

  // Variables

  // const [consultNumero, setConsultNumero] = useState('');
  // const [consultTaille, setConsultTaille] = useState('');
  // const [consultType, setConsultType] = useState('');
  const [consultDateFab, setConsultDateFab] = useState('');
  const [consultDateExp, setConsultDateExp] = useState('');
  const [consultDateInsp, setConsultDateInsp] = useState('');
  // const [consultEtat, setConsultEtat] = useState('');
  // const [consultProprietaire, setConsultProprietaire] = useState('');
  const [consultBillOfLading, setConsultBillOfLading] = useState('');
  // const [consultNavire, setConsultNavire] = useState('');
  const [consultEta, setConsultEta] = useState('');
  // const [consultClient, setConsultClient] = useState('');
  // const [consultAgence, setConsultAgence] = useState('');
  const [consultCaution, setConsultCaution] = useState('');
  const [consultObservation, setConsultObservation] = useState('');
  const [name, setName] = useState('');

  // const [masternumero, setMasterNumero] = useState('');
  // const [masterdatefab, setMasterDateFab] = useState('');
  // const [masterdateexp, setMasterDateExp] = useState('');
  // const [masterdateinsp, setMasterDateInsp] = useState('');
  // const [masterobservation, setMasterObservation] = useState('');
  // const [masternumber, setMasterNumber] = useState('');
  // const [masternameNavire, setMasterNameNavire] = useState('');
  // const [mastercountrieTab, setMasterCountrieTab] = useState([]);
  // const [mastertype, setMasterTypeInput] = useState('');
  // const [mastersizeInput, setMasterSizeInput] = useState('');
  // const [mastermateriel, setMasterMaterielInput] = useState('');
  // const [masterowner, setMasterOwner] = useState('');
  // const [masteretatInput, setMasterEtatInput] = useState('');
  // const [mastercontructeur, setMasterConstructeur] = useState('');
  // const [masterdatefab, setMasterDateFab] = useState('');
  // const [masterdateentrer, setMasterDateEntrer] = useState('');
  // const [masterdatederniere, setMasterDateDerniere] = useState('');
  // const [mastervaleur, setMasterValeur] = useState('');
  // const [masterdeviseinput, setMasterDeviseInput] = useState('');
  // const [mastersocieteinsp, setMasterSocieteInsp] = useState('');
  // const [masterdernierconst, setMasterDernierConst] = useState('');
  // const [mastersiteInput, setMasterSiteInput] = useState('');
  // const [mastersoussiteInput, setMasterSoussiteInput] = useState('');
  // const [masterdatemouv, setMasterDateMouv] = useState('');
  // const [masterobservation, setMasterObservation] = useState('');
  // const [masterclient, setMasterClientInput] = useState('');
  // const [masterdateop, setMasterDateOp] = useState('');
  // const [mastermontant, setMasterMontant] = useState('');
  // const [masternumero, setMasterNumero] = useState('');

  const reloadPage = () => {
    window.location.reload();
  };

  function disabledPrint() {
    if (consultNumero !== '' && consultNumero !== null) return false;
    return true;
  }

  // React-Toastify-Notification
  const showSuccessToast = () => {
    toast.success('Information a été enregistrée avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1100
    });
  };

  // Print Facture
  function printFacture() {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/consultat/`,
        {
          numero: consultNumero,
          taille: consultTaille,
          type: consultType,
          datefabrication: consultDateFab,
          dateexpiration: consultDateExp,
          dateinspection: consultDateInsp,
          etatconteneur: consultEtat,
          proprietaire: consultProprietaire,
          billoflading: consultBillOfLading,
          navire: consultNavire,
          eta: consultEta,
          client: consultClient,
          agence: consultAgence,
          caution: consultCaution,
          observation: consultObservation,
          name: user.name,
          date: new Date()
          // numero: masternumero,
          // taille: mastersizeInput,
          // type: mastertype,
          // datefabrication: masterdatefab,
          // dateexpiration: masterdateexp,
          // dateinspection: masterdateinsp,
          // etatconteneur: masteretatInput,
          // proprietaire: masterownerInput,
          // observation: masterobservation,
          // number: masternumber,
          // namenavire: navirenameInput,
          // paysid: mastercountrieInput,
          // typeconteneurid: mastertype,
          // tailleconteneurid: mastersizeInput,
          // materielid: mastermateriel,
          // proprietaireid: masterownerInput,
          // etatconteneurid: masteretatInput,
          // constructeur: mastercontructeur,
          // datefabrication: masterdatefab,
          // dateentrerservice: masterdateentrer,
          // datederniereinspection: masterdatederniere,
          // valeurassuree: mastervaleur,
          // deviseid: masterdeviseInput,
          // societeinspection: mastersocieteinsp,
          // dernierconstat: masterdernierconst,
          // siteid: mastersiteInput,
          // soussiteid: mastersoussiteInput,
          // datemouvement: masterdatemouv,
          // observation: masterobservation,
          // client: masterclient,
          // dateoperation: masterdateop,
          // montant: mastermontant,
          // numerorecu: masternumero,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then(() => {})
      .catch(() => {});

    setConsultNumero('');
    setConsultTaille('');
    setConsultType('');
    setConsultDateFab('');
    setConsultDateExp('');
    setConsultDateInsp('');
    setConsultEtat('');
    setConsultProprietaire('');
    setConsultBillOfLading('');
    setConsultNavire('');
    setConsultEta('');
    setConsultClient('');
    setConsultAgence('');
    setConsultCaution('');
    setConsultObservation('');
    setName('');
    showSuccessToast();
    // setMasterNumero('');
    // setMasterSizeInput('');
    // setMasterTypeInput('');
    // setMasterDateFab('');
    // setMasterDateExp('');
    // setMasterDateInsp('');
    // setMasterEtatInput('');
    // setMasterOwnerInput('');
    // setMasterObservation('');

    // setMasterNumber('');
    // setMasterConstructeur('');
    // setMasterDateFab('');
    // setMasterDateEntrer('');
    // setMasterDateDerniere('');
    // setMasterValeur('');
    // setMasterSocieteInsp('');
    // setMasterDernierConst('');
    // setMasterDateMouv('');
    // setMasterObservation('');
    // setMasterDateOp('');
    // setMasterMontant('');
    // setMasterNumero('');
    // setMasterCountrieInput('');
    // setMasterTypeInput('');
    // setMasterSizeInput('');
    // setMasterMaterielInput('');
    // setMasterOwnerInput('');
    // setNavireNameInput('');
    // setMasterEtatInput('');
    // setMasterDeviseInput('');
    // setMasterSiteInput('');
    // setMasterSoussiteInput('');
    // setMasterClientInput('');
    // reloadPage();
  }

  /**
   * Informations for Numéro Conteneur
   */
  // const [consultNumeroTab, setConsultNavireTab] = useState([]);
  // const [consultNumero, setConsultNavire] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setConsultNavireTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Consult-Number
   */
  const [consultNumeroTab, setConsultNumeroTab] = useState([]);
  const [consultNumero, setConsultNumero] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/consultat/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultNumeroTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Type
   */
  const [consultTypeTab, setConsultTypeTab] = useState([]);
  const [consultType, setConsultType] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/type/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultTypeTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Taille
   */
  const [consultTailleTab, setConsultTailleTab] = useState([]);
  const [consultTaille, setConsultTaille] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/size/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultTailleTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Etat-Conteneur
   */
  // const [mastermaterielTab, setMasterMaterielTab] = useState([]);
  // const [mastermateriel, setMasterMaterielInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/materiel/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setMasterMaterielTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Materiel
   */
  const [consultProprietaireTab, setConsultProprietaireTab] = useState([]);
  const [consultProprietaire, setConsultProprietaire] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/owner/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultProprietaireTab(value.data);
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
  const [consultNavireTab, setConsultNavireTab] = useState([]);
  const [consultNavire, setConsultNavire] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultNavireTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Etat Conteneur
   */
  const [consultEtatTab, setConsultEtatTab] = useState([]);
  const [consultEtat, setConsultEtat] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/etat_conteneur/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultEtatTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Agence
   */
  const [consultAgenceTab, setConsultAgenceTab] = useState([]);
  const [consultAgence, setConsultAgence] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/agence/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultAgenceTab(value.data);
      })
      .catch(() => {});
  }, []);

  /**
   * Informations for Site
   */
  // const [siteTab, setSiteTab] = useState([]);
  // const [mastersiteInput, setMasterSiteInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/site/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setSiteTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Sous-Site
   */
  // const [soussiteTab, setSoussiteTab] = useState([]);
  // const [mastersoussiteInput, setMasterSoussiteInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/soussite/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setSoussiteTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

  /**
   * Informations for Client
   */
  const [consultClientTab, setConsultClientTab] = useState([]);
  const [consultClient, setConsultClient] = useState(null);

  useEffect(() => {
    axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
      }
    })
      .then((value) => {
        setConsultClientTab(value.data);
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
    <Page title="Consultation | LMC App">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Fiche de Consultation
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
              <TextField
                className="basic-input"
                label="Saisissez le numéro de Conteneur"
                variant="outlined"
                value={consultNumero}
                onChange={(e) => {
                  setConsultNumero(e.target.value);
                }}
              />
            </div>
            {/* <div className="input-label-wrapper">
              N° Conteneur :{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultNumeroTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultNumero(newType.numero);
                  } else {
                    setConsultNumero(null);
                  }
                }}
                getOptionLabel={(option) => option.numero}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner Numéro Conteneur" variant="outlined" />
                )}
              />
            </div> */}
            {/* <div className="input-label-wrapper">
              Taille:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le montant de la Taille"
                variant="outlined"
                value={consultTaille}
              />
            </div> */}
            <div className="input-label-wrapper">
              Taille:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultTailleTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultTaille(newType.name);
                  } else {
                    setConsultTaille(null);
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
              Date Fabrication:{' '}
              <TextField
                className="basic-input"
                // label="Selectionner la date de Fabrication"
                type="date"
                variant="outlined"
                value={consultDateFab}
                onChange={(e) => {
                  setConsultDateFab(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Date Expiration:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de Fabrication"
                type="date"
                variant="outlined"
                value={consultDateExp}
                onChange={(e) => {
                  setConsultDateExp(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Propriétaire:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultProprietaireTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultProprietaire(newType.name);
                  } else {
                    setConsultProprietaire(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner Propriétaire" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Navire:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultNavireTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultNavire(newType.name);
                  } else {
                    setConsultNavire(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner Navire" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Client:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultClientTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultClient(newType.name);
                  } else {
                    setConsultClient(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner Client" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Caution:{' '}
              <TextField
                className="basic-input"
                label="Saisissez le montant de la Caution"
                variant="outlined"
                value={consultCaution}
                onChange={(e) => {
                  setConsultCaution(e.target.value);
                }}
              />
            </div>
          </Box>
          <Box className="box-2-wrapper">
            <div className="input-label-wrapper">
              Type:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultTypeTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultType(newType.name);
                  } else {
                    setConsultType(null);
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
              Date Inspection:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de Fabrication"
                type="date"
                variant="outlined"
                value={consultDateInsp}
                onChange={(e) => {
                  setConsultDateInsp(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Etat:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultEtatTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultEtat(newType.name);
                  } else {
                    setConsultEtat(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sélectionner Etat de Conteneur"
                    variant="outlined"
                  />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              N° BL:{' '}
              <TextField
                className="basic-input"
                label="Selectionner le numéro de Conteneur"
                variant="outlined"
                value={consultBillOfLading}
                onChange={(e) => {
                  setConsultBillOfLading(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              ETA:{' '}
              <TextField
                className="basic-input"
                // label="Saisissez la date de Fabrication"
                type="date"
                variant="outlined"
                value={consultEta}
                onChange={(e) => {
                  setConsultEta(e.target.value);
                }}
              />
            </div>
            <div className="input-label-wrapper">
              Agence:{' '}
              <Autocomplete
                className="combo-box-completion"
                options={consultAgenceTab}
                onChange={(event, newType) => {
                  if (newType) {
                    setConsultAgence(newType.name);
                  } else {
                    setConsultAgence(null);
                  }
                }}
                getOptionLabel={(option) => option.name}
                style={{ width: 400 }}
                renderInput={(params) => (
                  <TextField {...params} label="Sélectionner Agence" variant="outlined" />
                )}
              />
            </div>
            <div className="input-label-wrapper">
              Observation.:{' '}
              <TextField
                className="basic-input"
                label="Commentaires"
                variant="outlined"
                value={consultObservation}
                onChange={(e) => {
                  setConsultObservation(e.target.value);
                }}
              />
            </div>
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
              ref={componentRef}
              numero={consultNumero}
              typeconteneurid={consultType}
              tailleconteneurid={consultTaille}
              // client={masterclient}
              // datefab={consultFab}
              // constructeur={masterownerInput}
              dateexp={consultDateExp}
              dateinsp={consultDateInsp}
              // dernierconstat={masterdernierconst}
              // dateexp={consultDateExp}
              observation={consultObservation}
              rows={[]}
            />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
