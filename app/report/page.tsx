'use client'

import { useState } from "react";
import { Box, Toolbar, Container, Tabs, Tab, Paper, Typography, Grid, Link, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import ReportConfig from "../components/ReportConfig";
import ReportViewer from "../components/ReportViewer";

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
                        <ReportViewer />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <ReportConfig />
                    </CustomTabPanel>
                </Container>
            </Box>
        </Box>
    )
}