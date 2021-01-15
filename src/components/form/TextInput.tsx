import { TextField, TextFieldProps } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import _ from 'lodash'
import React from 'react'

interface IProps {
  fieldName: string
}

export const TextInput = (props: IProps & TextFieldProps) => (
  <Field name={props.fieldName}>
    {(fieldProps: FieldProps) => (
      <TextField
        {..._.omit(props, 'fieldName')}
        onChange={(e) => fieldProps.form.setFieldValue(props.fieldName, e.target.value)}
        value={fieldProps.field.value || ''}
      />
    )}
  </Field>
)
