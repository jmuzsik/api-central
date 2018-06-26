import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import blueGrey from '@material-ui/core/colors/blueGrey'
import amber from '@material-ui/core/colors/amber'
import red from '@material-ui/core/colors/red'

import { BrowserRouter as Router } from 'react-router-dom'
import Core from './Core'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    typography: {
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(',')
    },
    primary: blueGrey,
    secondary: amber,
    error: red
  },
  typography: {
    fontSize: 18
  }
})

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Core />
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default Root
