const Movies = require('../models/movie');
const Directors = require('../models/director');
const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Directors.findById(parent.directorId)
            }
        }
    }),
});

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                Movies.find({directorId: parent.id})
            }
        }
    })
});

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Movies.findById(args.id)
            },
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(){
                return Movies.find({})
            }
        },
        director: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Directors.findById(args.id)
            },
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(){
                return Directors.find({})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
});
