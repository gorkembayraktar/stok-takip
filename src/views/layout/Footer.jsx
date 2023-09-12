
import { Container } from "@mui/system";
import { useSelector, useDispatch } from 'react-redux';
import {
    switchTheme,
    selectTheme
  } from '../../features/theme/ThemeSlice'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useTranslation } from "react-i18next";

//import { version as v1 } from '../../../package.json'

import packageInfo from '../../../package.json'


import Typography from '@mui/material/Typography';

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
  }));

const Footer = () =>{

    const theme = useSelector(selectTheme);


    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(switchTheme(theme == 'dark' ? 'light' : 'dark'))
    };

    const {t} = useTranslation()
    return (
        <footer style={{padding:'16px', background: "#2E3B55", color: "#fff", marginTop:30}} >
            <Container> 
                <Typography
                      noWrap
                      href="/"
                      sx={{
                      mr: 2,
                      ml:1,
                      fontFamily: 'monospace',
                      color: 'inherit',
                      textDecoration: 'none',
                      }}
                  >
                      Stok Takip programı { packageInfo.version }
                  </Typography>
            </Container>
        </footer>
    );
}


export default Footer;