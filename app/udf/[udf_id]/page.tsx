'use client'

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Toolbar, Paper, Grid, TextField, Container, Link, Button } from "@mui/material";
import axios from "axios";
import CodeEditor from "../../components/AceEditor";
import Sidebar from "../../components/Sidebar";

export default function UDF() {
    const { udf_id } = useParams();
    const [code, setCode] = useState('# Write your code here...');
    const [udf, setUdf] = useState();
    const [name, setName] = useState('');
    const [outputType, setOutputType] = useState('');

    const HandleCodeChange = (newCode: string) => {
        setCode(newCode)
    };

    const HandleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value)
    };

    const HandleOutputTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOutputType(event.target.value)
    };

    useEffect(() => {
        const fetchUdf = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/udf/${udf_id}`);
                setUdf(response.data);
                setName(response.data.name)
                setOutputType(response.data.output_type)
                setCode(response.data.code)
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data.error);
                } else {
                    console.log(error)
                }
            }
        };

        fetchUdf();
    }, [udf_id]);

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
                                        <TextField sx={{ marginLeft: '8px' }} variant="outlined" size="small" value={name} onChange={HandleNameChange} />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <Typography variant="body1" sx={{ minWidth: 100, textAlign: 'left', whiteSpace: 'nowrap' }}>
                                            Output type
                                        </Typography>
                                        <Typography variant="body1" sx={{ width: 10, textAlign: 'center' }}>
                                            :
                                        </Typography>
                                        <TextField sx={{ marginLeft: '8px', mt: 1 }} variant="outlined" size="small" value={outputType} onChange={HandleOutputTypeChange} />
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
                                    <Typography gutterBottom sx={{ fontWeight: 'bold' }}>Input</Typography>
                                    {udf?.inputs.map((input, index) => (
                                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                                            <Typography variant="body1" sx={{ minWidth: 250, textAlign: 'left', whiteSpace: 'nowrap', mr: 2 }}>
                                                {input.name} = {input.value}
                                            </Typography>
                                            <Typography variant="body1" sx={{}}>
                                                default = {input.default_value}
                                            </Typography>
                                        </Box>
                                    ))}
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