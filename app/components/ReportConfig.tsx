'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Box, Toolbar, Container, Tabs, Tab, Paper, Typography, Grid, Link, Button, Modal, TextField } from "@mui/material";
import Sidebar from "../components/Sidebar";

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
    const [addGroup, setAddGroup] = useState(false);
    const [configs, setConfigs] = useState([])
    const [config, setConfig] = useState<Config | null>(null)
    const [usedConfig, setUsedConfig] = useState('default_config')
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        // const fetchAllConfig = async () => {
        //     try {
        //         // const response = await axios.get('http://127.0.0.1:8000/config');
        //         // setConfigs(response.data);
        //     } catch (error) {
        //         if (axios.isAxiosError(error) && error.response) {
        //             console.log(error.response.data.error);
        //         } else {
        //             console.log(error)
        //         }
        //     }
        // };

        const fetchConfigDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/config/66a6fee6251b21ea6b6920f9/details');
                setConfig(response.data);
                setAddGroup(false)
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data.error);
                } else {
                    console.log(error)
                }
            }
        };

        // fetchAllConfig();
        fetchConfigDetails();
    }, [addGroup]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleAddNewGroup = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/configs/${config?._id}/groups`, {
                name: newGroupName,
                udf_ids: []
            });

            if (response.status === 200) {
                handleClose()
                setAddGroup(true)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const data2 = ['Pabrik 1', 'Pabrik 2'];

    return (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ color: 'gold' }}>
                    {data2.map((factory, index) => (
                        <Tab key={index} label={factory} {...a11yProps(index)} />
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
                                {config?.groups.map((group, groupIndex) => (
                                    <Grid item xs={4} md={4} key={index}>
                                        <Box key={groupIndex} sx={{ mt: 2 }}>
                                            <Typography variant="subtitle1">{group.name}:</Typography>
                                            <Box sx={{ paddingLeft: '24px' }}>
                                                <Link component='button' onClick={() => router.push(`/report/configs/${config._id}/groups/${group.name}/udfs`)} sx={{ fontWeight: 'bold', mb: 1 }}>
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
                            <Link component='button' onClick={handleOpen} sx={{ fontWeight: 'bold', mt: 2 }}>
                                Add new Group
                            </Link>
                        </Paper>
                    </Box>
                </CustomTabPanel>
            ))}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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

        </Container>
    )
}