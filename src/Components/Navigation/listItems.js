import React, { useState, useEffect } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Divider from '@mui/material/Divider';
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from '@mui/material/List';
import { Link } from 'react-router-dom';

function DisplaySchools({ selected, setSelected }) {
    const User = {
        name: 'Jay Nayon',
        email: 'jay.nayonjr@cit.edu',
        schools: [
            'Jaclupan ES',
            'Talisay ES'
        ]
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
    return (
        <React.Fragment>
            <ListItemButton sx={styles.button} onClick={handleClick} >
                <ListItemIcon sx={{ width: 'auto', minWidth: '40px' }}>
                    <SchoolIcon sx={styles.icon} />
                </ListItemIcon>
                <ListItemText
                    primary={"School"}
                    primaryTypographyProps={open ? styles.typography.school : styles.typography}
                />
                {open ? <ExpandLess sx={{ color: 'white' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit >
                <div style={{ display: 'flex' }}>
                    <VerticalLine width='60px' color='white' />
                    <List component="div" disablePadding>
                        {User.schools.map((item, index) => {
                            return (
                                <ListItemButton
                                    key={index}
                                    //component={Link}
                                    //to={index < 5 ? `/${item}` : '/'}
                                    sx={styles.button}
                                    value={item}
                                    selected={selected === item}
                                    onClick={() => { setSelected(item) }}
                                >
                                    <ListItemText
                                        primary={item}
                                        primaryTypographyProps={styles.typography} />
                                </ListItemButton>
                            )
                        })}
                    </List>
                </div>
            </Collapse>
        </React.Fragment>
    )
}

export function DisplayItems() {
    const list = ['dashboard', 'schools', 'people', 'settings', 'testing', 'logout'];
    const [selected, setSelected] = useState('dashboard');

    useEffect(() => {
        console.log(selected);
    }, [selected]);

    return (
        list.map((item, index) => (
            <React.Fragment>
                {index > 4 ? //Render divider after the Testing tab
                    <Divider sx={styles.divider.horizontal} />
                    : <></>}
                {
                    index === 1 ? <DisplaySchools selected={selected} setSelected={setSelected} /> :
                        <ListItemButton key={index}
                            component={Link}
                            to={index < 5 ? `/${item}` : '/'} //Logout route has not yet been implemented
                            selected={selected === item}
                            value={item}
                            onClick={() => { setSelected(item) }}
                            sx={styles.button}
                        >
                            <ListItemIcon sx={{ width: 'auto', minWidth: '40px' }}>
                                {index === 0 ? <DashboardIcon sx={styles.icon} /> :
                                    index === 2 ? <PeopleIcon sx={styles.icon} /> :
                                        index === 3 ? <SettingsIcon sx={styles.icon} /> :
                                            index === 4 ? <BarChartIcon sx={styles.icon} /> :
                                                index === 5 ? <LogoutIcon sx={styles.icon} /> :
                                                    null}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.charAt(0).toUpperCase() + item.slice(1)}
                                primaryTypographyProps={styles.typography}
                            />
                        </ListItemButton>
                }
            </React.Fragment>
        ))
    )
}

export const ProfileTab = ({ user }) => {
    const [selected, setSelected] = useState(false);
    const adjustSecondaryTypography = () => {
        // Define a threshold length for email after which font size will be reduced
        const thresholdLength = 10;

        // Check if email length exceeds the threshold
        if (user.email.length > thresholdLength) {
            return { ...styles.typography, fontSize: 10 }; // Adjust font size if email is too long
        }

        return { ...styles.typography, fontSize: 12 }; // Use default font size
    };

    return (
        <React.Fragment>
            <ListItemButton sx={{
                "&.Mui-selected": {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change to desired highlight color
                    borderRadius: '10px',
                },
                "& .MuiTouchRipple-root": {
                    color: 'white'
                }, padding: '5px'
            }} selected={selected}
                onClick={() => setSelected(!selected)}>
                <ListItemIcon sx={{ minWidth: '40px', width: '50px' }}>
                    <AccountCircleIcon sx={{
                        color: 'white',
                        fontSize: '35px',
                        width: '100%',
                    }} />
                </ListItemIcon>
                <ListItemText
                    primary={user.name}
                    secondary={user.email}
                    primaryTypographyProps={{ fontFamily: 'Mulish-Bold', color: 'white' }}
                    secondaryTypographyProps={adjustSecondaryTypography()} // Call the adjustSecondaryTypography function
                />
            </ListItemButton>
        </React.Fragment>
    );
};

function VerticalLine({ width, color = 'black' }) {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: width
        }}>
            <div style={{
                height: '100%',
                width: '1px',
                backgroundColor: color,
                margin: '0 auto'
            }} />
        </div>
    );
}

const styles = {
    icon: {
        color: 'white',
        fontSize: '19px',
        width: '50%',
    },
    typography: {
        school: {
            fontFamily: 'Mulish-Bold',
            color: 'white'
        },
        fontFamily: 'Mulish-Regular',
        color: 'white'
    },
    primary: {
        fontFamily: 'Mulish-Bold'
    },
    divider: {
        horizontal: {
            my: 1,
            bgcolor: 'white',
            marginRight: '15px',
            marginLeft: '15px'
        }
    },
    button: {
        "&.Mui-selected": {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Change to desired highlight color
            borderRadius: '10px',
        },
        "& .MuiTouchRipple-root": {
            color: 'white'
        },
        /*'&:hover, &.Mui-focusVisible': {
            backgroundColor: 'white'
        },*/
        marginRight: '5px',
        marginLeft: '5px',
        paddingTop: '5px',
        marginTop: '5px',
    }
}