import { connect } from "react-redux"
import { getLatestHubble } from "../../modules/api"
import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import classnames from "classnames"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import CardActions from "@material-ui/core/CardActions"
import Collapse from "@material-ui/core/Collapse"
import IconButton from "@material-ui/core/IconButton"
import Typography from "@material-ui/core/Typography"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

import Popover from "../Reuseable/Popover"

const styles = theme => ({
  card: {},
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  credits: {
    marginTop: "1.5rem",
  },
  [theme.breakpoints.up("sm")]: {
    slogan: {
      width: "auto",
    },
  },
})

class LatestHubble extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false, isLoading: true, latestHubble: null }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }

  componentDidMount() {
    if (this.state.isLoading) this.props.getLatestHubble()
  }
  componentWillReceiveProps(props) {
    if (props.latestHubble) {
      props.latestHubble.publication = String(
        new Date(props.latestHubble.publication)
      )
      this.setState({
        latestHubble: props.latestHubble,
        isLoading: false,
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        {!this.state.isLoading && (
          <Card className={classes.card}>
            <CardHeader
              action={<Popover text="Latest Hubble Telescope Image" />}
              title={this.state.latestHubble.name}
              subheader={this.state.latestHubble.publication}
            />
            <CardMedia
              className={classes.media}
              image={this.state.latestHubble.image}
            />
            <CardActions className={classes.actions} disableActionSpacing>
              {/* <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton> */}
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography component="p">
                  {this.state.latestHubble.abstract}
                </Typography>
                <Typography
                  className={classes.credits}
                  component="p"
                  dangerouslySetInnerHTML={{
                    __html: this.state.latestHubble.credits,
                  }}
                />
              </CardContent>
            </Collapse>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

LatestHubble.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapStateToProps = store => {
  return {
    latestHubble: store.api.latestHubble,
  }
}

const mapDispatchToProps = dispatch => ({
  getLatestHubble: dispatch(getLatestHubble()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LatestHubble))
