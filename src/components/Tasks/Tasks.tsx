import React from 'react'
import Content from '../../helpers/Content'
import InputField from '../../hooks/InputField'
import ToDos from './ToDos'

const Tasks: React.FC = () => {
  return (
    <Content title='Tasks'>
      <InputField />
      <ToDos />
    </Content>
  )
}

export default Tasks