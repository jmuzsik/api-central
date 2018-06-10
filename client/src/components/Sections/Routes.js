import React, { Component } from "react"
import { Route, Switch } from "react-router-dom"
import { withStyles } from "@material-ui/core/styles"
import { withRouter } from "react-router-dom"

import About from "../Sections/About"
import Home from "../Home/Home"

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: "3rem",
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
        </Switch>
      </main>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Routes))
