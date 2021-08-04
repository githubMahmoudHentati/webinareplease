import React,{ Suspense }  from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
//import { createHttpLink } from 'apollo-link-http';
import {ApolloProvider, useQuery} from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import store from "./utils/redux/store";
import {Provider, useDispatch, useSelector} from "react-redux";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from 'apollo-link-http';
import { Spin } from 'antd';
import {setAppSetLogin} from "./utils/redux/actions";
import {graphQL_shema} from "./utils/grapqhQL/shemaGraphQL";

import './i18n'
const firstLink = new createHttpLink({
    uri: process.env.REACT_APP_API_WEBINARPLEASE_HOST
});

const authLink = setContext(() => {
    const token = localStorage.getItem('jwtToken');

    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
});

// Create Second Link
const secondLink = new HttpLink({
    uri: process.env.REACT_APP_API_WEBINARPLEASE_HOST
});

const authLink2 = setContext(() => {
    const token2 = localStorage.getItem('jwtToken')
    return {
        headers: {
            Authorization: token2 ? `Bearer ${token2}` : ''
        }
    };
});


const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === "second", // Routes the query to the proper client
        authLink2.concat(secondLink),
        authLink.concat(firstLink),
    ),
    cache: new InMemoryCache({
        addTypename: false
    })
});

export default (
    <Suspense fallback={(<Spin className="Spin">
        <div></div>
    </Spin>)}>
        <Provider store={store}>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </Provider>
    </Suspense>
);