import { Grid } from '@material-ui/core'
import React, { FC } from 'react'

export const PageContainer: FC = (props) => {
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{minHeight: '100vh'}}>
      <Grid item xs={10} md={5} style={{width: '100%'}}>
        {props.children}
      </Grid>
    </Grid>
  )
}
