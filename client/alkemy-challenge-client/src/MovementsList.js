import React, { Children } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import withStyles from "@mui/styles/withStyles";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

import movements from './movementsSeed'
import styles from "./styles/MovementsListStyles";
import ModalForm from './ModalForm';
import FloatingActionBtn from './FloatingActionBtn';

class MovementsList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: movements,
      hasMore: true,
      open: false,
      movement: null,
    }
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = (movement) => {
    if (movement) {
      this.setState({
        open: true,
        movement: movement
      });
    } else {
      this.setState({
        open: true,
        movement: null
      })
    }
  }
  handleClose = (e) => {
    e && e.preventDefault();
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
    const { classes, title, movements, loading, addMovement, editMovement, deleteMovement, categories } = this.props;
    if (loading) {
      return <div>Loading...</div>;
    }
    return (
      <div className={`${classes.container} ${classes.card} movementList`}>
        <h3 className={classes.cardTitle}>{title}</h3>
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
          {movements.map((mov) => (
            <div>
              <ListItem className={classes.ListItem} alignItems="center">
                <div className={mov.mov_type_id == 1 ? classes.leftColorBarGreen : classes.leftColorBarRed}></div>
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
                        {mov.mov_date.substring(0, 10)}
                      </Typography>
                      {` - ${mov.mov_description}`}
                    </React.Fragment>
                  }
                />
                <IconButton aria-label="edit" onClick={() => this.handleOpen(mov)}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => deleteMovement(mov.id)}>
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </ListItem>
              <Divider />
            </div>
          ))}
        </InfiniteScroll>
        <div>
          <FloatingActionBtn title={title} onClick={() => this.handleOpen(false)}/>
          <ModalForm
            open={this.state.open}
            handleClose={this.handleClose}
            addMovement={addMovement}
            editMovement={editMovement}
            categories={categories}
            movement={this.state.movement}
          />
        </div>
      </div>
    );
  }
}


export default withStyles(styles)(MovementsList);