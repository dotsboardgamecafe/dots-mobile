import React from 'react'
import { ViewProps } from 'react-native'
import { Button, Text } from 'react-native-paper'
import Container from '../../components/container'
import useStorage from '../../hooks/useStorage'

const Filler = ({ id }: ViewProps) => {
  const { onSetLogout } = useStorage()

  return (
    <Container contentStyle={{ justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontWeight: 'bold' }}>{id}</Text>
      <Button onPress={onSetLogout}>Logout</Button>
    </Container>
  )
}

export default React.memo(Filler)