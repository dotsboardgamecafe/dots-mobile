import React, { useMemo, useState } from 'react'
import Container from '../../components/container'
import { ScrollView } from 'react-native-gesture-handler'
import { Image, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { ArrowDown2, Lock } from 'iconsax-react-native'

import { LOGO } from '../../assets/images'
import { scaleWidth } from '../../utils/pixel.ratio'
import TextInput from '../../components/text-input'
import { ThemeType } from '../../models/theme'
import ActionButton from '../../components/action-button'
import { useNavigation } from '@react-navigation/native'
import createStyle from './styles'
import { useTranslation } from 'react-i18next'

const Register = (): React.ReactNode => {

  const theme = useTheme<ThemeType>()
  const navigation = useNavigation()
  const styles = createStyle(theme)
  const { t } = useTranslation()

  const [countryCode, setCountryCode] = useState('+62')

  const phonePrefix = useMemo(() => {
    return (
      <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>

        <Text style={styles.countryCode}>{countryCode}</Text>

        <ArrowDown2
          color={theme.colors.gray}
          size={scaleWidth(14)}
          style={styles.phonePrefixArrow}
        />

      </TouchableOpacity>
    )
  }, [countryCode])

  return (
    <Container>
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >

          <Image source={LOGO} style={styles.headerImage} />

          <Text style={styles.title}>
            {t('register-page.title')}
          </Text>

          <Text style={styles.mt8}>
            {t('register-page.subtitle')}
          </Text>

          <Text style={styles.nameLabel}>
            {t('register-page.name-label')}
          </Text>

          <TextInput
            containerStyle={styles.mt8}
            borderFocusColor={theme.colors.blueAccent}

            inputProps={{
              placeholder: t('register-page.name-hint'),
              placeholderTextColor: theme.colors.gray,
            }}
          />

          <Text style={styles.inputLabel}>
            {t('login-page.email-label')}
          </Text>

          <TextInput
            containerStyle={styles.mt8}
            borderFocusColor={theme.colors.blueAccent}

            inputProps={{
              placeholder: t('login-page.email-hint'),
              placeholderTextColor: theme.colors.gray,
            }}
          />

          <Text style={styles.inputLabel}>
            {t('register-page.phone-label')}
          </Text>

          <TextInput
            containerStyle={styles.mt8}
            borderFocusColor={theme.colors.blueAccent}

            prefix={phonePrefix}

            inputProps={{
              placeholder: t('register-page.phone-hint'),
              placeholderTextColor: theme.colors.gray,
            }}
          />


          <Text style={styles.inputLabel}>
            {t('login-page.password-label')}
          </Text>

          <TextInput
            containerStyle={styles.mt8}
            borderFocusColor={theme.colors.blueAccent}

            inputProps={{
              placeholder: t('login-page.password-hint'),
              placeholderTextColor: theme.colors.gray,
            }}

            suffix={<Lock
              variant='Bold'
              size={scaleWidth(16)}
              color={theme.colors.gray}
            />}
          />

          <Text style={styles.inputInfo}>
            {t('register-page.password-info')}
          </Text>

          <Text style={styles.inputLabel}>
            {t('register-page.confirm-password-label')}
          </Text>

          <TextInput
            containerStyle={styles.mt8}
            borderFocusColor={theme.colors.blueAccent}

            inputProps={{
              placeholder: t('register-page.confirm-password-hint'),
              placeholderTextColor: theme.colors.gray,
            }}

            suffix={<Lock
              variant='Bold'
              size={scaleWidth(16)}
              color={theme.colors.gray}
            />}
          />

          <Text style={styles.inputInfo}>
            {t('register-page.confirm-password-info')}
          </Text>

          <ActionButton
            style={styles.actionButton}
            onPress={() => { }}
            label={t('register-page.sign-up')}
          />

          <View style={styles.footer}>
            <View style={styles.footerContent}>
              <Text style={styles.loginInfo}>
                {t('register-page.have-account')}
              </Text>

              <TouchableOpacity
                style={styles.login}
                onPress={navigation.goBack}
              >
                <Text style={styles.loginContent}>
                  {t('register-page.sign-in')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  )
}

export default React.memo(Register)