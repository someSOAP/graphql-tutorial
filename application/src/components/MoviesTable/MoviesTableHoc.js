import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from "react-apollo";

import { movieQuery } from "./queries";

import { styles } from './styles';

const withGraphQL = graphql(movieQuery, {
    options: ({ name = "" }) => ({
        variables: { name },
    })
});


export default compose(withStyles(styles), withGraphQL, graphql(movieQuery));
