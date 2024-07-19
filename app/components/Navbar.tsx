import { AppBar, Toolbar, Typography } from "@mui/material";

function Navbar() {
    return (
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Iperfect
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;