import { gql } from 'apollo-boost';

export const directorQuery = gql`
    query directorQuery($name: String) {
        directors (name: $name){
            id
            name
            age
            movies {
                id
                name
            }
        }
    }
`;
