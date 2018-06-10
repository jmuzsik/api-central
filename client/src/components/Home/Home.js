import React from "react"
import { withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"

import LatestHubble from "./LatestHubble"
import DailyNASA from "./DailyNASA"
import HomeText from "./HomeText"

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

class Home extends React.Component {
  state = {
    spacing: "16",
  }

  render() {
    const { classes } = this.props
    const { spacing } = this.state

    return (
      <Grid container className={classes.root} spacing={16}>
        <Grid item xs={12}>
          <HomeText />
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            justify="center"
            spacing={Number(spacing)}
          >
            <Grid key="Latest Hubble" xs={12} sm={6} item>
              <LatestHubble />
            </Grid>
            <Grid key="Daily NASA" xs={12} sm={6} item>
              <DailyNASA />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Home)
