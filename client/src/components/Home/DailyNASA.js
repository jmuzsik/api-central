import { connect } from "react-redux"
import { getDailyNASA } from "../../modules/api"
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
  [theme.breakpoints.up("sm")]: {
    slogan: {
      width: "auto",
    },
  },
})

class DailyNASA extends React.Component {
  constructor(props) {
    super(props)
    this.state = { expanded: false, isLoading: true, dailyNASA: null }
  }

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded })
  }
  componentWillReceiveProps(props) {
    if (props.dailyNASA) {
      props.dailyNASA.publication = String(
        new Date(props.dailyNASA.publication)
      )
      this.setState({
        dailyNASA: props.dailyNASA,
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
              action={<Popover text="NASA's Daily Image" />}
              title={this.state.dailyNASA.title}
              subheader={this.state.dailyNASA.date}
            />
            <CardMedia
              className={classes.media}
              image={this.state.dailyNASA.url}
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
                  {this.state.dailyNASA.explanation}
                </Typography>
                {this.state.dailyNASA.copyright && (
                  <Typography component="p">
                    Intellectual property of{" "}
                    <strong>{this.state.dailyNASA.copyright}</strong>
                  </Typography>
                )}
              </CardContent>
            </Collapse>
          </Card>
        )}
      </React.Fragment>
    )
  }
}

DailyNASA.propTypes = {
  classes: PropTypes.object.isRequired,
}
const mapStateToProps = store => {
  return {
    dailyNASA: store.api.dailyNASA,
  }
}

const mapDispatchToProps = dispatch => ({
  getDailyNASA: dispatch(getDailyNASA()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(DailyNASA))
