export default {
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '470px',
    margin: '0 auto',
  },

  summariesContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  recentsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },

  card: {
    border: '2px solid #683ab722',
    borderRadius: '5px',
    marginBottom: '10px',
    backgroundColor: '#fff',
  },
  cardTitle: {
    color: '#683ab7',
    marginLeft: '10px',
  },
  '@media (min-width: 780px)': {
    mainContainer: {
      maxWidth: '1042px',
      padding: '0 4vw'
    },
    cardsContainer: {
      display: 'grid',
      gridTemplate: '"left1 right""left2 right""left3 right"',
      gridGap: '10px 4vw',
    },
    balance: {
      gridArea: 'left1',
    },
    summariesContainer: {
      gridArea: 'left2',
    },
    barsContainer: {
      gridArea: 'left3',
    },
    recentsContainer: {
      gridArea: "right",
    }
  },
  '@media (min-width: 1440px)': {
    mainContainer:{
      maxWidth: '1600px',
    },
    cardsContainer:{
      gridTemplate: '"topR topL" "bottomR bottomL"',
      gridTemplateColumns: '3fr 1fr',
    },
    balance: {
      gridArea: 'topL',
    },
    summariesContainer: {
      gridArea: 'topR',
    },
    innerSummaries: {
      display: 'flex',
      justifyContent: 'space-between',
    },

    barsContainer: {
      gridArea: 'bottomR',
    },
    recentsContainer: {
      gridArea: "bottomL",
    }
  }
}