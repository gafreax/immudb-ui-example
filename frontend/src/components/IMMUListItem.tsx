import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ReactElement } from 'react'

interface IMMUListItemsI {
  children: React.ReactNode
  link: string
  text: string
}

type IMMUListItemsFunction = ({ children, link, text }: IMMUListItemsI) => ReactElement

const IMMUListItems: IMMUListItemsFunction = ({ children, link, text }) => {
  return (
    <ListItem>
      <ListItemButton component='a' href={link}>
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  )
}

export default IMMUListItems
