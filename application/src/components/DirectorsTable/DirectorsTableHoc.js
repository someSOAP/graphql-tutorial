import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from "react-apollo";
import { styles } from './styles';
import { directorQuery } from "./queries";


const withGraphQL = graphql(directorQuery, {
    options: ({ name = "" }) => ({
        variables: { name },
    })
});


export default compose(withStyles(styles), withGraphQL, graphql(directorQuery));
