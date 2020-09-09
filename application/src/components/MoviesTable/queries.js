import { gql } from 'apollo-boost';

export const movieQuery = gql`
    query movieQuery {
        movies {
            id
            name
            genre
            watched
            rate
            director {
                name
            }
        }
    }
`;
