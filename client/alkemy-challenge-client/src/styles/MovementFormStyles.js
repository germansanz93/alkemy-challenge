export default {
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100vw',
    height: '100vh',
    backgroundColor: '#f4f0fa',
    boxShadow: 24,
  },
  modalForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputField: {
    border: 'none',
    color: '#444',
    fontSize: '16px',
    padding: '10px',
  },
  formInputLabel:{
    color: '#444',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px 0 10px',
    '& p': {
      paddingLeft: '10px',
    }
  },
  typeRadioBtns: {
    display: 'flex',
    backgroundColor: '#fff',
    padding: '10px',
    justifyContent: 'space-around',
    alignItems: 'center',
    '& div':{
      display: 'flex',
      alignItems: 'self-start',
    }
  },
  btnsContainer: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  submitBtn: {
    backgroundColor: '#683ab7',
    border: 'none',
    color: '#fff',
    padding: '10px 30px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '2px',
    '&:hover': {
      backgroundColor: '#5a5a5a',
    }
  },
  backBtn: {
    backgroundColor: '#5a5a5a',
    border: 'none',
    color: '#fff',
    padding: '10px 30px',
    borderRadius: '5px',
    fontSize: '16px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    letterSpacing: '2px',
    '&:hover': {
      backgroundColor: '#9a1811',
    }
  }
}