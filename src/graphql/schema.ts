import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Query {
    people: [Person!]
    person(id: ID!): Person
    starships: [Starship!]
    starship(id: ID!): Starship
    planets: [Planet!]
    planet(id: ID!): Planet
    species: [Species!]
    specie(id: ID!): Species
    vehicles: [Vehicle!]
    vehicle(id: ID!): Vehicle
  }

  type Person {
    id: ID!
    name: String!
    mass: Int!
  }

  type Starship {
    id: ID!
    name: String!
    crew: Int!
    model: String!
    manufacturer: String!
  }

  type Planet {
    id: ID!
    name: String!
    population: Int
  }

  type Species {
    id: ID!
    name: String!
    language: String
  }

  type Vehicle {
    id: ID!
    name: String!
    model: String
    manufacturer: String
  }
`; 