'use client'

import { useState } from "react";
import { Box, Toolbar, Container, Tabs, Tab, Paper, Typography, Grid, Link, Button } from "@mui/material";
import Sidebar from "./Sidebar";
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

export default function ReportViewer() {
    const [value, setValue] = useState(0);

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
                        { name: 200 },
                        { name: 'param1=100, param2=200' }
                    ]
                },
                {
                    name: 'P1 Group 2',
                    formulas: [
                        { name: 200 },
                        { name: 200 }
                    ]
                },
                {
                    name: 'P1 Group 3',
                    formulas: [
                        { name: 200 },
                        { name: 200 }
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
                        { name: 200 },
                        { name: 'param1=100, param2=200' }
                    ]
                },
                {
                    name: 'P2 Group 2',
                    formulas: [
                        { name: 200 },
                        { name: 200 }
                    ]
                },
                {
                    name: 'P2 Group 3',
                    formulas: [
                        { name: 200 },
                        { name: 200 }
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
                                <Typography variant="subtitle1">{"<<status>>"}</Typography>
                            </Box>
                        </Box>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {factory.groups.map((group, groupIndex) => (
                                    <Grid item xs={4} md={4} key={index}>
                                        <Box key={groupIndex} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">{group.name}:</Typography>
                                            <Box sx={{ paddingLeft: '24px' }}>
                                                {group.formulas.map((formula, formulaIndex) => (
                                                    <Typography key={formulaIndex}>
                                                        formula {formulaIndex + 1}: {formula.name}
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Paper>
                    </Box>
                </CustomTabPanel>
            ))}
            {/* <CustomTabPanel value={value} index={0}>
                <Box sx={{ padding: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
                        <Box>
                            <Typography variant="h6">Date: 01/08/2024 | <Link href="#" underline="hover">{"<<change>>"}</Link></Typography>
                            <Typography variant="subtitle1">Config: default_config</Typography>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <Link href="#" underline="hover">load_config</Link>
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
            </CustomTabPanel> */}
        </Container>
    )
}