import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import styled from '@emotion/styled'

import ImmudbLogoImage from '../assets/immudb-logo.png'
import { ReactElement } from 'react'

interface IMMUBreadcrumbsI { title: string };

const ImmudbLogo = styled.img`
    max-height: 34px;
    margin: 8px;
    margin-left: 24px;
`

// todo: read why can be better to mark ReadOnly (i think for something about immutable things)
const IMMUHeader = ({ title }: Readonly<IMMUBreadcrumbsI>): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1, marginBottom: '32px' }}>
      <AppBar position='static'>
        <Toolbar>
          <ImmudbLogo src={ImmudbLogoImage} title={title} />
          <Box component='div' sx={{ display: 'flex', flexGrow: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Typography variant='h6' component='a' sx={{ maxHeight: '34px', textAlign: 'center', textDecoration: 'none', textTransform: 'uppercase' }} href='/'>
              <HomeIcon sx={{ margin: '0 auto', display: { xs: 'block', sm: 'none' } }} />
              <Button color='inherit' sx={{ display: { xs: 'none', sm: 'block' } }}>home</Button>
            </Typography>
            <Button variant='outlined' color='inherit' sx={{ display: { xs: 'none', sm: 'block' } }} disabled>{title}</Button>
          </Box>
          <Button color='inherit'>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default IMMUHeader
