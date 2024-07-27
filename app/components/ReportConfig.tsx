'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Container, Tabs, Tab, Paper, Typography, Grid, Link, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Udfs {
    _id: string;
    name: string;
  }

interface Config {
    _id: string;
    name: string;
    udfs: Udfs[]
  }

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function ReportConfig() {
    const [value, setValue] = useState(0);
    const [configs, setConfigs] = useState([])
    const [config, setConfig] = useState<Config | null>(null)
    console.log("🚀 ~ ReportConfig ~ config:", config)
    const [usedConfig, setUsedConfig] = useState('default_config')
    const router = useRouter();

    useEffect(() => {
        const fetchAllConfig = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/config');
                setConfigs(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data.error);
                } else {
                    console.log(error)
                }
            }
        };

        const fetchConfigDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/config/66a475001cc8da0f7001d15c/details');
                setConfig(response.data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data.error);
                } else {
                    console.log(error)
                }
            }
        };

        fetchAllConfig();
        fetchConfigDetails();
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const data2 = [
        {
            name: 'Pabrik 1',
            groups: [
                {
                    name: 'P1 Group 1',
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    name: 'P1 Group 2',
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    name: 'P1 Group 3',
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
            ]
        },
        {
            name: 'Pabrik 2',
            groups: [
                {
                    name: 'P2 Group 1',
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    name: 'P2 Group 2',
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    name: 'P2 Group 3',
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
            ]
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ color: 'gold' }}>
                    {data2.map((factory, index) => (
                        <Tab key={index} label={factory.name} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {data2.map((factory, index) => (
                <CustomTabPanel value={value} index={index} key={index}>
                    <Box sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
                            <Box>
                                <Typography variant="h6">Date: 01/08/2024 | <Link href="#" underline="hover">{"<<change>>"}</Link></Typography>
                                <Typography variant="subtitle1">Config: {config?.name}</Typography>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Link href="#" underline="hover">load_config</Link>
                            </Box>
                        </Box>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {factory.groups.map((group, groupIndex) => (
                                    <Grid item xs={4} md={4} key={index}>
                                        <Box key={groupIndex} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">{group.name}:</Typography>
                                            <Box sx={{ paddingLeft: '24px' }}>
                                                <Link component='button' onClick={() => router.push(`udf/add/${config?._id}`)} sx={{ fontWeight: 'bold', mb: 1 }}>
                                                    Add new formula
                                                </Link>
                                                {config?.udfs.map((udf, formulaIndex) => (
                                                    <Typography key={formulaIndex}>
                                                        formula {formulaIndex + 1}: {udf.name} <Link component='button' onClick={() => router.push(`udf/${udf._id}`)} underline="hover" sx={{ fontWeight: 'bold' }}>edit</Link>
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Link component='button' sx={{ fontWeight: 'bold', mt: 2 }}>
                                Add new Group
                            </Link>
                        </Paper>
                    </Box>
                </CustomTabPanel>
            ))}
        </Container>
    )
}