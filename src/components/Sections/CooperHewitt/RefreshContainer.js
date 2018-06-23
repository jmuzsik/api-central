import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    margin: theme.spacing.unit
  },
  title: {
    textAlign: "center"
  }
})

function RefreshContainer(props) {
  const { classes, handleClick } = props
  return (
    <React.Fragment>
      <div className={classes.title}>
        <Typography>Refresh Data</Typography>
      </div>
      <div className={classes.container}>
        <Button
          value="random-object"
          onClick={e => handleClick(e, "random-object")}
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Object
        </Button>
        <Button
          value="rothko"
          onClick={e => handleClick(e, "rothko")}
          variant="outlined"
          className={classes.button}
        >
          Rothko
        </Button>
        <Button
          value="random-video"
          onClick={e => handleClick(e, "random-video")}
          variant="outlined"
          color="secondary"
          className={classes.button}
        >
          Video
        </Button>
      </div>
    </React.Fragment>
  )
}

RefreshContainer.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RefreshContainer)
