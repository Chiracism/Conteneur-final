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

  const [masternumero, setMasterNumero] = useState('');
  const [masterdatefab, setMasterDateFab] = useState('');
  const [masterdateexp, setMasterDateExp] = useState('');
  const [masterdateinsp, setMasterDateInsp] = useState('');
  const [masteretat, setMasterEtat] = useState('');
  const [masterobservation, setMasterObservation] = useState('');
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
    if (masternumero !== '' && masternumero !== null) return false;
    return true;
  }

  // React-Toastify-Notification
  const showSuccessToast = () => {
    toast.success('MasterFile a été enregistré avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1100
    });
  };

  // Print Facture
  function printFacture() {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/newmasterfile/`,
        {
          numero: masternumero,
          taille: mastersizeInput,
          type: mastertype,
          datefabrication: masterdatefab,
          dateexpiration: masterdateexp,
          dateinspection: masterdateinsp,
          etatconteneur: masteretatInput,
          proprietaire: masterownerInput,
          etat: masteretat,
          observation: masterobservation,
          name: user.name,
          date: new Date()
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
    setMasterNumero('');
    setMasterSizeInput('');
    setMasterTypeInput('');
    setMasterDateFab('');
    setMasterDateExp('');
    setMasterDateInsp('');
    setMasterEtatInput('');
    setMasterEtat('');
    setMasterOwnerInput('');
    setMasterObservation('');

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
    showSuccessToast();
    // reloadPage();
  }

  /**
   * Informations for Countrie
   */
  // const [mastercountrieTab, setMasterCountrieTab] = useState([]);
  // const [mastercountrieInput, setMasterCountrieInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/countrie/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setMasterCountrieTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

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
   * Informations for Materiel
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
  const [masterownerTab, setMasterOwnerTab] = useState([]);
  const [masterownerInput, setMasterOwnerInput] = useState(null);

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
  // const [navireTab, setNavireTab] = useState([]);
  // const [navirenameInput, setNavireNameInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/navire/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setNavireTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

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
   * Informations for Devise
   */
  // const [deviseTab, setDeviseTab] = useState([]);
  // const [masterdeviseInput, setMasterDeviseInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/devise/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setDeviseTab(value.data);
  //     })
  //     .catch(() => {});
  // }, []);

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
  // const [clientTab, setClientTab] = useState([]);
  // const [masterclient, setMasterClientInput] = useState(null);

  // useEffect(() => {
  //   axios(`${process.env.REACT_APP_BASE_URL}/client/`, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
  //     }
  //   })
  //     .then((value) => {
  //       setClientTab(value.data);
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
            MasterFile
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
                value={masternumero}
                onChange={(e) => {
                  setMasterNumero(e.target.value);
                }}
              />
            </div>
            {/* <div className="input-label-wrapper">
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
            </div> */}
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
            {/* <div className="input-label-wrapper">
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
            </div> */}
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
                  <TextField {...params} label="Sélectionner le propriétaire" variant="outlined" />
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
              number={masternumero}
              typeconteneurid={mastertype}
              tailleconteneurid={mastersizeInput}
              // client={masterclient}
              etatconteneur={masteretatInput}
              datefabrication={masterdatefab}
              constructeur={masterownerInput}
              dateentrerservice={masterdateexp}
              datederniereinspection={masterdateinsp}
              // dernierconstat={masterdernierconst}
              // dernierconstat={masterdateexp}
              observation={masterobservation}
              rows={[]}
            />
          </div>
        </Card>
      </Container>
    </Page>
  );
}
