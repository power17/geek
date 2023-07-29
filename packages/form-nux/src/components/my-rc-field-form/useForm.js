import { useRef } from 'react';

class FormStore {
  constructor () {
    this.store = {}
    this.callbacks = {};
    this.fieldEntities = []
  }

  registerFieldEntities = (entity) => {
    this.fieldEntities.push(entity);
  };

  setCallbacks = (callbacks) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };

  getFieldsValue = () => {
    return { ...this.store }
  }

  getFieldValue = (name) => {
    console.log(this)
    return this.store[name]
  }

  setFieldValue = (newStore) => {
    this.store = {
      ...this.store,
      ...newStore
    }
    console.log('this.store', this.store)
  }

  validate = () => {
    const err = []
    this.fieldEntities.forEach(fieldEntitie => {
      const { name, rules } = fieldEntitie
      const rule = rules[0]
      const value = this.getFieldValue(name)
      console.log('value', value, name)
      if (rule && rule.required && (value === undefined || value === '')) {
        err.push({ [name]: rule.message, value });
      }
    })

    return err
  }

  submit = () => {
    console.log('submit')
    const error = this.validate();
    const { onFinish, onFinishFailed } = this.callbacks;
    if (error.length === 0) {
      onFinish(this.getFieldsValue)
      console.log('finish')
    } else {
      console.log('fail')
      onFinishFailed(this.getFieldsValue)
    }
  }

  getForm () {
    return {
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      submit: this.submit,
      setCallbacks: this.setCallbacks,
      registerFieldEntities: this.registerFieldEntities
    }
  }
}
export default function useForm () {
  // 存值，在组件卸载之前指向的都是同一个值
  const formRef = useRef()
  console.log('formRef', formRef)
  if (!formRef.current) {
    const formStore = new FormStore()
    formRef.current = formStore.getForm()
  }

  return [formRef.current]
}
