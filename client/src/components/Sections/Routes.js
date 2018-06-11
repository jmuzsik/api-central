import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"

import About from "../Sections/About"
import Home from "../Home/Home"
import CooperHewitt from "../Sections/CooperHewitt/CooperHewitt"
import Words from "../Sections/Words/Words"

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
  },
})
class Routes extends Component {
  render() {
    const { classes } = this.props
    return (
      <main className={classes.content}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/cooper-hewitt" component={CooperHewitt} />
          <Route exact path="/words" component={Words} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Routes))
