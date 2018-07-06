import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

import { getLatestHubble, getDailyNASA } from '../modules/NASAReducer'
import HomeCard from '../components/Home/HomeCard'
import HomeText from '../components/Home/HomeText'
import Loading from '../components/Reuseable/Loading'
import { dailyNASACode, latestHubbleCode } from '../codeSnippets'

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  control: {
    padding: theme.spacing.unit * 3
  },
  cardGrid: {
    alignItems: 'center'
  }
})

class Home extends React.PureComponent {
  state = {
    spacing: '16'
  }

  render() {
    const { classes } = this.props
    const { spacing } = this.state
    return (
      <React.Fragment>
        {this.props.latestHubble && this.props.dailyNASA ? (
          <Grid container className={classes.root} spacing={16}>
            <Grid item xs={12}>
              <HomeText />
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                justify="center"
                className={classes.cardGrid}
                spacing={Number(spacing)}
              >
                {this.props.dailyNASA &&
                  this.props.dailyNASA.image && (
                    <Grid key="Daily NASA" xs={12} sm={6} item>
                      <HomeCard
                        dailyNASA={this.props.dailyNASA}
                        type="daily nasa"
                        codeToDisplay={dailyNASACode}
                      />
                    </Grid>
                  )}
                {this.props.latestHubble &&
                  this.props.latestHubble.image && (
                    <Grid key="Latest Hubble" xs={12} sm={6} item>
                      <HomeCard
                        latestHubble={this.props.latestHubble}
                        codeToDisplay={latestHubbleCode}
                        type="latest hubble"
                      />
                    </Grid>
                  )}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    )
  }
}

const mapStateToProps = store => {
  return {
    latestHubble: store.NASAReducer.latestHubble,
    dailyNASA: store.NASAReducer.dailyNASA
  }
}

const mapDispatchToProps = dispatch => ({
  getLatestHubble: dispatch(getLatestHubble()),
  getDailyNASA: dispatch(getDailyNASA())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Home))
