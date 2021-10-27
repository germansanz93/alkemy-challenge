import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import withStyles from '@mui/styles/withStyles';
import { AutoSizer } from 'react-virtualized'
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';


import styles from './styles/MovementsListStyles';
import 'react-virtualized/styles.css';


import movements from './movementsSeed';

function MovementsList(props) {
  const { classes } = props;

  return (
    <div className={classes.movementsListContainer}>
      <AutoSizer>
        {({ width, height }) => (
          <Box
            sx={{ width: width, bgcolor: 'background.paper' }}
          >
            <FixedSizeList
              height={height}
              width={width}
              itemSize={46}
              itemCount={movements.length}
              overscanCount={5}
            >
              {() => movements.map(mov => (
                <div>
                  <ListItem className={classes.ListItem} alignItems="flex-start">
                    <div className={mov.type == 1 ? classes.leftColorBarGreen : classes.leftColorBarRed}></div>
                    <ListItemText
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
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </FixedSizeList>
          </Box>
        )}
      </AutoSizer>
    </div>
  );
}

export default withStyles(styles)(MovementsList);