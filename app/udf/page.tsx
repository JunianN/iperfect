'use client'

import React, { useState } from "react";
import { Box, Typography, Toolbar, Paper, Grid, TextField, Container, Link, Button } from "@mui/material";
import axios from "axios";
import CodeEditor from "../components/AceEditor";
import Sidebar from "../components/Sidebar";

export default function UDF() {
    const [code, setCode] = useState('# Write your code here...');
    console.log("🚀 ~ UDF ~ code:", code)

    const HandleCodeChange = (newCode: string) => {
        setCode(newCode)
    };

    const handleClick = async () => {
        try {
            const response = await axios.post('https://iperfect-api.vercel.app/code/', {
                code: code,
            });
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg" sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>User Defined Function</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 3 }}>
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

                                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                                    <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Input</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap', mr: 2 }}>
                                            A = P1/Clean/TDA/tagxxxx
                                        </Typography>
                                        <Typography variant="body1" sx={{}}>
                                            default = 0
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap', mr: 2 }}>
                                            B = P1/Clean/TDA/tagxxxx
                                        </Typography>
                                        <Typography variant="body1" sx={{}}>
                                            default = 10
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap', mr: 2 }}>
                                            C = P2/TieIN/tagxxxx
                                        </Typography>
                                        <Typography variant="body1" sx={{}}>
                                            default = 15
                                        </Typography>
                                    </Box>
                                </Box>
                                <Link component='button' sx={{ fontWeight: 'bold', display: 'inline-block', width: 'fit-content' }}>
                                    Add new input
                                </Link>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} sx={{}}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '500px' }}>
                                <CodeEditor onChange={HandleCodeChange} value={code} />
                                <Box display='flex' justifyContent="flex-end">
                                    <Button onClick={handleClick} variant="contained" sx={{ mt: 2, display: 'inline-block', width: 'fit-content' }}>Run test</Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
}