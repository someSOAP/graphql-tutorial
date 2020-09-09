import React, { Component } from 'react';
import Tabs from './components/Tabs/Tabs';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from './components/theme';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql'
});

class App extends Component {
  render() {
    return (
        <ApolloProvider client={client}>
          <MuiThemeProvider theme={theme}>
            <Tabs />
          </MuiThemeProvider>
        </ApolloProvider>
    );
  }
}

export default App;
