import { connect } from "react-redux"
import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

import {
  getWhatWouldMicahSay,
  getRandomObject,
  getRandomVideo,
  getRobotRothko,
} from "../../../modules/CooperHewittReducer"
import CooperNavigation from "./CooperNavigation"

const styles = theme => ({
  card: {
    maxWidth: 250,
    margin: theme.spacing.unit * 3,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
})

class CooperHewitt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      isLoading: true,
      whatWouldMicahSay: undefined,
      randomObject: undefined,
      randomVideo: undefined,
      robotRothko: undefined,
    }
  }
  componentDidMount() {}
  componentWillReceiveProps(props) {
    this.setState({
      robotRothko: props.robotRothko,
      randomObject: props.randomObject,
      randomVideo: props.randomVideo,
      whatWouldMicahSay: props.whatWouldMicahSay,
    })
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        {this.state.randomObject &&
          this.state.randomVideo &&
          this.state.robotRothko && (
            <React.Fragment>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image="https://uh8yh30l48rpize52xh0q1o6i-wpengine.netdna-ssl.com/wp-content/uploads/2014/04/ch-front1-e1456853352822.jpg"
                  title="Cooper Hewitt Museum"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="headline"
                    align="center"
                    component="h3"
                  >
                    Welcome!
                  </Typography>
                  <Typography component="p">
                    <strong>Micah says: </strong>
                    {this.state.whatWouldMicahSay.micahSays}
                  </Typography>
                </CardContent>
                <CardActions>
                  <a
                    rel="noopener noreferrer"
                    href="https://www.cooperhewitt.org/"
                    target="_blank"
                  >
                    <Button size="small" color="primary">
                      Museum Site
                    </Button>
                  </a>
                </CardActions>
                <CooperNavigation
                  randomObject={this.state.randomObject}
                  randomVideo={this.state.randomVideo}
                  robotRothko={this.state.robotRothko}
                />
              </Card>
            </React.Fragment>
          )}
      </div>
    )
  }
}

CooperHewitt.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = store => {
  return {
    whatWouldMicahSay: store.CooperHewittReducer.whatWouldMicahSay,
    randomObject: store.CooperHewittReducer.randomObject,
    randomVideo: store.CooperHewittReducer.randomVideo,
    robotRothko: store.CooperHewittReducer.robotRothko,
  }
}

const mapDispatchToProps = dispatch => ({
  getWhatWouldMicahSay: dispatch(getWhatWouldMicahSay()),
  getRandomObject: dispatch(getRandomObject()),
  getRandomVideo: dispatch(getRandomVideo()),
  getRobotRothko: dispatch(getRobotRothko()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CooperHewitt))
