import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    margin: `${theme.spacing.unit * 3}px auto`
  }),
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    root: {
      width: '75%'
    }
  },
  [theme.breakpoints.up('md')]: {
    root: {
      width: '50%'
    }
  }
})

function Poem(props) {
  const { classes, poem } = props
  const title = poem[0]
  const actualPoem = poem.slice(1)
  return (
    <React.Fragment>
      <Paper className={classes.root} elevation={4}>
        <Typography align="center" variant="headline" gutterBottom>
          <i>{title}</i>
        </Typography>
        <div className={classes.container}>
          {actualPoem.map((line, index) => (
            <Typography key={`${line}-index`} component="p">
              {line}
            </Typography>
          ))}
        </div>
      </Paper>
    </React.Fragment>
  )
}

Poem.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Poem)
