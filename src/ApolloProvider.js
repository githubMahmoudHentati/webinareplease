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
import { Spin } from 'antd';


const httpLink = createHttpLink({
    uri: '//mbeji-cloud-sandbox.webtv-solution.dev:7007/query',
    method: 'post',
});
const token1 = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1PVVNTQUJFSkkiLCJpZCI6MTAyLCJyb2xlIjpbIm5pbCJdLCJleHAiOjE2MjQ1MjI0Mjd9.qq72kEcYmbzqb04knNOIPgeLavUClb9DpHNVCrvYzuvgBRvD52OM347kH-ltJA5Wt1etPDm7DOF6Is01BYVStKG351MyHCjuupy5EZ4ygNUu8q8zOuQRIy3nO7qBGvihTNGfTptx0cn9elXA5n14nHBqTPL2Bl5BtMDnTUjXfqZmKwbdBpnf9ct-BHAlT_jyI4SL0PtiaLumVA26M97UaMQKaljJvVJzM2ezHWUeLZldpZO1gxKyC032GorGGHJY_uyRm9lLtI41p29fYk8bJiq3eL8L9JsJK9CuwOC3vmD5S3Xn67j3KpjeI11X_YBtTnfmWmVN3oOnxzRDJLbrEOkmTPWBlycl7euKU8m6mHL1uSFk5Y1Ixo8nrpT6WMZ1w05vr0HYMhy2PV1Z0PfXzGgcyMajVDdlWhxdr8oFaeI8AhyEMY33IqjYhLx5x8I3dSN8JjXOApv23rd7qT1rRWhl2BRUGQqgBgrfSBD6FT9rGqyzcaONBhonOKogqm2XKB8l4YnnvYAgo8DqZoY8h7ehF9nhKA-WWKYmrbuMa7e2NpDkwEo45n_8FX7MOBEjxs3ms6dEhW2VHqkG1hChJ9yITExdf6bToUZoQfN7le-Sj4rlP0V6lnhS8Q8ivrcTO4WfDu7TfaLgthyXsuOJQMb23sj_dozWGtQHLNhUtJE"
const token2 = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImVtcGFkbWluIiwiaWQiOjc5LCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU1MTEwNjA4NSwiZXhwIjo3ODU4MzA2MDg1fQ.DDGHdnJUrjfwW-WcZDaKy7jhQgp6dDwLPqDk0UK5_2OnNKHfRvZ-oIKxaHo4ifeoZfS4fJqdfXd0QnQWZi2wriOTT44DNUNGLADitBm6avP2ejRX70Tsif-Q6dpBp60DaiQ-AGCdjj09VzeqiearQNzI5DneAJ9r9HqELKmE5JFqO_EUD7M4cQE38tytGBoiaLFLyOphvjdqiivQ7l-10GxPYpAOj5T3zeQuq3jEpszmjHZhbovgvunY8lpX8TdvE44KNbP5r7ozj4wagiMW3FHPGZflerZURAejNUZtphFBnB4CHtzKUeSKdeki6m6VaFU6IT5XzRFU7kZoV4nx93YTjOWjc0XeMTKcy-OGsGDEtTQT6T0BL0IpP96hEd5K-jh5OkcD1JjI2Yuijp6PkzFeTFUdTJ5GJz_LGE34FmUw9Qwm2VUBV1qR5D951Dnbhv9Y2xJXja-sj8SVZAM42dZkp0xcVfBIe6Y_96C1QVp_JbVXi2NUKLZVcE0EXGlL46Sur8Rgq_jMWdfz9ZKLCWhx8vt2hVSQNSH01nFpZAC2YBIb6lc88E-PVIXCSG3RW3wzMSjehGs3TH9cOz3wJXpYiHhGbmRUsrBlLarad7EnGCwP50kBaiJh2jdNpPcQFC7gEG6GewVN7FfAxEg_m8OnBj93OY3LMc6j9IIJyu5"
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

    uri: '//mbeji-cloud-sandbox.webtv-solution.dev:7007/query',
    headers: {
            Authorization: token1?`Bearer ${token1}`:"",
         }
    // other link options...
});

// Create Second Link
const secondLink = new HttpLink({
    uri: 'https://ytimoumi-cloud-sandbox.webtv-solution.dev/query',
    headers: {
        Authorization: token2?`Bearer ${token2}`:"",
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
    <Suspense fallback={(<Spin className="Spin"><div></div></Spin>)}>
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>
    </Suspense>
);