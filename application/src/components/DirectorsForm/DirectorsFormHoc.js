import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';

import { graphql} from "react-apollo";

import { addDirectorMutation, updateDirectorMutation } from "./mutations";
import { directorQuery } from "../DirectorsTable/queries";

import { styles } from './styles';

const withGraphQL = compose(
    graphql(addDirectorMutation, {
        props: ({ mutate }) => ({
            addDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorQuery,
                    variables: { name: '' }
                }]
            })
        })
    }),
    graphql(updateDirectorMutation, {
        props: ({ mutate }) => ({
            updateDirector: director => mutate({
                variables: director,
                refetchQueries: [{
                    query: directorQuery,
                    variables: { name: '' }
                }]
            })
        })
    }),
    graphql(directorQuery, {
        options: ({name = ''}) => ({
            variables: { name }
        })
    })
);


export default compose(withStyles(styles), withGraphQL);
