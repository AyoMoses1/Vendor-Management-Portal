import '../fake-db'
import '../styles/_app.scss'
import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import MatxTheme from './MatxLayout/MatxTheme/MatxTheme'
import AppContext from './appContext'
import history from 'history.js'
import { DialogProvider } from 'muibox'

import routes from './RootRoutes'
import { Store } from './redux/Store'
import Auth from './auth/Auth'
import MatxLayout from './MatxLayout/MatxLayout'
import AuthGuard from './auth/AuthGuard'
import { useIdleTimer } from 'react-idle-timer'
import AuthAlert from './components/AuthAlert'
import { logoutUser } from './redux/actions/UserActions'
import { useDispatch } from 'react-redux'


const App = () => {
  const dispatch = useDispatch()


  const timeout = 1000 * 3  * 30
  const promptTimeout = 1000 * 30

  const [isOpen, setIsOpen] = React.useState(false)
  


  
  const [remaining, setRemaining] = React.useState(0)

  const onPrompt = () => {
    setIsOpen(true)
    setRemaining(promptTimeout)
  }

  const onIdle = () => {
    setIsOpen(false)
    setRemaining(0)
    logoutUser()(dispatch)

  }

  const onActive = () => {
    setIsOpen(false)
    setRemaining(0)
  }


  const { getRemainingTime, isPrompted, activate } = useIdleTimer({
    timeout,
    promptTimeout,
    onPrompt,
    onIdle,
    onActive
  })

  const handleStillHere = () => {
    setIsOpen(false)
    activate()
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (isPrompted()) {
        setRemaining(Math.ceil(getRemainingTime() / 1000))
      }
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [getRemainingTime, isPrompted])




  return (
    <AppContext.Provider value={{ routes }}>
    {/* <Provider store={Store}> */}
        <MatxTheme>
          <Auth>
            <DialogProvider>
              <Router history={history}>
                <AuthGuard>
                <AuthAlert
                    isOpen={isOpen}
                    remaining = {remaining}
                    onClick = {handleStillHere}
                    logout = {onIdle}
                  />
                  <MatxLayout />
                </AuthGuard>
              </Router>
            </DialogProvider>
          </Auth>
        </MatxTheme>
      {/* </Provider>      */}
    </AppContext.Provider>
  )
}

export default App
