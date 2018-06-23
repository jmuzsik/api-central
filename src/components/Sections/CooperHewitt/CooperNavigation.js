import React from "react"
import PropTypes from "prop-types"
import SwipeableViews from "react-swipeable-views"
import { withStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"

import Rothko from "./Rothko"
import RandomObject from "./RandomObject"
import Video from "./Video"

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
  dir: PropTypes.string.isRequired
}

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    position: "relative"
  }
})

class CooperNavigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      robotRothko: props.robotRothko,
      randomObject: props.randomObject,
      randomVideo: props.randomVideo
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
    return (
      <div className={classes.root}>
        <AppBar className={classes.container} position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Object" />
            <Tab label="Rothko" />
            <Tab label="Video" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          classes={{
            "react-swipeable-view-container": classes.container
          }}
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <RandomObject randomObject={this.props.randomObject} />
          </TabContainer>
          <TabContainer className={classes.rothko} dir={theme.direction}>
            <Rothko robotRothko={this.props.robotRothko} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Video randomVideo={this.props.randomVideo} />
          </TabContainer>
        </SwipeableViews>
      </div>
    )
  }
}

CooperNavigation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

export default withStyles(styles, { withTheme: true })(CooperNavigation)
