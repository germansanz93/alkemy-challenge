import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import withStyles from "@mui/styles/withStyles";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import movements from './movementsSeed'
import styles from "./styles/MovementsListStyles";
import MovementForm from './MovementForm';
import FloatingActionBtn from './FloatingActionBtn'; 

class MovementsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: movements,
      hasMore: true,
      open: false,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = (e) => {
    e.preventDefault();
    this.setState({ open: false });
  }

  fetchMoreData = () => {
    if (this.state.items.length >= 30) {
      this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 500);
  };



  render() {
    const { classes, title } = this.props;
    return (
      <div className={classes.container}>
        <h3>{title}</h3>
        <hr />
        <InfiniteScroll
        className={classes.movementsListContainer}
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {this.state.items.map((mov) => (
            <div>
              <ListItem className={classes.ListItem} alignItems="center">
                <div className={mov.type == 1 ? classes.leftColorBarGreen : classes.leftColorBarRed}></div>
                <ListItemText
                  className={classes.listItemText}
                  primary={`$ ${mov.amount} - Category: ${mov.category}`}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {mov.date}
                      </Typography>
                      {` - ${mov.description}`}
                    </React.Fragment>
                  }
                />
                <IconButton aria-label="edit" onClick={this.handleOpen}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </InfiniteScroll>
        <div>
          {title == 'Movements' && <FloatingActionBtn onClick={this.handleOpen}/>}
          <MovementForm open={this.state.open} handleClose={this.handleClose} />
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(MovementsList);