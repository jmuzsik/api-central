import React from "react"
import PropTypes from "prop-types"
import classNames from "classnames"
import SwipeableViews from "react-swipeable-views"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Zoom from "@material-ui/core/Zoom"
import Button from "@material-ui/core/Button"
import green from "@material-ui/core/colors/green"

import Rothko from "./Rothko"
import RandomObject from "./RandomObject"
import Video from "./Video"

import './CooperNavigation.css'

function TabContainer(props) {
  const { children, dir } = props

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative",
  },
  container: {
    display: "flex",
    alignItems: "center",
  },
})

class CooperNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      robotRothko: props.robotRothko,
      randomObject: props.randomObject,
      randomVideo: props.randomVideo,
    }
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    }

    return (
      <div className={classes.root}>
        <AppBar className={classes.container} position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Rothko" />
            <Tab label="Object" />
            <Tab label="Video" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          classes={{
            "react-swipeable-view-container": classes.container,
          }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer className={classes.rothko} dir={theme.direction}>
            <Rothko robotRothko={this.state.robotRothko} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <RandomObject randomObject={this.state.randomObject} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Video randomVideo={this.state.randomVideo} />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

CooperNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(CooperNavigation)
