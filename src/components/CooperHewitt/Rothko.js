import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import Popover from '../Reuseable/Popover'
import { robotRothkoCode } from '../../codeSnippets'

const styles = theme => ({
  rothko: {
    margin: 'auto'
  },
  pos: {
    borderRadius: 3
  },
  popover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    rothko: {
      width: '75%'
    }
  }
})

function Rothko(props) {
  const { classes, robotRothko } = props
  let [one, two, three] = [
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1,
    Math.floor(Math.random() * 10) + 1
  ]
  return (
    <React.Fragment>
      <Card
        className={classes.rothko}
        style={{ backgroundColor: robotRothko.background }}
      >
        <CardContent>
          <Typography
            className={classes.pos}
            style={{
              backgroundColor: robotRothko.palette1,
              color: 'rgba(0,0,0,0)',
              boxShadow: `1px 2px ${robotRothko.palette1}`,
              fontSize: `${one * 0.3}rem`,
              width: `${two * 10}%`,
              margin: `${three * .3}rem auto`
            }}
          >
            Word of the Day
          </Typography>
          <Typography
            className={classes.pos}
            style={{
              backgroundColor: robotRothko.palette2,
              color: 'rgba(0,0,0,0)',
              boxShadow: `1px 2px ${robotRothko.palette2}`,
              fontSize: `${two * 0.3}rem`,
              width: `${three * 10}%`,
              margin: `${one * .3}rem auto`
            }}
          >
            benev
          </Typography>
          <Typography
            className={classes.pos}
            style={{
              backgroundColor: robotRothko.palette3,
              color: 'rgba(0,0,0,0)',
              boxShadow: `1px 2px ${robotRothko.palette3}`,
              fontSize: `${three * 0.3}rem`,
              width: `${one * 10}%`,
              margin: `${two * .3}rem auto`
            }}
          >
            adjective
          </Typography>
        </CardContent>
      </Card>
      <div className={classes.popover}>
        Code Snippet: <Popover text={robotRothkoCode} />{' '}
      </div>
    </React.Fragment>
  )
}

Rothko.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Rothko)
