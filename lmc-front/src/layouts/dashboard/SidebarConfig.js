import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import personFill from '@iconify/icons-eva/person-fill';
import awardFill from '@iconify/icons-eva/award-fill';
import compassFill from '@iconify/icons-eva/compass-fill';
import flagFill from '@iconify/icons-eva/flag-fill';
import listFill from '@iconify/icons-eva/list-fill';

import jwt from 'jsonwebtoken';
import { AttachMoney, MoneyOff } from '@material-ui/icons';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;
let sidebarConfig = null;

export default function SidebarConfig() {
  // Check User Auth
  const tokenData = localStorage.getItem('lmc_token');

  if (tokenData) {
    const user = jwt.verify(JSON.parse(tokenData), process.env.REACT_APP_JWT_KEY);

    if (!user) {
      localStorage.removeItem('lmc_token');
      sidebarConfig = [];
    } else if (user && user.role_id === 1) {
      sidebarConfig = [
        {
          title: 'Tableau de bord',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        // {
        //   title: 'Master File',
        //   path: '/dashboard/masterfile',
        //   icon: getIcon(fileTextFill)
        // },
        {
          title: 'MasterFile',
          path: '/dashboard/newmasterfile',
          icon: getIcon(fileTextFill)
        },
        // {
        //   title: 'Mouvement',
        //   path: '/dashboard/mouvement',
        //   icon: getIcon(fileTextFill)
        // },
        {
          title: 'Mouvement',
          path: '/dashboard/newmouvement',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Réparation',
          path: '/dashboard/reparation',
          icon: getIcon(fileTextFill)
        },
        // {
        //   title: 'Conteneur',
        //   path: '/dashboard/listeconteneur',
        //   icon: getIcon(fileTextFill)
        // },
        // {
        //   title: 'formulaire importation',
        //   path: '/dashboard/importation',
        //   icon: getIcon(fileTextFill)
        // },
        // {
        //   title: 'formulaire exportation',
        //   path: '/dashboard/exportation',
        //   icon: getIcon(fileTextFill)
        // },
        // {
        //   title: 'Surestarie',
        //   path: '/dashboard/surestarie',
        //   icon: getIcon(fileTextFill)
        // },
        // {
        //   title: 'NewSurestarie',
        //   path: '/dashboard/newsurestarie',
        //   icon: getIcon(fileTextFill)
        // },
        {
          title: 'Surestaries',
          path: '/dashboard/newsurestaries',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Localisation',
          path: '/dashboard/localisation',
          icon: getIcon(fileTextFill)
        },
        // {
        //   title: 'Consultation',
        //   path: '/dashboard/consultat',
        //   icon: getIcon(fileTextFill)
        // },
        // {
        //   title: 'Historique MasterFiles',
        //   path: '/dashboard/listMasterFiles',
        //   icon: getIcon(listFill)
        // },
        {
          title: 'Historique Localisation',
          path: '/dashboard/listlocalisation',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique MasterFiles',
          path: '/dashboard/newlistMasterFiles',
          icon: getIcon(listFill)
        },
        // {
        //   title: 'Historique MasterFiles',
        //   path: '/dashboard/historique',
        //   icon: getIcon(listFill)
        // },
        {
          title: 'Historique Mouvements',
          path: '/dashboard/historicmouvement',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Réparations',
          path: '/dashboard/historicreparation',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Surestaries',
          path: '/dashboard/historicsurestarie',
          icon: getIcon(listFill)
        },
        {
          title: 'Agence',
          path: '/dashboard/agence',
          icon: getIcon(awardFill)
        },
        // {
        //   title: 'Liste MasterFiles',
        //   path: '/dashboard/listMasterFiles',
        //   icon: getIcon(listFill)
        // },
        // {
        //   title: 'choix',
        //   path: '/dashboard/choix',
        //   icon: getIcon(peopleFill)
        // },
        {
          title: 'client',
          path: '/dashboard/client',
          icon: getIcon(peopleFill)
        },
        {
          title: 'Element Export',
          path: '/dashboard/categorie',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Pays',
          path: '/dashboard/countrie',
          icon: getIcon(flagFill)
        },
        {
          title: 'Devise',
          path: '/dashboard/devise',
          icon: getIcon(compassFill)
        },
        {
          title: 'Etat de Conteneur',
          path: '/dashboard/etat_conteneur',
          icon: getIcon(compassFill)
        },
        {
          title: 'Materiel',
          path: '/dashboard/materiel',
          icon: getIcon(compassFill)
        },
        {
          title: 'Navire',
          path: '/dashboard/navire',
          icon: getIcon(compassFill)
        },
        {
          title: 'Propriétaire',
          path: '/dashboard/owner',
          icon: getIcon(peopleFill)
        },
        // {
        //   title: 'Vessel',
        //   path: '/dashboard/vessel',
        //   icon: getIcon(compassFill)
        // },
        {
          title: 'Port',
          path: '/dashboard/port',
          icon: getIcon(flagFill)
        },
        {
          title: 'Position',
          path: '/dashboard/position',
          icon: getIcon(flagFill)
        },
        {
          title: 'Site',
          path: '/dashboard/site',
          icon: getIcon(flagFill)
        },
        {
          title: 'Sous site',
          path: '/dashboard/soussite',
          icon: getIcon(flagFill)
        },
        {
          title: 'Taille',
          path: '/dashboard/size',
          icon: getIcon(flagFill)
        },
        {
          title: 'Taux',
          path: '/dashboard/rate',
          icon: getIcon(flagFill)
        },
        {
          title: 'Type',
          path: '/dashboard/type',
          icon: getIcon(flagFill)
        },
        // {
        //   title: 'Chargeur',
        //   path: '/dashboard/chargeur',
        //   icon: getIcon(personFill)
        // },
        // {
        //   title: 'Agence',
        //   path: '/dashboard/agence',
        //   icon: getIcon(awardFill)
        // },
        {
          title: 'user',
          path: '/dashboard/user',
          icon: getIcon(peopleFill)
        }
        // {
        //   title: 'historique exportation',
        //   path: '/dashboard/historique',
        //   icon: getIcon(listFill)
        // },
        // {
        //   title: 'historique importation',
        //   path: '/dashboard/import-historique',
        //   icon: getIcon(listFill)
        // }
      ];
    } else if (user && user.role_id === 2) {
      sidebarConfig = [
        {
          title: 'Tableau de bord',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'MasterFile',
          path: '/dashboard/newmasterfile',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Mouvement',
          path: '/dashboard/newmouvement',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Réparation',
          path: '/dashboard/reparation',
          icon: getIcon(fileTextFill)
        },
        // {
        //   title: 'formulaire importation',
        //   path: '/dashboard/importation',
        //   icon: getIcon(fileTextFill)
        // },
        // {
        //   title: 'formulaire exportation',
        //   path: '/dashboard/exportation',
        //   icon: getIcon(fileTextFill)
        // },
        {
          title: 'Surestarie',
          path: '/dashboard/newsurestaries',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Historique',
          path: '/dashboard/newlistMasterFiles',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Mouvements',
          path: '/dashboard/historicmouvement',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Réparations',
          path: '/dashboard/historicreparation',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Surestaries',
          path: '/dashboard/historicsurestarie',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Localisation',
          path: '/dashboard/listlocalisation',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 3) {
      sidebarConfig = [
        {
          title: 'Tableau de bord',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'MasterFile',
          path: '/dashboard/newmasterfile',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Mouvement',
          path: '/dashboard/newmouvement',
          icon: getIcon(fileTextFill)
        },
        // {
        //   title: 'Réparation',
        //   path: '/dashboard/reparation',
        //   icon: getIcon(fileTextFill)
        // },
        {
          title: 'Surestarie',
          path: '/dashboard/newsurestaries',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Localisation',
          path: '/dashboard/localisation',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Historique Masterfiles',
          path: '/dashboard/newlistMasterFiles',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Mouvements',
          path: '/dashboard/historicmouvement',
          icon: getIcon(listFill)
        },
        // {
        //   title: 'Historique Réparations',
        //   path: '/dashboard/historicreparation',
        //   icon: getIcon(listFill)
        // },
        {
          title: 'Historique Surestaries',
          path: '/dashboard/historicsurestarie',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Localisations',
          path: '/dashboard/listlocalisation',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 4) {
      sidebarConfig = [
        {
          title: 'Tableau de bord',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'MasterFile',
          path: '/dashboard/newmasterfile',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Mouvement',
          path: '/dashboard/newmouvement',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Surestarie',
          path: '/dashboard/newsurestaries',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Localisation',
          path: '/dashboard/localisation',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Historique Masterfiles',
          path: '/dashboard/newlistMasterFiles',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Mouvements',
          path: '/dashboard/historicmouvement',
          icon: getIcon(listFill)
        },
        // {
        //   title: 'Historique Réparations',
        //   path: '/dashboard/historicreparation',
        //   icon: getIcon(listFill)
        // },
        {
          title: 'Historique Surestaries',
          path: '/dashboard/historicsurestarie',
          icon: getIcon(listFill)
        },
        {
          title: 'Historique Localisations',
          path: '/dashboard/listlocalisation',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 5) {
      sidebarConfig = [
        {
          title: 'Tableau de bord',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Mouvement',
          path: '/dashboard/newmouvement',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Historique Mouvements',
          path: '/dashboard/historicmouvement',
          icon: getIcon(listFill)
        }
      ];
    } else if (user && user.role_id === 6) {
      sidebarConfig = [
        {
          title: 'Tableau de bord',
          path: '/dashboard/app',
          icon: getIcon(pieChart2Fill)
        },
        {
          title: 'Surestarie',
          path: '/dashboard/newsurestaries',
          icon: getIcon(fileTextFill)
        },
        {
          title: 'Historique Surestaries',
          path: '/dashboard/historicsurestarie',
          icon: getIcon(listFill)
        }
      ];
    }
  } else {
    sidebarConfig = [];
  }

  return sidebarConfig;
}
