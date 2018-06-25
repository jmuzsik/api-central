import React from "react"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import Paper from "@material-ui/core/Paper"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import { Typography } from "@material-ui/core"

const styles = theme => ({
  header: {
    padding: 0
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
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
  padText: {
    padding: 10
  },
  container: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: theme.spacing.unit * 2
  },
  buttonTitle: {
    paddingTop: theme.spacing.unit * 2,
    width: "75%",
    paddingBottom: theme.spacing.unit * 2,
    margin: "auto"
  },
  randomWord: {
    wordBreak: "break-word"
  }
})

class RandomWord extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
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
            className={classes.padText}
            variant="headline"
            component="h4"
            gutterBottom
          >
            Welcome to a fun word thingamagig
          </Typography>
          <Typography className={classes.padText} component="p" gutterBottom>
            Instructions: with the random word below fill in 5 words that come
            to mind in relation to it.
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
                      return accum + "•" + syllable
                    }
                  }, "")}
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
        </Paper>
      </React.Fragment>
    )
  }
}

RandomWord.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RandomWord)
