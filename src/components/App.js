import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Container, TextField, FormControlLabel, Checkbox, Box, Button, Switch, Fab,
         Tabs, Tab, Tooltip, BottomNavigation, BottomNavigationAction, Typography, Slider, Divider,
         makeStyles, useMediaQuery } from '@material-ui/core'
import TabPanel from './TabPanel'
import UploadButton from './UploadButton'
import CommandsTable from './CommandsTable'
import InputDialog from './InputDialog'
import EditIcon from '@material-ui/icons/Edit'
import InfoIcon from '@material-ui/icons/Info'
import BuildIcon from '@material-ui/icons/Build'
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'


const styles = makeStyles( theme => ({
    root: {
        display: 'flex',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            paddingBottom: theme.spacing(8),
          },
    },
    editorPanel: {
        margin: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        flex: '3 1 75%',
        '&>*':{
            margin: theme.spacing(1)
        },
    },
    sidePanel: {
        margin: theme.spacing(1),
        flexDirection: 'column',
        display: 'flex',
        flex: '1 1 25%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    buttons:{
        display: 'flex',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        '&>*':{
            marginRight: theme.spacing(2)
        }
    },
    fab: {
        position: 'fixed',
        display: 'none',
        bottom: theme.spacing(8),
        right: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            alignItems: 'center',
        }
    },
    options:{
        display: 'flex',
        flexDirection: 'column',
        '&>*':{
            margin: theme.spacing(1),
        }
    },
    bottomNavigation:{
        alignItems: 'center',
        display: 'none',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        zIndex: theme.zIndex.appBar,
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
    }

}))


function cleanup(code){
    if(code !== '')
        return code.match(/[<>+-.,[\]]/g).join("")
    else return ''
}


function evaluate(code, memorySize, input){
    let bracemap = buildbracemap(code)
    let cells = [0]
    let cellptr = 0
    let codeptr = 0
    let inputptr = 0
    let output = ''
    while (codeptr < code.length){

        let command = code.charAt(codeptr)
    
        if (command === ">"){
            cellptr += 1
            if (memorySize !== -1 && cellptr >= memorySize)
                cellptr = 0
            else if(cellptr >= cells.length)
                cells.push(0)
        }
            
        if (command === "<"){
            if (cellptr <= 0) 
            cellptr = 0 
            else cellptr -= 1
        }

        if (command === "+"){
            if (cells[cellptr] < 255)
                cells[cellptr] += 1
            else cells[cellptr] = 0
        }
        
        if (command === "-"){
            if (cells[cellptr] > 0) 
                cells[cellptr] -= 1
            else cells[cellptr] = 255
        }
        
        if (command === "[" && cells[cellptr] === 0){
            codeptr = bracemap[codeptr] 
        }
        if (command === "]" && cells[cellptr] !== 0){ 
            codeptr = bracemap[codeptr] 
        }
        if (command === ".")
            output = output.concat(String.fromCharCode(cells[cellptr]))
        if (command === ","){
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
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
    const [useDarkTheme, setUseDarkTheme] = useState(prefersDarkMode);

    const theme = useMemo(() =>
        createMuiTheme({
            palette: {
                type: prefersDarkMode || useDarkTheme ? 'dark' : 'light',
                primary: {
                    main: '#03a9f4',
                },
                secondary: {
                   main: '#4caf50',
                },
            },
            shape: {
                borderRadius: 0,
            },
            overrides: {
                MuiCssBaseline:{
                    '@global': {
                        html: {
                            overflowY: 'scroll',
                        },
                    }
                },
            }
        }),
        [prefersDarkMode, useDarkTheme],
      );

    const classes = styles()
    const isSmDevice = useMediaQuery(theme.breakpoints.down('sm'));

    const [code, setCode] = useState('')
    const [input, setInput] = useState('')
    const [output, setOutput] = useState('')
    const [dynamicMemory, setDynamicMemory] = useState(true)
    const [promptInput, setPromptInput] = useState(true)
    const [cellsNumber, setCellsNumber] = useState(30000)
    const [sideTab, setSideTab] = useState(0)
    const [renderView, setRenderView] = useState(0)
    const [inputSize, setInputSize] = useState(15)
    const [outputSize, setOutputSize] = useState(8)
    const [isInputDialogOpen, setIsInputDialogOpen] = useState(false)
    
    const run = useCallback(() => {
      if(code !== ''){
        if(promptInput && code.match(/,/g) && (code.match(/,/g).length - input.length) > 0 )
            setIsInputDialogOpen(true)
        else setOutput(evaluate(code, dynamicMemory ? -1 : cellsNumber, input))
        
      }
    },[code, input, cellsNumber, promptInput, dynamicMemory] )

    useEffect(() => {
        if(isInputDialogOpen){
            setIsInputDialogOpen(false)
            run()
        }
    }, [input, isInputDialogOpen, run])

    const readFile = (event) => {
        let file = event.target.files[0];
        if (file) {
            const reader = new FileReader()
            reader.onload = async (e) => { setCode(cleanup(e.target.result))};
            reader.readAsText(file)
        }
    }

    const editorPanel = (
        <Box className={classes.editorPanel}>
            <TextField 
                rows={inputSize} 
                multiline
                value={code}
                onChange={(e) => setCode(cleanup(e.target.value)) } 
                variant="outlined" 
                helperText="Insert code here"/>
            <TextField 
                label="Input"
                value={input}
                onChange={(e) => setInput(e.target.value)} 
                variant="outlined"/>
            <Box className={classes.buttons}>
                <Button color="primary" variant="contained" onClick={run}>Run</Button>
                <Button color="primary" variant="contained" onClick={() => setOutput('') }>Clear output</Button>
                <UploadButton color="primary" variant="contained" accept="text/*" onChange={readFile} >Upload file</UploadButton>
            </Box>
            <TextField
                label="Output"
                variant="outlined"
                rows={outputSize}
                multiline
                value={output}
                InputProps={{
                    readOnly: true,
                }}
            />
            <Tooltip title="Run" aria-label="run">
                <Fab color="primary" onClick={run} className={classes.fab}>
                    <PlayArrowIcon />
                </Fab>
            </Tooltip>
        </Box>)

    const optionsPanel = (
        <Box className={classes.options}>
            <Typography variant="h6">General options</Typography>
            <Divider />
            <FormControlLabel
                control={
                <Checkbox 
                    checked={dynamicMemory}
                    color="primary"
                    onChange={(e) => setDynamicMemory(e.target.checked)}
                />
                }
                label="Dynamic memory"
            />
            <TextField 
                label="Max cells"
                disabled={dynamicMemory} 
                value={cellsNumber}
                onChange={(e) => setCellsNumber(e.target.value)}
                type="number" 
                variant="outlined"
            />
            <FormControlLabel
                    control={
                    <Checkbox 
                        checked={promptInput}
                        color="primary"
                        onChange={(e) => setPromptInput(e.target.checked)}
                    />
                    }
                    label="Prompt for input"
                />
            <Typography variant="h6">Editor options</Typography>
            <Divider />
            <FormControlLabel
                control={
                <Switch
                    checked={useDarkTheme}
                    onChange={(e) => setUseDarkTheme(e.target.checked)}
                    color="primary"
                />
                }
                label="Use dark theme"
            />
            <Typography >Input field size</Typography>
            <Slider
                defaultValue={15}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={5}
                max={20}
                value={inputSize}
                onChange={(e, newValue) => setInputSize(newValue)}
            />
            <Typography >Output field size</Typography>
            <Slider
                defaultValue={8}
                marks
                valueLabelDisplay="auto"
                step={1}
                min={2}
                max={20}
                value={outputSize}
                onChange={(e, newValue) => setOutputSize(newValue)}
            />
        </Box>)

    const views = [editorPanel, <CommandsTable />, optionsPanel]
    const mainView = isSmDevice ? views[renderView] : editorPanel 

    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline />
            <Container className={classes.root}>
                { mainView }  
                <Box className={classes.sidePanel}>
                    <Tabs indicatorColor="primary" value={sideTab} onChange={ (e, newValue ) => { setSideTab(newValue); } }>
                            <Tab label="Options" />
                            <Tab label="Commands" />
                    </Tabs>
                    <TabPanel value={sideTab} index={0}>
                        {optionsPanel}
                    </TabPanel>
                    <TabPanel value={sideTab} index={1}>
                        <CommandsTable />
                    </TabPanel>
                </Box>
            </Container>
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
            <InputDialog 
                open={isInputDialogOpen} 
                onClose={() => setIsInputDialogOpen(false)}
                onInputAccept={(value) =>setInput(input.concat(value))}
            />
        </ThemeProvider>
    )
}
