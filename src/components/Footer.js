import React from 'react';
import { Box, Typography, Paper, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
    return (
        <Box component="footer">
            {/* Search bar */}
            <Box sx={{textAlign:'center',mb:1,mt:4}}>
                <Paper component="form">
                    <IconButton aria-label="search">
                        {/* Add the search icon here */}
                        <SearchIcon />
                    </IconButton>
                    <InputBase placeholder="Find your branch..." />
                    <Button type="submit">Search</Button>
                </Paper>
            </Box>

            <Typography sx={{textAlign:'center'}}>
                © {new Date().getFullYear()} Personal Finance Assistant
            </Typography>

            {/* Social media icons */}
            {/* Instructions:
                - Add IconButtons for Facebook, Twitter, and Instagram.
                - Ensure each icon button links to the appropriate social media page.
                - Use the respective Material UI icons for Facebook, Twitter, and Instagram. */}
            <Box sx={{textAlign:'center'}}>
                {/* IconButton for Facebook */}
                <IconButton aria-label="Facebook"
                    href='https://www.facebook.com/CaixaBank/?locale=es_ES'
                    target='_blank'
                >
                    <FacebookIcon />
                </IconButton>
                {/* IconButton for Twitter */}
                <IconButton aria-label="Twitter"
                    href='https://x.com/caixabank?lang=en'
                    target='_blank'>
                    <TwitterIcon />
                </IconButton>
                {/* IconButton for Instagram */}
                <IconButton aria-label="Instagram"
                    href='https://www.instagram.com/caixabank/?hl=en'
                    target='_blank'>
                    <InstagramIcon />
                </IconButton>
                <IconButton aria-label="GitHub"
                    href='https://github.com/carlos123asd'
                    target='_blank'>
                    <GitHubIcon />
                </IconButton>
                <IconButton aria-label="LinkedIn"
                    href='https://www.linkedin.com/in/carlosmedinasalas/'
                    target='_blank'>
                    <LinkedInIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Footer;
