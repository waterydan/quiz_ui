import { createStyles, Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import React, { useEffect, useState } from 'react'

import { QuizApi } from '../api/QuizApi'
import { PageContainer } from '../components/layout/PageContainer'
import { Question } from '../models/entities/Question'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
    },
    icon: {
      verticalAlign: 'middle',
      marginRight: theme.spacing(1),
    },
  }),
)

const httpClient = new QuizApi()

export const ResultPage = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const classes = useStyles()

  useEffect(() => {
    httpClient.getQuestions().then((res) => {
      setQuestions(res.data)
    })
  }, [])

  const renderScore = () => {
    const score = questions.filter((q) => q.isCorrect).length
    return <Typography variant="h4">{`You scored: ${score} out of ${questions.length}`}</Typography>
  }

  return (
    <PageContainer>
      <Typography variant="h5">Thank you for participating.</Typography>
      {renderScore()}
      <Divider className={classes.divider} />
      {questions.map((q, index) => (
        <React.Fragment key={index}>
          <Typography>{q.topic}</Typography>
          <Typography>
            <span className={classes.icon}>{q.isCorrect ? <CheckCircleIcon style={{color: '#6ade05'}} /> : <CancelIcon style={{color: '#ff002f'}} />}</span>
            <span>{q.userAnswer}</span>
          </Typography>
          {index < questions.length - 1 && <br />}
        </React.Fragment>
      ))}
    </PageContainer>
  )
}
