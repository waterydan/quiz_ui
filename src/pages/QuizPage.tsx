import { Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

import { QuizApi } from '../api/QuizApi'
import { PageContainer } from '../components/layout/PageContainer'
import { QuizItem } from '../components/quiz/QuizItem'
import { Question } from '../models/entities/Question'

const httpClient = new QuizApi()

export const QuizPage = () => {
  const nav = useHistory()
  const [questions, setQuestions] = useState<Question[]>([])
  const [activeStep, setActiveStep] = React.useState(0)

  useEffect(() => {
    httpClient.getQuestions().then((res) => setQuestions(res.data))
  }, [])

  const handleUpdate = (question: Question) => {
    const index = questions.findIndex((q) => q.id === question.id)
    if (index !== -1) {
      let temporaryarray = questions.slice()
      temporaryarray[index] = question
      setQuestions(temporaryarray)
    }
  }

  const handleSubmit = async (question: Question) => {
    const res = await httpClient.registerAnswer({questionId: question.id, answer: question.userAnswer})
    handleUpdate(res.data)
  }

  const handleNext = async (values: Question) => {
    await handleSubmit(values)
    if (activeStep + 1 >= questions.length) {
      nav.push('/result')
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  if (questions.length === 0) {
    return null
  }

  return (
    <PageContainer>
      <Typography variant="h4">Star Wars Quiz</Typography>
      <Stepper activeStep={activeStep} alternativeLabel style={{}}>
        {questions.map((q, index) => (
          <Step key={q.id} style={{width: '100%'}}>
            <StepLabel>Question {index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <QuizItem
        key={questions[activeStep].id}
        question={questions[activeStep]}
        backDisabled={activeStep === 0}
        onBackCliecked={handleBack}
        onNextClicked={handleNext}
        last={activeStep === questions.length - 1}
      />
    </PageContainer>
  )
}
