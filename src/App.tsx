import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { ApplicationContext } from './contexts/AppContext'
import { QuizPage } from './pages/QuizPage'
import { ResultPage } from './pages/ResultPage'

function App() {
  return (
    <ApplicationContext>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <QuizPage />
          </Route>
          <Route path="/result" exact>
            <ResultPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApplicationContext>
  )
}

export default App
