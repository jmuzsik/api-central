import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import green from '@material-ui/core/colors/green'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonProgress: {
    color: green[500]
  },
  [theme.breakpoints.up('md')]: {
    container: {
      width: '75%',
      margin: 'auto'
    }
  }
})

class TextFields extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      word1: '',
      word2: '',
      word3: '',
      word4: '',
      word5: '',
      loading: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = name => event => {
    if (
      this.state.word1 &&
      !this.state.word1.includes(' ') &&
      (this.state.word2 && !this.state.word2.includes(' ')) &&
      (this.state.word3 && !this.state.word3.includes(' ')) &&
      (this.state.word4 && !this.state.word4.includes(' ')) &&
      (this.state.word5 && !this.state.word5.includes(' ')) &&
      (event.target.value && !event.target.value.includes(' '))
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
    this.setState({ loading: true })
    this.props.handleSubmit(
      this.state.word1,
      this.state.word2,
      this.state.word3,
      this.state.word4,
      this.state.word5
    )
  }

  render() {
    const { classes } = this.props
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
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
        {!this.state.loading ? (
          <Button
            className={classes.textField}
            disabled={this.state.disabled}
            variant="text"
            type="submit"
          >
            Submit
          </Button>
        ) : (
          <div>
            <Button
              className={classes.textField}
              disabled
              variant="text"
              type="submit"
            >
              Submit
            </Button>
            <CircularProgress size={24} className={classes.buttonProgress} />
          </div>
        )}
      </form>
    )
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(TextFields)
