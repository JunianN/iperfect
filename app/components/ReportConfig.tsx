'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Container, Tabs, Tab, Paper, Typography, Grid, Link, Button, Modal, TextField, FormControl, InputLabel, Select, MenuItem, OutlinedInput, SelectChangeEvent } from "@mui/material";
import Sidebar from "../components/Sidebar";
import { config } from "process";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column'
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface Udfs {
    _id: string;
    name: string;
}

interface Groups {
    name: string;
    udfs: Udfs[]
}
interface Config {
    _id: string;
    name: string;
    groups: Groups[]
}

interface Factory {
    _id: string;
    name: string;
    config: Config;
}

interface Configs extends Array<Config> { }
interface Factories extends Array<Factory> { }

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
    const [newGroupName, setNewGroupName] = useState('');
    const [refetch, setRefetch] = useState(false);
    console.log("🚀 ~ ReportConfig ~ refetch:", refetch)
    const [factories, setFactories] = useState<Factories>([])
    const [selectedConfigId, setSelectedConfigId] = useState<string>('');
    const [selectedFactoryId, setSelectedFactoryId] = useState<string>('');
    const [configs, setConfigs] = useState<Configs>([])
    const [loadConfig, setLoadConfig] = useState<string>('')
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [openLoad, setOpenLoad] = useState(false);

    const handleChangeLoadConfig = (event: SelectChangeEvent<typeof loadConfig>) => {
        setLoadConfig(event.target.value || '');
      };

    const handleOpen = (configId: string) => {
        setSelectedConfigId(configId)
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setSelectedConfigId('')
    }

    const handleOpenLoad = (factoryId: string) => {
        setOpenLoad(true);
        setSelectedFactoryId(factoryId)
    }

    const handleCloseLoad = () => {
        setOpenLoad(false);
        setSelectedFactoryId('')
    }

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

        fetchAllConfig();
    }, []);

    useEffect(() => {
        const fetchAllFactory = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/factories/');
                setFactories(response.data)
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data.error);
                } else {
                    console.log(error)
                }
            }
        };

        setRefetch(false)
        fetchAllFactory()
    }, [refetch]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAddNewGroup = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/configs/${selectedConfigId}/groups`, {
                name: newGroupName,
                udf_ids: []
            });

            if (response.status === 200) {
                handleClose()
                setRefetch(true)
            }
        } catch (error) {
            console.error(error)
        }
    
    }
    const handleLoadConfig = async () => {
        try {
            const response = await axios.put(`http://127.0.0.1:8000/factory/${selectedFactoryId}/config/${loadConfig}`);

            if (response.status === 200) {
                handleCloseLoad()
                setRefetch(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ color: 'gold' }}>
                    {factories?.map((factory, index) => (
                        <Tab key={factory._id} label={factory.name} {...a11yProps(index)} />
                    ))}
                </Tabs>
            </Box>
            {factories?.map((factory, index) => (
                <CustomTabPanel value={value} index={index} key={factory._id}>
                    <Box sx={{ padding: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 3 }}>
                            <Box>
                                <Typography variant="h6">Date: 01/08/2024 | <Link href="#" underline="hover">{"<<change>>"}</Link></Typography>
                                <Typography variant="subtitle1">Config: {factory.config.name}</Typography>
                            </Box>
                            <Box sx={{ my: 2 }}>
                                <Link component='button' onClick={() => handleOpenLoad(factory._id)}>load_config</Link>
                            </Box>
                        </Box>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <Grid container spacing={2}>
                                {factory.config.groups.map((group, groupIndex) => (
                                    <Grid item xs={4} md={4} key={index}>
                                        <Box key={groupIndex} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">{group.name}:</Typography>
                                            <Box sx={{ paddingLeft: '24px' }}>
                                                <Link component='button' onClick={() => router.push(`/report/configs/${factory.config._id}/groups/${group.name}/udfs`)} sx={{ fontWeight: 'bold', mb: 1 }}>
                                                    Add new formula
                                                </Link>
                                                {group.udfs.map((udf, udfIndex) => (
                                                    <Typography key={udf._id}>
                                                        formula {udfIndex + 1}: {udf.name} <Link component='button' onClick={() => router.push(`udf/${udf._id}`)} underline="hover" sx={{ fontWeight: 'bold' }}>edit</Link>
                                                    </Typography>
                                                ))}
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                            <Link component='button' onClick={() => handleOpen(factory.config._id)} sx={{ fontWeight: 'bold', mt: 2 }}>
                                Add new Group
                            </Link>
                        </Paper>
                    </Box>
                </CustomTabPanel>
            ))}

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add new Group
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Enter the new group name
                    </Typography>
                    <TextField
                        label="Group name"
                        value={newGroupName}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setNewGroupName(event.target.value);
                        }}
                        sx={{ mt: 2 }}
                    />
                    <Box display='flex' justifyContent="flex-end">
                        <Button sx={{ mt: 2 }} onClick={handleAddNewGroup} variant="contained">Add</Button>
                    </Box>
                </Box>
            </Modal>

            <Modal
                open={openLoad}
                onClose={handleCloseLoad}
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Load Config
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Choose config
                    </Typography>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl fullWidth sx={{ m: 1, minWidth: 120, }}>
                            <InputLabel id="demo-dialog-select-label">Config</InputLabel>
                            <Select
                                labelId="demo-dialog-select-label"
                                id="demo-dialog-select"
                                value={loadConfig}
                                onChange={handleChangeLoadConfig}
                                input={<OutlinedInput label="Config" />}
                            >
                                {configs?.map((config) => (
                                    <MenuItem key={config._id} value={config._id}>{config.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display='flex' justifyContent="flex-end">
                        <Button sx={{ mt: 2 }} onClick={handleLoadConfig} variant="contained">Load</Button>
                    </Box>
                </Box>
            </Modal>

        </Container>
    )
}