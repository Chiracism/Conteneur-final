import React from 'react';
import './HistoricSurestarie.css';

class ComponentToPrint extends React.PureComponent {
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
          <div className="print-source" style={{ textAlign: 'center', color: 'blue', flexGrow: 1 }}>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>République Démocratique du Congo</p>
            <p style={{ fontWeight: 700, fontSize: '22px' }}>LIGNES MARITIMES CONGOLAISES, SA</p>
            <p style={{ fontWeight: 600, fontSize: '22px' }}>Armement National</p>
            <hr style={{ opacity: 1, color: 'blue', backgroundColor: 'blue', height: '3px' }} />
          </div>
        </div>
        <h5
          className="print-source"
          police="Monotype Corsiva"
          style={{ textAlign: 'left', police: 'Monotype Corsiva' }}
        >
          DIRECTION COMMERCIALE & EXPLOITATION
        </h5>
        <br />
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          REPERTOIRE DE LOCALISATION CONTENEURS
        </h3>
        <div
          className="print-source"
          style={{
            display: 'block',
            marginTop: '2rem',
            marginBottom: '2rem',
            width: '100%'
          }}
        >
          <table className="print-source" style={{ width: '100%', marginBottom: '2rem' }}>
            <thead>
              <th>N° Conteneur</th>
              <th>Taille</th>
              <th>Type</th>
              <th>Position</th>
              <th>Réf. Document</th>
              <th>Date Départ</th>
              <th>Port Décharg.</th>
              {/* <th>Inséré par</th> */}
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                // const { serie, agence, envoi, pol, pod, vessel, tva, total, date } = value;
                const { numero, taille, type, position, docderef, datedepart, port } = value;
                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{numero}</td>
                    <td>{taille}</td>
                    <td>{type}</td>
                    <td>{position}</td>
                    <td>{docderef}</td>
                    <td>{datedepart}</td>
                    <td>{port}</td>
                    {/* <td>{name}</td> */}
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

export default ComponentToPrint;
