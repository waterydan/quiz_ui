import { Button, createStyles, FormControl, FormLabel, makeStyles, Theme, Typography } from '@material-ui/core'
import { Field, FormikProvider, useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

import { Question, QuestionType } from '../../models/entities/Question'
import { RadioGroupInput } from '../form/RadioGroupInput'
import { TextInput } from '../form/TextInput'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginTop: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    actionsContainer: {
      marginBottom: theme.spacing(2),
    },
    resetContainer: {
      padding: theme.spacing(3),
    },
  }),
)

const validationSchema = yup.object({
  userAnswer: yup.string().required(),
})

interface IProps {
  question: Question
  backDisabled?: boolean
  last?: boolean
  onNextClicked?: (values: Question) => void
  onBackCliecked?: (values: Question) => void
}

export const QuizItem = (props: IProps) => {
  const classes = useStyles()

  const renderAnswerInput = () => {
    switch (props.question.type) {
      case QuestionType.SelectOne:
        return <RadioGroupInput fieldName="userAnswer" options={props.question.options.map((o) => ({value: o, label: o}))} />

      case QuestionType.Text:
        return <TextInput fieldName="userAnswer" variant="outlined" />

      default:
        // Should redirect user to error page. For simplicity this demo will just render error text
        return <div>ERROR!!</div>
    }
  }

  const formik = useFormik({
    initialValues: props.question,
    validationSchema,
    onSubmit: () => {
      props.onNextClicked && props.onNextClicked(formik.values)
    },
  })

  return (
    <FormikProvider value={formik}>
      <FormControl component="fieldset">
        <FormControl error={!formik.isValid}>
          <FormLabel>
            <Typography variant="h6">{props.question.topic}</Typography>
          </FormLabel>
        </FormControl>
        <Field name={props.question.id}>{() => <div>{renderAnswerInput()}</div>}</Field>
      </FormControl>
      <div className={classes.actionsContainer}>
        <div>
          <Button disabled={props.backDisabled} onClick={() => props.onBackCliecked && props.onBackCliecked(formik.values)} className={classes.button}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={() => formik.submitForm()} className={classes.button}>
            {props.last ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </FormikProvider>
  )
}
