import React from 'react';
import './Reparation.css';

class ComponentToPrintRepara extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const {
      rows,
      client,
      numero,
      datedernierereparation,
      typeconteneur,
      tailleconteneur,
      proprietaireid,
      paysname,
      taux,
      heure,
      materielid,
      total,
      numerorecu,
      societereparation,
      societelocation,
      site,
      datederniereinspection,
      societe
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
        <br />
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          REPARATION DE CONTENEUR
        </h3>
        {/* <p className="print-source" style={{ textAlign: 'right', margin: '2rem 1rem 3rem 0' }}>
          <strong>Client</strong> : <span>{client}</span>
        </p> */}
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>N° Conteneur</strong> : <span>{numero}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Date Dernière Réparation</strong> : <span>{datedernierereparation}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Type Conteneur</strong> : <span>{typeconteneur}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Taille Conteneur</strong> : <span>{tailleconteneur}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Propriétaire</strong> : <span>{proprietaireid}</span>
        </p>
        <br />
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Taux</strong> : <span>{taux}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Nombre Heure</strong> : <span>{heure}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Matériel</strong> : <span>{materielid}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Total</strong> : <span>{total}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Numéro Réçu</strong> : <span>{numerorecu}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Société de Réparation</strong> : <span>{societereparation}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Site</strong> : <span>{site}</span>
        </p>
        <br />
        <p className="print-source" style={{ textAlign: 'left', margin: '0rem 1rem 0rem 1rem' }}>
          {/* '0rem 1rem 0rem 6.8rem' */}
          <strong>Date Dernière Inspection</strong> : <span>{datederniereinspection}</span>
        </p>
        {/* <div
          className="print-source"
          style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', width: '100%' }}
        >
          <table className="print-source" style={{ width: '100%' }}>
            <thead>
              <th>N° Item</th>
              <th>Descriptions</th>
              <th>Poids/Volume</th>
              <th>Montant</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const { number, description, weight, price } = value;
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{number}</td>
                    <td>{description}</td>
                    <td>{weight}</td>
                    <td>{price}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div> */}
        <div
          className="print-source"
          style={{
            position: 'absolute',
            bottom: '15%',
            right: 0,
            textAlign: 'right',
            margin: '3rem 1rem 3rem 0'
          }}
        >
          {/* <p>
            <strong>TVA</strong>
          </p>
          <p>
            <strong>Montant Net</strong> : {total} FC
          </p> */}
          <p>
            <strong>Date</strong> : {date}
          </p>
        </div>
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

export default ComponentToPrintRepara;
