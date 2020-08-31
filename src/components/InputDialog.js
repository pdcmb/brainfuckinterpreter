import React, { useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
         Button, TextField } from '@material-ui/core'

export default function InputDialog(props) {
    const {open, onClose, onInputAccept } = props

    const [value, setValue] = useState('');

    const handleValueChange = (event) => {
        if(value === '' || event.target.value === '')
            setValue(event.target.value)
    }

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="input-dialog-title">
            <DialogTitle id="input-dialog-title">Input</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Input required
                </DialogContentText>
                <TextField 
                    autoFocus
                    value={value} 
                    onChange={handleValueChange} 
                    margin="dense" 
                    label="Input" 
                    fullWidth/>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    onInputAccept(value)
                    setValue('')
                    }} color="primary">
                    Ok
                </Button>
            </DialogActions>
      </Dialog>
    )
}
