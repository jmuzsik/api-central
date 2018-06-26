import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Popover from '../../Reuseable/Popover'
import { randomObjectCode } from '../../../codeSnippets'

const styles = {
  media: {
    height: 0,
    paddingTop: '100%' // 16:9
  },
  popover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}

function RandomObject(props) {
  const { classes, randomObject } = props
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={randomObject.image}
          title={randomObject.title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline">
            {randomObject.title} - <small>{randomObject.date}</small>
          </Typography>
          <Typography component="p">{randomObject.description}</Typography>
        </CardContent>
        <CardActions>
          <a rel="noopener noreferrer" href={randomObject.url} target="_blank">
            <Button size="small" color="primary">
              Visit
            </Button>
          </a>
        </CardActions>
        <div className={classes.popover}>
          Code Snippet: <Popover text={randomObjectCode} />{' '}
        </div>
      </Card>
    </div>
  )
}

RandomObject.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RandomObject)
