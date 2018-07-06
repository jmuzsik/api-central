import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import store from '../store'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import { getRandomWord, getUserWords, removePoem } from '../modules/WordReducer'
import Loading from '../components/Reuseable/Loading'
import RandomWord from '../components/Words/RandomWord'
import TextFields from '../components/Words/TextFields'
import Poem from '../components/Words/Poem'

const styles = theme => ({})

class WordsHome extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      word1: '',
      word2: '',
      word3: '',
      word4: '',
      word5: '',
      loading: true,
      poem: undefined,
      randomWord: undefined
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(props) {
    this.setState({
      randomWord: props.randomWord,
      poem: props.poem
    })
  }

  handleSubmit(word1, word2, word3, word4, word5) {
    const wordsString =
      word1 + ',' + word2 + ',' + word3 + ',' + word4 + ',' + word5

    store.dispatch(getUserWords(wordsString))
  }

  handleClick(e) {
    e.preventDefault()
    store.dispatch(getRandomWord())
    store.dispatch(removePoem())
  }

  render() {
    return (
      <React.Fragment>
        {this.state.randomWord ? (
          <React.Fragment>
            <RandomWord
              randomWord={this.state.randomWord}
              handleClick={this.handleClick}
            />
            {this.state.poem ? (
              <Poem poem={this.state.poem} />
            ) : (
              <TextFields handleSubmit={this.handleSubmit} />
            )}
          </React.Fragment>
        ) : (
          <Loading />
        )}
      </React.Fragment>
    )
  }
}

WordsHome.propTypes = {
  classes: PropTypes.object.isRequired
}

const mapStateToProps = store => {
  return {
    randomWord: store.WordReducer.randomWord,
    poem: store.WordReducer.poem
  }
}

const mapDispatchToProps = dispatch => ({
  getRandomWord: dispatch(getRandomWord()),
  getUserWords: bindActionCreators(getUserWords, dispatch),
  removePoem: dispatch(removePoem())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(WordsHome))
