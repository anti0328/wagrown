import React, { useContext } from 'react';
import { StyledModal, StyledPaper } from './StyledModal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RootContext from '../../../context/RootContext';

const Modal = () => {
  const context = useContext(RootContext);
  const { cartModalOpen, handleCartModalClose } = context;

  return (
    <StyledModal
      aria-labelledby="transition-MaterialModal-title"
      aria-describedby="transition-modal-description"
      open={cartModalOpen}
      onClose={handleCartModalClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={cartModalOpen}>
        <StyledPaper>
          <h2>Your cart</h2>
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default Modal;
