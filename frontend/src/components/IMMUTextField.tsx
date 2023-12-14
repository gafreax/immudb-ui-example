import { MutableRefObject, ReactElement } from 'react'
import { Grid, TextField } from '@mui/material'

interface IMMUTextFieldI {
  error: string | undefined,
  id: string,
  label: string,
  ref?: MutableRefObject<HTMLElement>,
  register: Function,
  required?: boolean
};

const IMMUTextField = ({ error, id, label, register, required }: IMMUTextFieldI): ReactElement => {
  const hasError = (error ?? '').length > 0
  return (
    <Grid item xs={12} sm={6}>
      <TextField
        sx={{ width: '100%' }}
        id={id}
        label={label}
        required={required}
        variant='outlined'
        error={hasError}
        helperText={error}
        {...register(id)}
      />
    </Grid>
  )
}

export default IMMUTextField
