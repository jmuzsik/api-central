import { connect } from "react-redux"
import { getLatestHubble, getDailyNASA } from "../../modules/NASAReducer"
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
import Footer from "../Reuseable/Footer"

const styles = theme => ({
  card: {},
  title: {
    fontSize: "1.5rem",
  },
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

class HomeCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false,
      isLoading: true,
      title: undefined,
      image: undefined,
      date: undefined,
      popoverText: undefined,
      textContent: undefined,
      footerContent: {},
      type: props.type || "",
    }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  componentDidMount() {
    if (this.state.type === "daily nasa") {
      this.props.dispatch(getDailyNASA())
    } else if (this.state.type === "latest hubble") {
      this.props.dispatch(getLatestHubble())
    }
  }
  componentWillReceiveProps(props) {
    let dataToUse, footerContent
    if (this.state.type === "latest hubble") {
      footerContent = {
        credits: props.latestHubble.credits,
        url: props.latestHubble.url,
      }
      props.latestHubble.publication = String(
        new Date(props.latestHubble.publication)
      )
      dataToUse = props.latestHubble
    } else if (this.state.type === "daily nasa") {
      footerContent = {
        credits: props.dailyNASA.copyright,
        url: props.dailyNASA.url,
      }
      dataToUse = props.dailyNASA
    }
    this.setState({
      title: dataToUse.title,
      image: dataToUse.image,
      date: dataToUse.date,
      popoverText: dataToUse.popoverText,
      textContent: dataToUse.textContent,
      isLoading: false,
      footerContent,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        {!this.state.isLoading && (
          <Card className={classes.card}>
            <CardHeader
              classes={{
                title: classes.title,
              }}
              action={<Popover text={this.state.popoverText} />}
              title={this.state.title}
              subheader={this.state.date}
            />
            <CardMedia className={classes.media} image={this.state.image} />
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
                <Typography component="p">{this.state.textContent}</Typography>
                <Footer
                  type={this.state.type}
                  footerContent={this.state.footerContent}
                />
              </CardContent>
            </Collapse>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

HomeCard.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapStateToProps = store => {
  return {
    latestHubble: store.NASAReducer.latestHubble,
    dailyNASA: store.NASAReducer.dailyNASA,
  }
}

// const mapDispatchToProps = dispatch => ({
//   getLatestHubble: dispatch(getLatestHubble()),
// })

export default connect(mapStateToProps)(withStyles(styles)(HomeCard))
