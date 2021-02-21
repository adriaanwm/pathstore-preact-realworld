import { store } from '/store'

export const TextArea = ({ name, formName, ...props }) => {
  const [value, setValue] = store.use(['forms', formName, 'values', name])
  return <textarea
    type='text'
    onInput={ev => {
      ev.preventDefault()
      setValue(ev.target.value)
    }}
    {...props}
  >{value}</textarea>
}
