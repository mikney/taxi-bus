import React, {FC} from 'react';
import {Box, Modal} from "@mui/material";

const ModalAlert: FC<any> = ({confirm, cancel, alert}: any) => {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


  return (
    <div>
      <Modal
        open={!!alert}
        onClose={cancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 style={{textAlign: "center"}}>{alert}</h2>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <button className={'but'} onClick={cancel}>Отменить</button>
            <button className={'but'} onClick={confirm}>Подтвердить</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAlert;