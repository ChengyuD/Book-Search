import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            toekn
            user {
                _id
                username
                email
            }
        }
    }
    `;

export const ADD_USER = gql`
    mutation addUser($username: String!, $password: String!, $email: String!) {
        addUser(username: $username, password: $passsword, email: $email) {
            user {
                _id
                username
                email
                bookCount
                savedBooks {
                    authors
                    bookId
                    image
                    link
                    title
                    dexcription
                }
            }
            token
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($input: savedBook!) {
        saveBook (input: $input) {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook(#bookId: ID!) {
        removeBook(bookId: $bookId) {
            _id
            usernmae
            email
            bookCount
            savedBooks {
                bookId
                authors
                image
                link
                title
                description
            }
        }
    }
`;