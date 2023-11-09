export default validationFirebase = (error: any) => {
  if (error.code === 'auth/email-already-in-use') throw new Error('Email already in use')
  if (error.code === 'auth/invalid-email') throw new Error('Invalid email')
  if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
  if (error.code === 'auth/invalid-password') throw new Error('Invalid password')
}
