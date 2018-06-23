import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import store from "../../../store"
import PropTypes from "prop-types"
import { withStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"
import yellow from "@material-ui/core/colors/yellow"

import { getRandomWord, getUserWords } from "../../../modules/WordReducer"
import RandomWord from "./RandomWord"

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  progress: {
    margin: "auto"
  },
  progressContainer: {
    height: "90vh",
    display: "flex",
    justifyContent: "center"
  }
})

class WordsHome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      word1: "",
      word2: "",
      word3: "",
      word4: "",
      word5: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      randomWord: props.randomWord
    })
  }

  handleChange = name => event => {
    if (
      this.state.word1 &&
      !this.state.word1.includes(" ") &&
      (this.state.word2 && !this.state.word2.includes(" ")) &&
      (this.state.word3 && !this.state.word3.includes(" ")) &&
      (this.state.word4 && !this.state.word4.includes(" ")) &&
      (this.state.word5 && !this.state.word5.includes(" ")) &&
      (event.target.value && !event.target.value.includes(" "))
    ) {
      this.setState({
        [name]: event.target.value,
        disabled: false
      })
    } else {
      this.setState({
        [name]: event.target.value,
        disabled: true
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const wordsString =
      this.state.word1 +
      "," +
      this.state.word2 +
      "," +
      this.state.word3 +
      "," +
      this.state.word4 +
      "," +
      this.state.word5

    store.dispatch(getUserWords(wordsString))
  }

  handleClick(e) {
    e.preventDefault()
    store.dispatch(getRandomWord())
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        {this.state.randomWord ? (
          <form
            className={classes.container}
            noValidate
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <RandomWord
              randomWord={this.state.randomWord}
              handleClick={this.handleClick}
            />
            <TextField
              id={`word1`}
              name={`Word 1`}
              label={`Word 1 Field`}
              type="text"
              placeholder={`Word 1`}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange(`word1`)}
              required
            />
            <TextField
              id={`word2`}
              name={`Word 2`}
              label={`Word 2 Field`}
              type="text"
              placeholder={`Word 2`}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange(`word2`)}
              required
            />
            <TextField
              id={`word3`}
              name={`Word 3`}
              label={`Word 3 Field`}
              type="text"
              placeholder={`Word 3`}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange(`word3`)}
              required
            />
            <TextField
              id={`word4`}
              name={`Word 4`}
              label={`Word 4 Field`}
              type="text"
              placeholder={`Word 4`}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange(`word4`)}
              required
            />
            <TextField
              id={`word5`}
              name={`Word 5`}
              label={`Word 5 Field`}
              type="text"
              placeholder={`Word 5`}
              className={classes.textField}
              margin="normal"
              onChange={this.handleChange(`word5`)}
              required
            />
            <Button disabled={this.state.disabled} variant="text" type="submit">
              Submit
            </Button>
          </form>
        ) : (
          <div className={classes.progressContainer}>
            <CircularProgress
              className={classes.progress}
              style={{ color: yellow[500] }}
              thickness={10}
            />
          </div>
        )}
      </div>
    )
  }
}

WordsHome.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = store => {
  return {
    randomWord: store.WordReducer.randomWord
  }
}

const mapDispatchToProps = dispatch => ({
  getRandomWord: dispatch(getRandomWord()),
  getUserWords: bindActionCreators(getUserWords, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WordsHome))
