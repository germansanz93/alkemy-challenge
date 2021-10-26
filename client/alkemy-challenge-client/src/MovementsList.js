import * as React from 'react';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList } from 'react-window';
import withStyles from '@mui/styles/withStyles';
import { AutoSizer } from 'react-virtualized'

import styles from './styles/MovementsListStyles';
import 'react-virtualized/styles.css'; 


function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  );
}

function MovementsList(props) {
  const { classes } = props;

  return (
    <div className={classes.movementsListContainer}>
    <AutoSizer>
      {({ width, height}) => (
        console.log(width, height),
        <Box
          sx={{ width: width, bgcolor: 'background.paper' }}
        >
          <FixedSizeList
            height={height}
            width={width}
            itemSize={46}
            itemCount={100}
            overscanCount={5}
          >
            {renderRow}
          </FixedSizeList>
        </Box>
      )}
    </AutoSizer>
    </div>
  );
}

export default withStyles(styles)(MovementsList);