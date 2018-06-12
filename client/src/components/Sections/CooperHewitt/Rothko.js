import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

const styles = {
  card: {},
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

function Rothko(props) {
  const { classes, robotRothko } = props

  return (
    <React.Fragment>
      <Typography gutterBottom align="center">Random Rothko-like art:</Typography>
      <Card style={{ backgroundColor: robotRothko.background }}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            style={{
              backgroundColor: robotRothko.palette1,
              color: robotRothko.palette1,
              borderRadius: 3,
              boxShadow: `1px 2px ${robotRothko.palette1}`,
            }}
          >
            Word of the Day
          </Typography>
          <Typography
            className={classes.pos}
            variant="headline"
            component="h2"
            style={{
              backgroundColor: robotRothko.palette2,
              color: robotRothko.palette2,
              borderRadius: 3,
              boxShadow: `1px 2px ${robotRothko.palette2}`,
            }}
          >
            benevolent
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            style={{
              backgroundColor: robotRothko.palette3,
              color: robotRothko.palette3,
              borderRadius: 3,
              boxShadow: `1px 2px ${robotRothko.palette3}`,
            }}
          >
            adjective
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}

Rothko.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Rothko)
