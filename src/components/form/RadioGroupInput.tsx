import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@material-ui/core'
import { Field, FieldProps } from 'formik'
import React from 'react'

interface IProps {
  fieldName: string
  options: {value: any; label: string}[]
}

export const RadioGroupInput = (props: IProps & RadioGroupProps) => (
  <Field name={props.fieldName}>
    {(fieldProps: FieldProps) => (
      <RadioGroup
        name={props.fieldName}
        value={fieldProps.form.values[props.fieldName] || ''}
        onChange={(e) => fieldProps.form.setFieldValue(props.fieldName, e.target.value)}>
        {props.options.map((o, index) => (
          <FormControlLabel key={index} value={o.value} control={<Radio />} label={o.label} />
        ))}
      </RadioGroup>
    )}
  </Field>
)
