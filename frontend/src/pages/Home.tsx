import { List } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import AddIcon from '@mui/icons-material/Add'
import IMMUSurface from '../components/IMMUSurface'
import IMMUListItem from '../components/IMMUListItem'
import { ReactElement } from 'react'

const Home = (): ReactElement => {
  return (
    <IMMUSurface title='Immudb UI'>
      <List sx={{ maxWidth: '400px' }}>
        <IMMUListItem text='Accountings' link='/accountings'>
          <AccountBalanceIcon />
        </IMMUListItem>
        <IMMUListItem text='Add movements' link='/add'>
          <AddIcon />
        </IMMUListItem>
      </List>
    </IMMUSurface>
  )
}

export default Home
