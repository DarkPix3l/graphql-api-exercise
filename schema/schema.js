import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} from 'graphql';

import Product from '../models/product.js';
import Order from '../models/order.js';

const ProductType = new GraphQLObjectType({
  name: 'Product',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    description: { type: GraphQLString }
  })
});

const OrderType = new GraphQLObjectType({
  name: 'Order',
  fields: () => ({
    id: { type: GraphQLID },
    products: {
      type: new GraphQLList(ProductType),
      async resolve(parent) {
        return await Product.find({ _id: { $in: parent.products } });
      }
    },
    total: { type: GraphQLFloat },
    date: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllProducts: {
      type: new GraphQLList(ProductType),
      resolve: () => Product.find()
    },
    getProductById: {
      type: ProductType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Product.findById(args.id)
    },
    getAllOrders: {
      type: new GraphQLList(OrderType),
      resolve: () => Order.find()
    },
    getOrderById: {
      type: OrderType,
      args: { id: { type: GraphQLID } },
      resolve: (_, args) => Order.findById(args.id)
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createProduct: {
      type: ProductType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLFloat) },
        description: { type: GraphQLString }
      },
      resolve: (_, args) => {
        const product = new Product(args);
        return product.save();
      }
    }
  }
});

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
