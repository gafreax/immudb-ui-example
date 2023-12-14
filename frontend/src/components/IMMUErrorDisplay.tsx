import { Alert } from '@mui/material'
import { ReactElement } from 'react'

type IMMUErrorDisplayFunction = ({ error }: ({ error: string | undefined })) => ReactElement | null

const IMMUErrorDisplay: IMMUErrorDisplayFunction = ({ error }) => {
  const errorMessagge = error?.trim() ?? ''
  if (errorMessagge.length > 0) {
    return <Alert severity='error'>{errorMessagge}</Alert>
  }
  return null
}

export default IMMUErrorDisplay
