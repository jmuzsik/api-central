import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import React from 'react'
import Details from '@material-ui/icons/Details'

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2,
    fontFamily: "Menlo, Monaco, 'Courier New', monospace",
    display: 'block',
    whiteSpace: 'pre'
  },
  [theme.breakpoints.down('xs')]: {
    typography: {
      fontSize: '.4rem'
    }
  }
})

class SimplePopover extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      text: props.text
    }
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    })
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state

    return (
      <React.Fragment>
        <IconButton variant="contained" onClick={this.handleClick}>
          <Details />
        </IconButton>
        <Popover
          className={classes.rootPopover}
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
        >
          <Typography className={classes.typography}>
            {this.state.text}
          </Typography>
        </Popover>
      </React.Fragment>
    )
  }
}

SimplePopover.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(SimplePopover)
