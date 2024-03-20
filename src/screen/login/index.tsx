import React, { useMemo, useState } from "react"
import { View, Image, TouchableOpacity } from "react-native"
import { Text, useTheme } from "react-native-paper"
import { Eye, EyeSlash, IconProps, Lock, Sms } from "iconsax-react-native"
import { scaleWidth } from "../../utils/pixel.ratio"

import Container from "../../components/container"
import { LOGO } from "../../assets/images"
import TextInput from "../../components/text-input"
import useStorage from "../../hooks/useStorage"
import { ThemeType } from "../../models/theme"
import ActionButton from "../../components/action-button"
import styles from "./styles"

const Login = (): React.ReactNode => {
  const { onSetLogin } = useStorage()
  const theme = useTheme<ThemeType>()

  const [showPass, setShowPass] = useState(false)

  const passSuffix = useMemo(() => {
    const props: IconProps = {
      variant: "Bold",
      size: scaleWidth(16),
      color: theme.colors.gray,
      onPress: () => setShowPass(!showPass)
    }

    if (showPass) return <Eye {...props} />

    return <EyeSlash {...props} />
  }, [showPass])

  return (
    <Container contentStyle={styles.container}>

      <Image source={LOGO} style={styles.headerImage} />

      <Text style={styles.headerTitle}>Log In to Your Account</Text>

      <Text style={styles.emailLabel}>Email</Text>

      <TextInput
        containerStyle={styles.input}
        borderFocusColor={theme.colors.blueAccent}

        prefix={<Sms
          variant="Bold"
          size={scaleWidth(16)}
          color={theme.colors.gray}
        />}

        inputProps={{
          placeholder: 'Enter your email address',
          placeholderTextColor: theme.colors.gray,
          keyboardType: 'email-address'
        }}
      />

      <Text style={styles.passwordLabel}>Password</Text>

      <TextInput
        containerStyle={styles.input}
        borderFocusColor={theme.colors.blueAccent}

        prefix={<Lock
          variant="Bold"
          size={scaleWidth(16)}
          color={theme.colors.gray}
        />}

        suffix={passSuffix}

        inputProps={{
          placeholder: 'Enter your password',
          placeholderTextColor: theme.colors.gray,
          keyboardType: 'default',
          secureTextEntry: !showPass
        }}
      />

      <Text style={styles.forgotLabel}>Forgot the Password?</Text>

      <ActionButton
        style={styles.actionButton}
        onPress={onSetLogin}
        label='Sign In'
      />

      <View style={styles.footer}>
        <View style={styles.registerContainer}>
          <Text style={styles.registerInfo}>Do not have an account?</Text>

          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerLabel}>Sign Up Here</Text>
          </TouchableOpacity>
        </View>
      </View>

    </Container>
  )
}

export default React.memo(Login)