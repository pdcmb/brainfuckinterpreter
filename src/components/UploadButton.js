import React, { Fragment } from 'react'
import {Button, makeStyles} from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish';

const styles = makeStyles(theme => ({
    input:{
        display: 'none',
    }
}))

export default function UploadButton(props) {
    const {accept, children, onChange, ...rest} = props
    const classes = styles()
    return (
        <Fragment>
            <input
                accept={accept}
                className={classes.input}
                onChange={onChange}
                id="contained-button-file"
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button 
                    variant="contained" 
                    color="primary" 
                    startIcon={<PublishIcon />}
                    component="span">
                    {children}
                </Button>
            </label>
        </Fragment>

    )
}
