import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'

import About from './components/Separate/About'
import Home from './containers/Home'
import CooperHewitt from './containers/CooperHewitt'
import WordsHome from './containers/WordsHome'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    paddingLeft: theme.spacing.unit * 1,
    paddingRight: theme.spacing.unit * 1,
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 5,
    width: '100%'
  }
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
          <Route exact path="/words" component={WordsHome} />
        </Switch>
      </main>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Routes))
