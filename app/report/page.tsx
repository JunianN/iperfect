'use client'

import { useState } from "react";
import { Box, Toolbar, Container, Tabs, Tab, Paper, Typography, Grid, Link, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
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

export default function Report() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const data1 = {
        factory: "Pabrik 1",
        status: "<<status>>",
        date: "01/08/2024",
        change: "<<change>>",
        groups: [
            {
                id: 1,
                formulas: [
                    { name: "Formula 1", value: 200 },
                    { name: "Formula 2", params: { param1: 100, param2: 200 } },
                    { name: "Formula n", value: 300 }
                ]
            },
            {
                id: 2,
                formulas: [
                    { name: "Formula 1", value: 200 },
                    { name: "Formula 2", value: 200 },
                    { name: "Formula n", value: 300 }
                ]
            },
            {
                id: 3,
                formulas: [
                    { name: "Formula 1", value: 200 },
                    { name: "Formula 2", value: 200 },
                    { name: "Formula n", value: 300 }
                ]
            }
        ]
    };

    const data2 = [
        {
            name: 'Pabrik 1',
            groups: [
                {
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                }
            ]
        },
        {
            name: 'Pabrik 2',
            groups: [
                {
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                }
            ]
        },
        {
            name: 'Pabrik 3',
            groups: [
                {
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                },
                {
                    formulas: [
                        { name: 'func1' },
                        { name: 'func2' }
                    ]
                }
            ]
        }
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Container maxWidth="lg" sx={{ mb: 4 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ color: 'gold' }}>
                            <Tab label="Runner" {...a11yProps(0)} />
                            <Tab label="Config" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box sx={{ padding: 2 }}>
                            <Typography variant="h5" gutterBottom>{data1.factory}</Typography>
                            <Typography variant="body1">{data1.status}</Typography>
                            <Typography variant="body1">Date: {data1.date} | {data1.change}</Typography>
                            {data1.groups.map((group) => (
                                <Paper key={group.id} elevation={3} sx={{ margin: '16px 0', padding: 2 }}>
                                    <Typography variant="subtitle1">Group {group.id}:</Typography>
                                    {group.formulas.map((formula, index) => (
                                        <Box key={index} sx={{ paddingLeft: '24px', paddingTop: '8px' }}>
                                            <Typography variant="body2">
                                                {formula.name}: {formula.value || (formula.params ? Object.entries(formula.params).map(([key, value]) => `${key}=${value}`).join(', ') : '')}
                                            </Typography>
                                            {index === group.formulas.length - 2 && <Typography variant="body2" sx={{ paddingTop: '8px' }}>...</Typography>}
                                        </Box>
                                    ))}
                                </Paper>
                            ))}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box sx={{ padding: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
                                <Box>
                                    <Typography variant="h6">Date: 01/08/2024 | <Link href="#" underline="hover">{"<<change>>"}</Link></Typography>
                                    <Typography variant="subtitle1">Config: default_config</Typography>
                                </Box>
                                <Box sx={{ my: 2 }}>
                                    <Link href="#" underline="hover">load_config</Link> | <Link href="#" underline="hover">save_config</Link>
                                </Box>
                            </Box>
                            <Paper elevation={3} sx={{ p: 2 }}>
                                <Grid container spacing={2}>
                                    {data2.map((factory, index) => (
                                        <Grid item xs={12} md={4} key={index}>
                                            <Typography variant="h6">{factory.name}</Typography>
                                            {factory.groups.map((group, groupIndex) => (
                                                <Box key={groupIndex} sx={{ mt: 2 }}>
                                                    <Typography variant="subtitle1">Group {groupIndex + 1}:</Typography>
                                                    <Box sx={{ paddingLeft: '24px' }}>
                                                        <Link component='button' sx={{ fontWeight: 'bold', mb: 1 }}>
                                                            Add new formula
                                                        </Link>
                                                        {group.formulas.map((formula, formulaIndex) => (
                                                            <Typography key={formulaIndex}>
                                                                formula {formulaIndex + 1}: {formula.name} <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }}>edit</Link>
                                                            </Typography>
                                                        ))}
                                                    </Box>
                                                </Box>
                                            ))}
                                            <Link component='button' sx={{ fontWeight: 'bold', mt: 2 }}>
                                                Add new Group
                                            </Link>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Paper>
                        </Box>
                    </CustomTabPanel>
                </Container>
            </Box>
        </Box>
    )
}