import React,{ Suspense }  from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
//import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import { setContext } from 'apollo-link-context';
import store from "./utils/redux/store";
import {Provider} from "react-redux";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from 'apollo-link-http';


const httpLink = createHttpLink({
    uri: '//146.59.204.235:7002/query',
    method: 'post',
});
const token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImVtcGFkbWluIiwiaWQiOjc5LCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU1MTEwNjA4NSwiZXhwIjo3ODU4MzA2MDg1fQ.DDGHdnJUrjfwW-WcZDaKy7jhQgp6dDwLPqDk0UK5_2OnNKHfRvZ-oIKxaHo4ifeoZfS4fJqdfXd0QnQWZi2wriOTT44DNUNGLADitBm6avP2ejRX70Tsif-Q6dpBp60DaiQ-AGCdjj09VzeqiearQNzI5DneAJ9r9HqELKmE5JFqO_EUD7M4cQE38tytGBoiaLFLyOphvjdqiivQ7l-10GxPYpAOj5T3zeQuq3jEpszmjHZhbovgvunY8lpX8TdvE44KNbP5r7ozj4wagiMW3FHPGZflerZURAejNUZtphFBnB4CHtzKUeSKdeki6m6VaFU6IT5XzRFU7kZoV4nx93YTjOWjc0XeMTKcy-OGsGDEtTQT6T0BL0IpP96hEd5K-jh5OkcD1JjI2Yuijp6PkzFeTFUdTJ5GJz_LGE34FmUw9Qwm2VUBV1qR5D951Dnbhv9Y2xJXja-sj8SVZAM42dZkp0xcVfBIe6Y_96C1QVp_JbVXi2NUKLZVcE0EXGlL46Sur8Rgq_jMWdfz9ZKLCWhx8vt2hVSQNSH01nFpZAC2YBIb6lc88E-PVIXCSG3RW3wzMSjehGs3TH9cOz3wJXpYiHhGbmRUsrBlLarad7EnGCwP50kBaiJh2jdNpPcQFC7gEG6GewVN7FfAxEg_m8OnBj93OY3LMc6j9IIJyu5"

// const authLink = setContext(() => {
//     /*const token = localStorage.getItem('jwtToken');*/
//     // const token = process.env.REACT_APP_API_EVENT_TOKEN;
//     const token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImVtcGFkbWluIiwiaWQiOjc5LCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU1MTEwNjA4NSwiZXhwIjo3ODU4MzA2MDg1fQ.DDGHdnJUrjfwW-WcZDaKy7jhQgp6dDwLPqDk0UK5_2OnNKHfRvZ-oIKxaHo4ifeoZfS4fJqdfXd0QnQWZi2wriOTT44DNUNGLADitBm6avP2ejRX70Tsif-Q6dpBp60DaiQ-AGCdjj09VzeqiearQNzI5DneAJ9r9HqELKmE5JFqO_EUD7M4cQE38tytGBoiaLFLyOphvjdqiivQ7l-10GxPYpAOj5T3zeQuq3jEpszmjHZhbovgvunY8lpX8TdvE44KNbP5r7ozj4wagiMW3FHPGZflerZURAejNUZtphFBnB4CHtzKUeSKdeki6m6VaFU6IT5XzRFU7kZoV4nx93YTjOWjc0XeMTKcy-OGsGDEtTQT6T0BL0IpP96hEd5K-jh5OkcD1JjI2Yuijp6PkzFeTFUdTJ5GJz_LGE34FmUw9Qwm2VUBV1qR5D951Dnbhv9Y2xJXja-sj8SVZAM42dZkp0xcVfBIe6Y_96C1QVp_JbVXi2NUKLZVcE0EXGlL46Sur8Rgq_jMWdfz9ZKLCWhx8vt2hVSQNSH01nFpZAC2YBIb6lc88E-PVIXCSG3RW3wzMSjehGs3TH9cOz3wJXpYiHhGbmRUsrBlLarad7EnGCwP50kBaiJh2jdNpPcQFC7gEG6GewVN7FfAxEg_m8OnBj93OY3LMc6j9IIJyu5"
//     return {
//         headers: {
//             Authorization: token?`Bearer ${token}`:"",
//             Referer: "//146.59.204.235:7002",
//         }
//     };
// });
const firstLink = new HttpLink({

    uri: 'https://ytimoumi-cloud-sandbox.webtv-solution.dev/api/query',
    headers: {
            Authorization: token?`Bearer ${token}`:"",
         }
    // other link options...
});

// Create Second Link
const secondLink = new HttpLink({
    uri: 'https://ytimoumi-cloud-sandbox.webtv-solution.dev/api/query',
    headers: {
        Authorization: token?`Bearer ${token}`:"",
    }
    // other link options...
});

const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().clientName === "second", // Routes the query to the proper client
        secondLink,
        firstLink
    ),
    cache: new InMemoryCache()
});

export default (
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>
);