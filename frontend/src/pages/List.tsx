import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { Dispatch, ReactElement, useMemo, useState } from 'react'
import TrendingDownIcon from '@mui/icons-material/TrendingDown'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

import axios from 'axios'

import IMMUSurface from '../components/IMMUSurface'
import { BACKEND_URL } from '../config'
import type { AccountingFields } from '../types.d.ts'
import { AccountingType } from '../enum.ts'
import styled from '@emotion/styled'

interface ListResponse {
  data: AccountingFields[]
}

interface FetchDataI {
  setError: Dispatch<React.SetStateAction<string>>
  setData: Dispatch<React.SetStateAction<AccountingFields[] | undefined>>
}

const TypeChip = ({ type }: { type: AccountingType }): ReactElement => {
  if (type === AccountingType.receiving) {
    return <Typography component="span"> <TrendingUpIcon /> receiving </Typography>
  }
  return <Typography component="span"> <TrendingDownIcon /> sending </Typography>
}

const HeadCell = styled(TableCell)`
  font-weight: bolder;
  font-size: larger;
`
const BodyCell = styled(TableCell)`
  font-size: large;
`
const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: 'lightgrey',
  },
})

const fetchData = async ({ setError, setData }: FetchDataI): Promise<void> => {
  try {
    const { data } = await axios.get<undefined, ListResponse>(`${BACKEND_URL}/list`, {
      headers: { 'x-immudb-ui': 'xxx' } // todo: update value
    })
    const dataFetched = data?.filter(i => i)
    console.dir(dataFetched)
    setData(dataFetched)
  } catch (error) {
    setError((error as Error).message)
  }
}

const List = (): ReactElement => {
  const [data, setData] = useState<AccountingFields[]>()
  const [filtered, setFiltered] = useState<AccountingFields[]>()
  const [filter, setFilter] = useState<AccountingType | undefined>(undefined)
  const [error, setError] = useState('')

  useMemo((): void => {
    fetchData({ setData, setError })
  }, [])

  useMemo((): void => {
    console.log("filter")
    setFiltered(data?.filter(i => filter === undefined || (i.accountingType as AccountingType) === filter))
  }, [filter, data])

  const handleFilterSwitch = (_event: React.MouseEvent<HTMLElement>, value: AccountingType) => {
    setFilter(value === null ? undefined : value)
  }

  return (
    <IMMUSurface error={error} title='Accountings List'>
      <Grid item xs={12} sm={6} m={3}>
        <Paper elevation={0}>
          <ToggleButtonGroup exclusive color='primary' onChange={handleFilterSwitch} value={filter}>
            <ToggleButton value={AccountingType.sending}>sending</ToggleButton>
            <ToggleButton value={AccountingType.receiving}>receiving</ToggleButton>
          </ToggleButtonGroup>
        </Paper>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow sx={{ fontWeight: 'bolder', fontSize: 'large' }}>
              <HeadCell>Name</HeadCell>
              <HeadCell>Type</HeadCell>
              <HeadCell>Address</HeadCell>
              <HeadCell>Amount</HeadCell>
              <HeadCell>IBAN</HeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered?.map((row, index) => (
              <StyledTableRow key={`${row.name}-${index}`}>
                <BodyCell sx={{ fontWeight: 'bold' }}>{row.name}</BodyCell>
                <BodyCell><TypeChip type={row.accountingType} /></BodyCell>
                <BodyCell>{row.address}</BodyCell>
                <BodyCell>{row.amount}</BodyCell>
                <BodyCell>{row.iban}</BodyCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </IMMUSurface>
  )
}

export default List
