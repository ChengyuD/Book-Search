const { User, Book } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
        if (context.user) {
          try {
            const user = await User.findOne({ _id: context.user._id });
            return user;
          } catch (err) {
            console.log('Failed to find user data', err);
          }
        }
        throw new AuthenticationError('Please log in');
      },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
        try {
          const user = await User.findOne({ email });
          if (!user) {
            throw new AuthenticationError('Unassociated email address');
          }
          const correctPw = await user.isCorrectPassword(password);
          if (!correctPw) {
            throw new AuthenticationError('Incorrect password');
          }
          const token = signToken(user);
          return { token, user };
        } catch (err) {
          console.log('Login error', err)
        }
      },
  
      addUser: async (parent, { username, email, password }) => {
        try {
          const user = await User.create({ username, email, password });
          const token = signToken(user);
          return { token, user };
        } catch (err) {
          console.log('Sign up error', err);
        }
      },
  
      saveBook: async (parent, { bookToSave }, context) => {
        if (context.user) {
          try {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $addToSet: { savedBooks: bookToSave } },
              { new: true, runValidators: true }
            );
            return user;
          } catch (err) {
            console.log('Save book error', err);
          }
        }
        throw new AuthenticationError('Please log in');
      },
  
      removeBook: async (parent, { bookId }, context) => {
        if (context.user) {
          try {
            const user = await User.findOneAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: { bookId: bookId } } },
              { new: true }
            );
            return user;
          } catch (err) {
            console.log('Remove book error', err);
          }
        }
        throw new AuthenticationError('Please log in');
      },
    },
};

module.exports = resolvers;
