'use client'

import React, { useState } from "react";
import { Box, Typography, Toolbar, Paper, Grid, TextField } from "@mui/material";
import CodeEditor from "../components/AceEditor";
import Sidebar from "../components/Sidebar";

export default function UDF() {
    const [code, setCode] = useState('# Write your code here...');

    const HandleCodeChange = (newCode) => {
        setCode(newCode)
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Typography variant="h4" sx={{ mb: 2 }}>User Defined Function</Typography>
                <Box sx={{ padding: 3 }}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300, mb: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                    Name
                                </Typography>
                                <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                    :
                                </Typography>
                                <Typography variant="body1" sx={{ flex: 1, marginLeft: '8px' }}>
                                    rawmat_function1
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                    Output type
                                </Typography>
                                <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                    :
                                </Typography>
                                <Typography variant="body1" sx={{ flex: 1, marginLeft: '8px' }}>
                                    Dictionary
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
                            <Typography gutterBottom sx={{ fontWeight: 900 }}>Input</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                    A = P1/Clean/TDA/tagxxxx
                                </Typography>
                                {/* <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                    :
                                </Typography> */}
                                <Typography variant="body1" sx={{ flex: 1, marginLeft: '8px' }}>
                                    default=0
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                    B = P1/Clean/TDA/tagxxxx
                                </Typography>
                                {/* <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                    :
                                </Typography> */}
                                <Typography variant="body1" sx={{ flex: 1, marginLeft: '8px' }}>
                                    default=10
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                    C = P2/TieIN/tagxxxx
                                </Typography>
                                {/* <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                    :
                                </Typography> */}
                                <Typography variant="body1" sx={{ flex: 1, marginLeft: '8px' }}>
                                    default=15
                                </Typography>
                            </Box>
                        </Box>
                    </Paper>
                    {/* <Typography>Name</Typography>
                    <Typography>Output Type</Typography> */}
                </Box>
                {/* <Box>
                    <Typography>Input</Typography>
                    <Typography>Input</Typography>
                    <Typography>Input</Typography>
                    <Typography>Input</Typography>
                </Box> */}
                <CodeEditor onChange={HandleCodeChange} value={code} />
            </Box>
        </Box>
    );
}