import React from 'react';
import './HistoricSurestarie.css';

class ComponentToPrintSurestarie extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const {
      rows,
      numero,
      taille,
      type,
      navire,
      port,
      typeofchoix,
      datearrivee,
      client,
      caution,
      daterestitution,
      detention,
      duree,
      durees,
      rembourser,
      montantafacture,
      total,
      name
    } = this.props;
    const { date } = this.state;

    return (
      <div>
        <div className="print-source" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            className="print-source"
            src="/static/logo_lmc.JPG"
            alt="Logo"
            style={{ width: 150, height: 150 }}
          />
          <img
            className="print-source"
            src="/static/logo_lmc.JPG"
            alt="Logo"
            style={{
              position: 'absolute',
              zIndex: -1,
              opacity: 0.1,
              left: 75,
              top: 250,
              width: 600,
              height: 600
            }}
          />
          <div
            className="print-source"
            style={{ textAlign: 'center', color: 'blue', flexGrow: 0.2 }}
          >
            <p style={{ fontWeight: 700, fontSize: '22px' }}>Republique Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div>
        </div>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          HISTORIQUE DES OPERATIONS DE SURESTARIE
        </h3>
        {/* <p className="print-source" style={{ textAlign: 'right', margin: '2rem 1rem 3rem 0' }}>
          <strong>Client</strong> : <span>{client}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>N° Conteneur</strong> : <span>{numero}</span>
        </p>
        <br /> */}
        {/* <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 6.8rem' }}> */}
        {/* <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>Taille Conteneur</strong> : <span>{taille}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>Type</strong> : <span>{type}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>Navire</strong> : <span>{navire}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>Port</strong> : <span>{port}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>Détention</strong> : <span>{detention}</span> Jours
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '1rem 1rem 0rem 1rem' }}>
          <strong> Total </strong> : <span>{total}</span> CDF/USD
        </p> */}
        <div
          className="print-source"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', width: '100%' }}
        >
          <table className="print-source" style={{ width: '100%' }}>
            <thead>
              <th>N° Conteneur</th>
              <th>Taille</th>
              {/* <th>Type</th> */}
              <th>Navire</th>
              <th>Port</th>
              <th>Type Transport</th>
              <th>ETA</th>
              <th>ETD</th>
              <th>Client</th>
              <th>Caution Versée</th>
              <th>Détention</th>
              {/* <th>Durée Inf.</th>
              <th>DUrée Sup.</th> */}
              <th>Montant à Rembourser</th>
              <th>Montant</th>
              <th>Total</th>
              {/* <th>Inséré par</th> */}
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const {
                  numero,
                  taille,
                  // type,
                  navire,
                  port,
                  typeofchoix,
                  datearrivee,
                  client,
                  caution,
                  daterestitution,
                  detention,
                  // duree,
                  // durees,
                  rembourser,
                  montantafacture,
                  total
                  // name
                } = value;
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{numero}</td>
                    <td>{taille}</td>
                    {/* <td>{type}</td> */}
                    <td>{navire}</td>
                    <td>{port}</td>
                    <td>{typeofchoix}</td>
                    <td>{datearrivee}</td>
                    <td>{daterestitution}</td>
                    <td>{client}</td>
                    <td>{caution}</td>
                    <td>{detention}</td>
                    {/* <td>{duree}</td>
                    <td>{durees}</td> */}
                    <td>{rembourser}</td>
                    <td>{montantafacture}</td>
                    <td>{total}</td>
                    {/* <td>{name}</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: '35%',
            right: 0,
            textAlign: 'right',
            margin: '2rem 1rem 2rem 0'
          }}
        >
          <p>
            <strong>Montant Net </strong> : {total} USD/CDF
          </p>
          <p>
            <strong>Date </strong> : {date}
          </p>
        </div>
        <br /> */}
        {/* <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          <strong>NGUNGA WAMPILUKULA</strong>
          <strong>Directeur d'Exploitation</strong>
        </p> */}
        {/* <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: '15%',
            // right: 0,
            textAlign: 'left',
            margin: '0rem 1rem 0rem 1rem'
            // margin: '3rem 1rem 3rem 0'
          }}
        >
          <p>
            <strong>N.B:</strong> Facture payable 15 jours francs à compter de la date d'arrivée du
            navire
          </p>
          <p>
            <strong>Compte n° :</strong> 05100-05101-03006717401-55/USD
          </p>
          <p>
            <strong>Banque :</strong> RAWBANK
          </p>
          <p>
            <strong>Code Swift :</strong> NCDCDKI
          </p>
        </div> */}
        <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 150,
            textAlign: 'center',
            margin: '3rem 0',
            fontSize: 10
          }}
        >
          {' '}
          <hr style={{ opacity: 1 }} />
          <p style={{ color: 'blue' }}>
            Société Anonyme Unipersonnelle avec conseil d'administration
          </p>
          <p style={{ color: 'blue' }}>au Capital de 16.474.900.000 CDF</p>
          <p>N°RCCM CD/RCCM/14-B-3622 - ID.NAT. : 01-715-A06030E - N°IMPOT : A0700620H</p>
          <p>
            Siège Social : Immeuble LMC - AMICONGO, 6ème étage, Avenue des Aviateurs, n°13 Place de
            la Poste,
          </p>
          <p>
            Commune de la Gombe, Courrier : <a href="mailto:info@lmc.cd">info@lmc.cd</a> Site web :{' '}
            <a href="www.lmc.cd">www.lmc.cd</a>
          </p>
        </div>
      </div>
    );
  }
}

export default ComponentToPrintSurestarie;
