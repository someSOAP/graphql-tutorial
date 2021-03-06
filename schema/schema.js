const Movies = require('../models/movie');
const Directors = require('../models/director');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull
} = graphql;


const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        rate: { type: GraphQLInt },
        watched: { type: GraphQLBoolean },
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
        id:   { type: GraphQLID     },
        name: { type: new GraphQLNonNull(GraphQLString) },
        age:  { type: new GraphQLNonNull(GraphQLInt)    },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return Movies.find({
                    directorId:  parent.id
                })
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                age:  { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                const director = new Directors({
                    name: args.name,
                    age:  args.age,
                });
                return director.save();
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: { type: GraphQLID },
                name: { type: new GraphQLNonNull(GraphQLString) },
                age:  { type: new GraphQLNonNull(GraphQLInt) },
            },
            resolve(parent, args){
                debugger;
                return Directors.findByIdAndUpdate(
                    args.id,
                    { $set: { name: args.name, age: args.age } },
                    { new: true }
                )
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Directors.findByIdAndRemove(args.id);
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name:       { type: new GraphQLNonNull(GraphQLString) },
                genre:      { type: new GraphQLNonNull(GraphQLString) },
                rate:       { type: GraphQLInt },
                watched:    { type: GraphQLBoolean },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args){
                const movie = new Movies({
                    name:  args.name,
                    genre: args.genre,
                    rate:  args.rate,
                    watched: args.watched,
                    directorId: args.directorId,
                });
                return movie.save();
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
                name:       { type: new GraphQLNonNull(GraphQLString) },
                genre:      { type: new GraphQLNonNull(GraphQLString) },
                rate:       { type: GraphQLInt },
                watched:    { type: GraphQLBoolean },
                directorId: { type: GraphQLID },
            },
            resolve(parent, args){
                return Movies.findByIdAndUpdate(
                    args.id,
                    { $set: {
                        name: args.name,
                        genre: args.genre,
                        directorId: args.directorId,
                        rate:  args.rate,
                        watched: args.watched,
                    } },
                    { new: true }
                )
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args){
                return Movies.findByIdAndRemove(args.id)
            }
        }
    }
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
            args: { name: { type: GraphQLString }},
            resolve(parent, args){
                if(args.name){
                    return Movies.find({
                        name: { $regex: args.name, $options: "i"}
                    })
                } else {
                    return Movies.find({})
                }
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
            args: { name: { type: GraphQLString }},
            resolve(parent, args){
                if(args.name){
                    return Directors.find({
                        name: { $regex: args.name, $options: "i"}
                    })
                } else {
                    return Directors.find({})
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});
