import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center"
  },
  headline: {
    fontWeight: "1000",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
})

function HomeText(props) {
  const { classes } = props
  return (
    <Grid className={classes.root}>
      <Typography
        className={classes.headline}
        variant="headline"
        align="center"
        gutterBottom={true}
      >
        Welcome to API Central!
      </Typography>
      <Typography>The best part of many REST API's at your disposal.</Typography>
    </Grid>
  )
}

HomeText.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(HomeText)
