import { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Grid, Paper, Snackbar, ToggleButton, ToggleButtonGroup } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import IMMUSurface from '../components/IMMUSurface'
import IMMUTextField from '../components/IMMUTextField'
import { BACKEND_URL } from '../config'
import axios from 'axios'

interface FormValues {
  accountingType: string
  name: string
  amount: number
  iban: string
  address: string
}

const validationSchema = yup.object({
  name: yup.string().required().max(32),
  amount: yup.number().required(),
  iban: yup.string().required().max(27), // .matches(/^([A-Z]){2}([0-9a-zA-Z]\s?){20}$/g),
  address: yup.string().required().max(128),
  accountingType: yup.string().required()
})

const Add = (): ReactElement => {
  const [type, setType] = useState('sending')
  const [error, setError] = useState('')
  const [alert, setAlert] = useState<string | undefined>(undefined)

  const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    setValue('accountingType', 'sending')
  }, [])

  useEffect(() => {
    reset()
  }, [alert])


  const onSubmit = (values: FormValues): void => {
    const sendData = async (): Promise<void> => {
      try {
        await axios.post<FormValues>(`${BACKEND_URL}/add`, JSON.stringify(values), {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-immudb-ui': 'xxx' // simple key
          }
        })
        setAlert(`movement ${values.accountingType === 'receiving' ? 'to' : 'from'} ${values.name} registered`)
      } catch (error) {
        setError((error as Error).message)
      }
    }
    sendData()
  }

  const handleTypeSwitch = (_event: React.MouseEvent<HTMLElement>, value: string): void => {
    setValue('accountingType', value)
    setType(value)
  }

  return (
    <IMMUSurface title='Add accountings' error={error}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={4}>
          <IMMUTextField id='name' label='Name' register={register} error={errors.name?.message} />
          <IMMUTextField id='amount' label='Amount' register={register} error={errors.amount?.message} />
          <IMMUTextField id='iban' label='IBAN' register={register} error={errors.iban?.message} />
          <IMMUTextField id='address' label='Address' register={register} error={errors.address?.message} />
          <Grid item xs={12} sm={6}>
            <Paper elevation={0}>
              <ToggleButtonGroup exclusive color='primary' onChange={handleTypeSwitch} value={type}>
                <ToggleButton value='sending'>sending</ToggleButton>
                <ToggleButton value='receiving'>receiving</ToggleButton>
              </ToggleButtonGroup>
              <h1>{type}</h1>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button variant='contained' startIcon={<AddIcon />} type='submit'>Add</Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!alert}
        onClose={() => setAlert(undefined)}
        autoHideDuration={3000}
      >
        <Alert severity='success' sx={{ width: '100%', fontSize: 'large' }}>
          <strong>{alert}</strong>
        </Alert>
      </Snackbar>
    </IMMUSurface>
  )
}

export default Add
