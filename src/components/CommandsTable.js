import React from 'react'
import { Table, TableCell, TableRow, TableBody, TableHead, TableContainer,
        Paper } from '@material-ui/core'

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

export default function CommandsTable() {
    return (
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
        </TableContainer>
    )
}
