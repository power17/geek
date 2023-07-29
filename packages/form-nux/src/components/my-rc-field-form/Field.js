import React, { useContext, useLayoutEffect } from 'react'
import FieldContext from './FieldContext'

export default function Field (props) {
  const form = useContext(FieldContext)
  const { getFieldValue, setFieldValue, registerFieldEntities } = form;
  useLayoutEffect(() => {
    registerFieldEntities(props)
  }, [])
  const returnChildNode = React.cloneElement(props.children, {
    value: getFieldValue(props.name),
    onChange: (e) => {
      console.log(123213)
      const newValue = e.target.value
      setFieldValue({ [props.name]: newValue });
    }
  })
  return returnChildNode
}
