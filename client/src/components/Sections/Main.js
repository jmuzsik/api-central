import React from "react"
import { withStyles } from "@material-ui/core/styles"
import { Link, withRouter } from "react-router-dom"

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    marginTop: "3rem",
  },
})
class Main extends React.Component {
  render() {
    const { classes, theme } = this.props

    return (
      <main className={classes.content}>
        <Routes />
      </main>
    )
  }
}

export default withRouter(withStyles(styles, { withTheme: true })(Main))
