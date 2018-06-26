import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import yellow from '@material-ui/core/colors/yellow'

const styles = {
  progress: {
    margin: 'auto'
  },
  progressContainer: {
    height: '90vh',
    display: 'flex',
    justifyContent: 'center'
  }
}
function Loading(props) {
  const { classes } = props
  return (
    <div className={classes.progressContainer}>
      <CircularProgress
        className={classes.progress}
        style={{ color: yellow[500] }}
        thickness={10}
      />
    </div>
  )
}

export default withStyles(styles)(Loading)
