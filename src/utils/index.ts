import { email } from 'regExp/email'

export const isEmail = (text: string) => email.test(text)