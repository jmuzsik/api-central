import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core'

import Popover from '../Reuseable/Popover'
import { randomWordCode } from '../../codeSnippets'

const styles = theme => ({
  header: {
    padding: 0,
    margin: `${theme.spacing.unit * 3}px auto`
  },
  headline: {
    fontSize: '2.5rem',
    marginTop: '.35rem'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  card: {
    margin: '.35rem'
  },
  menu: {
    width: 200
  },
  title: {
    marginBottom: 16,
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  instructions: {
    padding: theme.spacing.unit * 3
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing.unit * 2
  },
  buttonTitle: {
    paddingTop: theme.spacing.unit * 2,
    width: '75%',
    paddingBottom: theme.spacing.unit * 2,
    margin: 'auto'
  },
  randomWord: {
    wordBreak: 'break-word'
  },
  popover: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    header: {
      width: '75%'
    }
  },
  [theme.breakpoints.up('md')]: {
    header: {
      width: '50%'
    }
  }
})

class RandomWord extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      randomWord: props.randomWord.word,
      syllables: props.randomWord.syllables,
      randomWordDef: props.randomWord.definition,
      randomWordEx: props.randomWord.example
    }
  }

  componentWillReceiveProps(props) {
    this.setState({
      randomWord: props.randomWord.word,
      syllables: props.randomWord.syllables,
      randomWordDef: props.randomWord.definition,
      randomWordEx: props.randomWord.example
    })
  }

  render() {
    const { classes } = this.props

    return (
      <React.Fragment>
        <Paper className={classes.header} elevation={4}>
          <Typography
            className={classes.headline}
            variant="headline"
            component="h4"
            align="center"
            gutterBottom
          >
            <u>Words</u>
          </Typography>
          <Typography
            className={classes.instructions}
            component="p"
            gutterBottom
          >
            Instructions:{' '}
            <i>
              with the random word below fill in 5 words that come to mind in
              relation to it.
            </i>
          </Typography>
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary">
                Random Word:
              </Typography>
              <Typography
                className={classes.randomWord}
                variant="headline"
                component="h2"
              >
                {this.state.randomWord} <br />
              </Typography>
              <Typography component="p">
                {this.state.syllables &&
                  this.state.syllables.reduce((accum, syllable, i) => {
                    if (i === 0) {
                      accum = syllable
                      return accum
                    } else {
                      return accum + '•' + syllable
                    }
                  }, '')}
              </Typography>

              <Typography component="p">
                {this.state.randomWordDef}
                {this.state.randomWordEx && (
                  <React.Fragment>
                    <br />
                    <br /> Ex: {this.state.randomWordEx}
                  </React.Fragment>
                )}
              </Typography>
            </CardContent>
          </Card>
          <Typography
            className={classes.buttonTitle}
            align="center"
            gutterBottom
          >
            Don't like the word? Get a new one.
          </Typography>
          <div className={classes.container}>
            <Button
              value="rothko"
              onClick={this.props.handleClick}
              variant="outlined"
              className={classes.button}
            >
              New word
            </Button>
          </div>
          <Typography className={classes.popover}>
            Code Snippet: <Popover text={randomWordCode} />{' '}
          </Typography>
        </Paper>
      </React.Fragment>
    )
  }
}

RandomWord.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RandomWord)
