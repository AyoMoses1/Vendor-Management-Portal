export const errorState = (setAlert, setSeverity, msg = 'Something went wrong while sending your request, please contact admin.', timeout = 5000) => {
  setSeverity('error')
  setAlert(msg)
  setTimeout(() => {
    setSeverity('')
    setAlert('')
  }, timeout);
}
