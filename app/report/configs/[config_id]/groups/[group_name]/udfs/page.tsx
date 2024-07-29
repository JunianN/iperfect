'use client'

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Box, Typography, Toolbar, Paper, Grid, TextField, Container, Link, Button } from "@mui/material";
import axios from "axios";
import CodeEditor from "../../../../../../components/AceEditor";
import Sidebar from "../../../../../../components/Sidebar";

export default function NewUDF() {
    const { config_id, group_name } = useParams();
    const router = useRouter();
    const [code, setCode] = useState('# Write your code here...');
    const [name, setName] = useState('');
    const [outputType, setOutputType] = useState('');
    const [inputs, setInputs] = useState([]);

    const HandleCodeChange = (newCode: string) => {
        setCode(newCode)
    };

    const HandleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    const HandleOutputTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutputType(event.target.value)
    };

    const handleClick = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/configs/${config_id}/groups/${group_name}/udfs`, {
                name: name,
                output_type: outputType,
                inputs: [{
                    name: "input1",
                    value: "P1/Clean/TDA/tag001",
                    default_value: 0
                },{
                    name: "input2",
                    value: "P1/Clean/TDA/tag002",
                    default_value: 0
                },{
                    name: "input3",
                    value: "P1/TieIn/tag003",
                    default_value: 0
                }],
                code: code,
            });

            if (response.status === 200) {
                router.push('/report')
            }
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
                                elevation={3}
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
                                        <TextField sx={{ marginLeft: '8px' }} variant="outlined" size="small" value={name} onChange={HandleNameChange}/>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', mt: 1 }}>
                                        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                            Output type
                                        </Typography>
                                        <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                            :
                                        </Typography>
                                        <TextField sx={{ marginLeft: '8px' }} variant="outlined" size="small" value={outputType} onChange={HandleOutputTypeChange}/>
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
                            <Paper elevation={3} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '500px' }}>
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