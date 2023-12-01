import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import "../estilos/addReport.css";

export default function AddReport(props) {
  return (
    <Box sx={{ position: 'fixed', bottom: '1em', right: '1em' }}  >
      <Fab className='floating-button rotate-90-cw' color="primary" aria-label="add" onClick={props.handleClick}>
        <AddIcon />
      </Fab>
    </Box>
  );
}