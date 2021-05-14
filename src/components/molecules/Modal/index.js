import React, { useContext } from 'react';
import { StyledModal, StyledPaper } from './StyledModal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import RootContext from '../../../context/RootContext';
import List from '../List';
import { listTypes } from '../../../helpers/listTypes';

const Modal = () => {
  const context = useContext(RootContext);
  const { cartModalOpen, handleCartModalClose, cart } = context;

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
          <List array={cart} listType={listTypes.cartList} />
        </StyledPaper>
      </Fade>
    </StyledModal>
  );
};

export default Modal;