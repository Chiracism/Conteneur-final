import { useRef, useState } from 'react';
import axios from 'axios';

// Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Icon } from '@iconify/react';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import editOutline from '@iconify/icons-eva/edit-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Button,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@material-ui/core';

// Modal
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // overflow: 'scroll',
    // overflow: 'auto'
    overflow: 'scroll'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: 700,
    height: 400,
    // paddingTop: 50,
    // overflow: 'scroll'
    // overflow: 'auto'
    overflowY: 'scroll'
  }
}));

// ----------------------------------------------------------------------

export default function UserMoreMenu({ idAgence, nameAgence, sendInformation }) {
  const classes = useStyles();
  const ref = useRef(null);

  // Modal
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState(nameAgence);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  // React-Toastify-Notification
  const showSuccessToastSUP = () => {
    toast.warning('Agence a été supprimée avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const showSuccessToastMOD = () => {
    toast.success('Agence a été modifiée avec succès', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000
    });
  };

  const deleteAgence = () => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/agence/${idAgence}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
        }
      })
      .then((value) => {
        console.log('Delete Agence success !');
        sendInformation(value);
        showSuccessToastSUP();
      })
      .catch(() => {});
  };

  const modifyAgence = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}/agence/${idAgence}`,
        {
          name
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`
          }
        }
      )
      .then((value) => {
        sendInformation(value.data);
        setIsOpen(false);
        handleClose();
        showSuccessToastMOD();
      })
      .catch(() => {});
  };

  return (
    <>
      <ToastContainer />
      {openModal ? (
        <Modal
          aria-describedby="simple-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleClose}
        >
          <div className={classes.paper}>
            <h2 align="center" id="simple-modal-title">
              Modifier Agence
            </h2>
            {/* <TextField
              label="Saisissez Index"
              ariant="outlined"
              style={{ marginTop: 20, marginBottom: 20 }}
              value={index}
              onChange={(e) => setIndex(e.target.value)}
            /> */}
            <TextField
              label="Saisissez le nom"
              variant="outlined"
              style={{ marginTop: 20, marginBottom: 20 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              onClick={() => modifyAgence()}
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
            >
              Sauvegarder
            </Button>
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
        <MenuItem sx={{ color: 'blue' }} onClick={() => handleOpen()}>
          <ListItemIcon>
            <Icon icon={editOutline} width={40} height={40} />
          </ListItemIcon>
          <ListItemText primary=" Modifier " primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
        <MenuItem sx={{ color: 'red' }} onClick={() => deleteAgence()}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary=" Effacer " primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
