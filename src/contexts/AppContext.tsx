import { CircularProgress, createStyles, makeStyles, Snackbar, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AxiosError } from 'axios'
import React, { FC, useEffect, useState } from 'react'

import { HttpClient } from '../libs/HttpClient'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      width: '100%',
      height: '100%',
      zIndex: 9999,
    },
  }),
)

interface IAppContext {
  loading?: boolean
}

const AppContext = React.createContext<IAppContext>({})

export const ApplicationContext: FC = (props) => {
  const [loading, setLoading] = useState(false)
  const [lastError, setLastError] = useState<AxiosError | null>(null)
  const classes = useStyles()

  useEffect(() => {
    const loadingSub = HttpClient.IsLoading.subscribe({
      next: (isLoading) => {
        setLoading(isLoading)
      },
    })
    const errorSub = HttpClient.Exceptions.subscribe({
      next: (err) => {
        setLastError(err)
      },
    })
    return () => {
      errorSub.unsubscribe()
      loadingSub.unsubscribe()
    }
  }, [])

  const handleWarningClose = () => {
    setLastError(null)
  }

  return (
    <AppContext.Provider value={{loading: loading}}>
      {props.children}
      {loading && (
        <div className={classes.overlay}>
          <CircularProgress />
        </div>
      )}
      <Snackbar open={!!lastError} autoHideDuration={6000} onClose={handleWarningClose}>
        <Alert onClose={handleWarningClose} severity="error">
          {lastError?.message}
        </Alert>
      </Snackbar>
    </AppContext.Provider>
  )
}

export const useAppContext = AppContext.Consumer
