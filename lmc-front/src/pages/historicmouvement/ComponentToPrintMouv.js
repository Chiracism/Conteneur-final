import React from 'react';
import './Historic.css';

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
        <h3 className="print-source" style={{ textAlign: 'center' }}>
          HISTORIQUE DES MOUVEMENTS
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
              <th>Type</th>
              <th>Taille</th>
              <th>Client</th>
              <th>Site</th>
              <th>Sous-Site</th>
              <th>Date Mouvement</th>
              <th>Navire</th>
              <th>Date Arrivée</th>
              <th>Port</th>
              <th>Observation</th>
              {/* <th>Inséré par</th>
              <th>Date</th> */}
            </thead>
            <tbody style={{ width: '100%' }}>
              {rows.map((value, key) => {
                const {
                  number,
                  typeconteneur,
                  size,
                  client,
                  site,
                  soussite,
                  datemouvement,
                  exnavire,
                  datearrivee,
                  port,
                  observation
                  // name,
                  // date
                } = value;

                // const numeroFiche = value.numero_fiche;
                // const dollarTaux = value.dollar_taux;
                // const euroTaux = value.euro_taux;
                // const tvaDgrkc = value.tva_dgrkc;
                // const qteAuthentificationConnaissement = value.qte_authentification_connaissement;
                // const qteConventionnel50tCconsignation = value.qte_conventionnel_50t_consignation;
                // const qteConventionnelMilieuConsignation =
                //   value.qte_conventionnel_milieu_consignation;
                // const qteConventionnel500tConsignation = value.qte_conventionnel_500t_consignation;
                // const qteVehiculeConsignation = value.qte_vehicule_consignation;
                // const qteConteneur20Consignation = value.qte_conteneur_20_consignation;
                // const qteConteneur40Consignation = value.qte_conteneur_40_consignation;
                // const qteConteneur20Tracking = value.qte_conteneur_20_tracking;
                // const qteConteneur40Tracking = value.qte_conteneur_40_tracking;
                // const qteConteneur20Equipement = value.qte_conteneur_20_equipement;
                // const qteConteneur40Equipement = value.qte_conteneur_40_equipement;
                // const qteFraisCorrectionManifesteEquipement =
                //   value.qte_frais_correction_manifeste_equipement;
                // const qteFraisLettreGarantieSimpleEquipement =
                //   value.qte_frais_lettre_garantie_simple_equipement;
                // const qteConventionnelNavigation = value.qte_conventionnel_navigation;
                // const qteVehiculeNavigation = value.qte_vehicule_navigation;
                // const qteConteneur20Navigation = value.qte_conteneur_20_navigation;
                // const qteConteneur40Navigation = value.qte_conteneur_40_navigation;

                return (
                  <tr key={key} style={{ textAlign: 'center' }}>
                    <td>{number}</td>
                    <td>{typeconteneur}</td>
                    <td>{size}</td>
                    <td>{client}</td>
                    <td>{site}</td>
                    <td>{soussite}</td>
                    <td>{datemouvement}</td>
                    <td>{exnavire}</td>
                    <td>{datearrivee}</td>
                    <td>{port}</td>
                    <td>{observation}</td>
                    {/* <td>{name}</td>
                    <td>{date}</td>
                    <td>{qteConteneur20Tracking}</td>
                    <td>{qteConteneur40Tracking}</td>
                    <td>{qteConteneur20Equipement}</td>
                    <td>{qteConteneur40Equipement}</td>
                    <td>{qteFraisCorrectionManifesteEquipement}</td>
                    <td>{qteFraisLettreGarantieSimpleEquipement}</td>
                    <td>{qteConventionnelNavigation}</td>
                    <td>{qteVehiculeNavigation}</td>
                    <td>{qteConteneur20Navigation}</td>
                    <td>{qteConteneur40Equipement}</td>
                    <td>{qteConteneur40Navigation}</td>
                    <td>{numeroFiche}</td>
                    <td>{dollarTaux}</td>
                    <td>{euroTaux}</td>
                    <td>{tva}</td>
                    <td>{tvaDgrkc}</td>
                    <td>{date}</td>
                    <td>{total}</td> */}
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
