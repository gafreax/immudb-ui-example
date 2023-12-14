import { Container, Paper, Stack } from '@mui/material'
import IMMUHeader from './IMMUHeader'
import IMMUErrorDisplay from './IMMUErrorDisplay'
import { ReactElement } from 'react'

interface IMMUSurfaceI {
  children: React.ReactNode
  error?: string
  title: string
}

type IMMUSurfaceFunction = ({ title, error, children }: IMMUSurfaceI) => ReactElement

const IMMUSurface: IMMUSurfaceFunction = ({ title, error, children }) => {
  return (
    <Paper component={Stack} margin={4} padding={2}>
      <IMMUHeader title={title} />
      <Container sx={{ margin: '18px' }}>{children}</Container>
      <IMMUErrorDisplay error={error} />
    </Paper>
  )
}
export default IMMUSurface
