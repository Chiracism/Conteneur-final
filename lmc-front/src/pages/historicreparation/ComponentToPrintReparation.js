import React from 'react';
import './Historic.css';

class ComponentToPrintReparation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date().toDateString()
    };
  }

  render() {
    const { rows } = this.props;
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
          <div
            className="print-source"
            style={{ textAlign: 'center', color: 'blue', flexGrow: 0.7 }}
          >
            <p style={{ fontWeight: 700, fontSize: '22px' }}>Republique Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div>
        </div>
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          HISTORIQUE REPARATIONS
        </h3>
        <div
          className="print-source"
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <table className="print-source" style={{ width: '100%', marginBottom: '2rem' }}>
            <thead>
              <th>Numéro</th>
              <th>Date Réparation</th>
              <th>Type Conteneur</th>
              <th>Taille Conteneur</th>
              <th>Propriétaire</th>
              <th>Pays</th>
              <th>Taux</th>
              <th>Heure</th>
              <th>Matériel</th>
              <th>Site</th>
              <th>Total</th>
              <th>Numéro Réçu</th>
              <th>Société Réparation</th>
              <th>Location</th>
              <th>Site</th>
              <th>Date Inspection</th>
              <th>Société</th>
              {/* <th>Utilisateur</th> */}
              <th>Date</th>
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const {
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
                  societe,
                  // user,
                  date
                } = value;
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{numero}</td>
                    <td>{datedernierereparation}</td>
                    <td>{typeconteneur}</td>
                    <td>{tailleconteneur}</td>
                    <td>{proprietaireid}</td>
                    <td>{paysname}</td>
                    <td>{taux}</td>
                    <td>{heure}</td>
                    <td>{materielid}</td>
                    <td>{total}</td>
                    <td>{numerorecu}</td>
                    <td>{societereparation}</td>
                    <td>{societelocation}</td>
                    <td>{site}</td>
                    <td>{datederniereinspection}</td>
                    <td>{societe}</td>
                    {/* <td>{user}</td> */}
                    <td>{date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ComponentToPrintReparation;
