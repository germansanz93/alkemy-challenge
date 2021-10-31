export default {
  root: {
    // backgroundColor: "#683ab713",
    padding: "0 !important",
    height: "100%",
  },
  leftUsrPanel: {
    width: "100%",
    margin: "14px auto",
  },
  appbar: {
    backgroundColor: "#683ab7 !important",
  },
  link: {
    display: "flex",
    textDecoration: "none",
    color: "#444"
  },
  title: {
    margin: "auto",
    padding: "20px 0",
  },
  childs: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '1600px',
    margin: '0 auto',
    '& .formContainer': {
      display: 'none',
      border: '2px solid #683ab722',
      borderRadius: '5px',
      marginBottom: '10px',
      backgroundColor: '#fff',
    },
  },
  '@media (min-width: 780px)': {
    childs: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridGap: '10px 4vh',
      padding: '0 4vw',
      '& .formContainer': {
        margin: '0 auto 10px auto',
        padding: '0 10px',
        display: 'block',
        flexDirection: 'column',
        backgroundColor: '#683ab713',
        justifyContent: 'center',
        width: '96%',
        maxWidth: '520px',
        gridColumn: '1',
      },
      '& movementList': {
        gridColumn: '2',
      },
      '& pieChart': {

      }
    },
  },

};