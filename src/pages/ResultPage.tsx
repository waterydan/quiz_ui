import { createStyles, Divider, makeStyles, Theme, Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
  const [result, setResult] = useState<{score: number; unanswered: number}>({score: 0, unanswered: 0})
  const classes = useStyles()

  useEffect(() => {
    httpClient.getQuestions().then((res) => {
      const data = res.data
      setQuestions(data)
      setResult({score: data.filter((q) => q.isCorrect).length, unanswered: data.filter((q) => !q.userAnswer).length})
    })
  }, [])

  const renderScore = () => {
    return <Typography variant="h4">{`You scored: ${result.score} out of ${questions.length}`}</Typography>
  }

  const getGrade = () => {
    switch (true) {
      case result.score === 0:
        return 'Have you ever been to the Jedi academy?'

      case result.score <= questions.length / 2:
        return "Do or do not, there's no try."

      case result.score < questions.length:
        return "You've done well, young padawan."

      default:
        return 'The force is with you.'
    }
  }

  const hasUnanswered = questions.filter((q) => q.userAnswer).length !== questions.length

  return (
    <PageContainer>
      {hasUnanswered ? (
        <Typography variant="h4">
          You have not yet completed the quiz. <br />
          Click <Link to="/">here</Link> to go back.
        </Typography>
      ) : (
        <>
          <Typography variant="h5">{getGrade()}</Typography>
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
        </>
      )}
    </PageContainer>
  )
}
