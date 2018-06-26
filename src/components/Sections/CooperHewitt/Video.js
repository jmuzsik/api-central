import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Popover from '../../Reuseable/Popover'
import { randomVideoCode } from '../../../codeSnippets'

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'
  },
  video: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%' // 16:9
  },
  popover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    video: {
      maxWidth: 600
    }
  },
  [theme.breakpoints.up('md')]: {
    video: {
      maxWidth: 900
    }
  }
})

function RandomVideo(props) {
  const { classes, randomVideo } = props
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <video controls className={classes.video} src={randomVideo.video}>
          Sorry, your browser doesn't support embedded videos, please use the
          link below.
        </video>{' '}
        <CardContent>
          <Typography component="p">{randomVideo.description}</Typography>
        </CardContent>
        <CardActions>
          <a rel="noopener noreferrer" href={randomVideo.video} target="_blank">
            <Button size="small" color="primary">
              Video
            </Button>
          </a>
        </CardActions>
        <div className={classes.popover}>
          Code Snippet: <Popover text={randomVideoCode} />{' '}
        </div>
      </Card>
    </div>
  )
}

RandomVideo.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RandomVideo)
