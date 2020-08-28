import React, { useState, useMemo } from 'react';
import { Container, TextField, FormControlLabel, Checkbox, Box, Button, 
         Tabs, Tab, Table, TableCell, TableRow, TableBody, TableHead, TableContainer,
         Paper, Tooltip, BottomNavigation, BottomNavigationAction,
         makeStyles, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import TabPanel from './TabPanel'
import UploadButton from './UploadButton'
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import BuildIcon from '@material-ui/icons/Build';

const styles = makeStyles( theme => ({
    root: {
        display: 'flex',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
          },
    },
    editorPanel: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        flex: '3 1 80%',
        '&>*':{
            margin: theme.spacing(1)
        },
    },
    sidePanel: {
        margin: theme.spacing(1),
        flexDirection: 'column',
        display: 'flex',
        flex: '1 1 20%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    buttons:{
        display: 'flex',
        width: '100%',
        '&>*':{
            marginRight: theme.spacing(2)
        }
    },
    options:{
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        '&>*':{
            margin: theme.spacing(1),
            width: '100%',
        }
    },
    bottomNavigation:{
        alignItems: 'center',
        display: 'none',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    }

}))

const commands = [
    { 
        character: '>',
        meaning: 'Increment the data pointer (to point to the next cell to the right).'
    },
    { 
        character: '<',
        meaning: 'Decrement the data pointer (to point to the next cell to the left).'
    },
    { 
        character: '+',
        meaning: 'Increment (increase by one) the byte at the data pointer.'
    },
    { 
        character: '-',
        meaning: 'Decrement (decrease by one) the byte at the data pointer.'
    },
    { 
        character: '.',
        meaning: 'Output the byte at the data pointer.'
    },
    { 
        character: ',',
        meaning: 'Accept one byte of input, storing its value in the byte at the data pointer.'
    },
    { 
        character: '[',
        meaning: 'If the byte at the data pointer is zero, then instead of moving the instruction pointer forward to the next command, jump it forward to the command after the matching ] command'
    },
    { 
        character: ']',
        meaning: 'If the byte at the data pointer is nonzero, then instead of moving the instruction pointer forward to the next command, jump it back to the command after the matching [ command.'
    },
]

function cleanup(code){
    return code.match(/[<>+-.,[\]]/g).join("")
}


function evaluate(code, input){
    let bracemap = buildbracemap(code)
    let cells = [0]
    let cellptr = 0
    let codeptr = 0
    let inputptr = 0
    let output = ''

    while (codeptr < code.length){

        let command = code.charAt(codeptr)

    
        if (command == ">"){
            cellptr += 1
            if (cellptr >= cells.length)
                cells.push(0)
        }
            
        if (command == "<"){
            if (cellptr <= 0) 
            cellptr = 0 
            else cellptr -= 1
        }

        if (command == "+"){
            if (cells[cellptr] < 255)
                cells[cellptr] += 1
            else cells[cellptr] = 0
        }
        
        if (command == "-"){
            if (cells[cellptr] > 0) 
                cells[cellptr] -= 1
            else cells[cellptr] = 255
        }
        
        if (command == "[" && cells[cellptr] == 0){
            codeptr = bracemap[codeptr] 
        }
        if (command == "]" && cells[cellptr] != 0){ 
            codeptr = bracemap[codeptr] 
        }
        if (command == ".")
            output = output.concat(String.fromCharCode(cells[cellptr]))
        if (command == ","){
            if(input.charAt(inputptr)){
                cells[cellptr] = input.charCodeAt(inputptr)
                inputptr += 1
            }
        } 
        codeptr += 1
    }
    return output
}

function buildbracemap(code){
    let temp_bracestack = []
    let bracemap = {}

    for (let index = 0; index < code.length; index++ ){
        let command = code.charAt(index)
        if(command === "[" ){
            temp_bracestack.push(index)
        } 
        if(command === "]"){
            let start = temp_bracestack.pop()
            bracemap[start] = index
            bracemap[index] = start
        }

    }

    return bracemap
}

export default function App() {
    const classes = styles()
    const theme = useTheme();
    const isSmDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [dynamicMemory, setDynamicMemory] = useState(false)
    const [cellsNumber, setCellsNumber] = useState(30000)
    const [sideTab, setSideTab] = useState(0)
    const [renderView, setRenderView] = useState(0)
    
    const handleRunClick = (event) => {
        if(code != ''){
            setCode(cleanup(code));
            setInput('')
            setOutput(evaluate(cleanup(code)))
        }
    }

    const readFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => { setCode(e.target.result)};
            reader.readAsText(file)
        }
    }

    const editorPanel = (
        <Box className={classes.editorPanel}>
            <TextField 
                rows={isSmDevice ? 7 : 15} 
                multiline
                value={code}
                onChange={(e) => setCode(e.target.value) } 
                variant="outlined" 
                helperText="Insert code here"/>
            <TextField 
                label="Input"
                value={input}
                onChange={(e) => setInput(e.target.value)} 
                variant="outlined"/>
            <Box className={classes.buttons}>
                <Button color="primary" variant="contained" onClick={handleRunClick}>Run</Button>
                <Button color="primary" variant="contained" onClick={() => setOutput('') }>Clear output</Button>
                <UploadButton accept="text/*" onChange={readFile} >Upload file</UploadButton>
            </Box>
            <TextField
                label="Output"
                variant="outlined"
                rows={isSmDevice ? 5 : 8}
                multiline
                value={output}
                InputProps={{
                    readOnly: true,
                }}
            />
        </Box>)

    const optionsPanel = (
        <Box className={classes.options}>
            <Tooltip title="Not working yet">
                <FormControlLabel
                    control={
                    <Checkbox 
                        checked={dynamicMemory}
                        onChange={(e) => setDynamicMemory(e.target.checked)}
                    />
                    }
                    label="Dynamic memory"
                />
            </Tooltip>
            <TextField 
                label="Max cells"
                disabled={dynamicMemory} 
                value={cellsNumber}
                onChange={(e) => setCellsNumber(e.target.value)}
                type="number" 
                variant="outlined"
            />
        </Box>)

    const commandsPanel = (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Character</TableCell>
                        <TableCell align="center">Meaning</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                { commands.map( command => {
                    return (
                        <TableRow key={command.character}>
                            <TableCell component="th" scope="row">{command.character}</TableCell>
                            <TableCell align="center">{command.meaning}</TableCell>
                        </TableRow>
                    )
                })}
                </TableBody>
            </Table>
        </TableContainer>)

    const views = [editorPanel, commandsPanel, optionsPanel]
    const mainView = isSmDevice ? views[renderView] : editorPanel 

    return (
        <Container className={classes.root}>
            { mainView }  
            <Box className={classes.sidePanel}>
                <Tabs value={sideTab} onChange={ (e, newValue ) => { setSideTab(newValue); } }>
                        <Tab label="Commands" />
                        <Tab label="Options" />
                </Tabs>
                <TabPanel value={sideTab} index={0}>
                    {commandsPanel}
                </TabPanel>
                <TabPanel value={sideTab} index={1}>
                    {optionsPanel}
                </TabPanel>
            </Box>
            <BottomNavigation 
                showLabels 
                className={classes.bottomNavigation}
                value={renderView}
                onChange={ (e, newValue ) => { setRenderView(newValue) } }
                >
                <BottomNavigationAction label="Editor" icon={<EditIcon />} />
                <BottomNavigationAction label="Commands table" icon={<InfoIcon />} />
                <BottomNavigationAction label="Options" icon={<BuildIcon />} />
            </BottomNavigation>
        </Container>
    )
}
