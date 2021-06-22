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
    uri: '//146.59.204.235:7002/query',
    method: 'post',
});
const token = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImVtcGFkbWluIiwiaWQiOjc5LCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU1MTEwNjA4NSwiZXhwIjo3ODU4MzA2MDg1fQ.DDGHdnJUrjfwW-WcZDaKy7jhQgp6dDwLPqDk0UK5_2OnNKHfRvZ-oIKxaHo4ifeoZfS4fJqdfXd0QnQWZi2wriOTT44DNUNGLADitBm6avP2ejRX70Tsif-Q6dpBp60DaiQ-AGCdjj09VzeqiearQNzI5DneAJ9r9HqELKmE5JFqO_EUD7M4cQE38tytGBoiaLFLyOphvjdqiivQ7l-10GxPYpAOj5T3zeQuq3jEpszmjHZhbovgvunY8lpX8TdvE44KNbP5r7ozj4wagiMW3FHPGZflerZURAejNUZtphFBnB4CHtzKUeSKdeki6m6VaFU6IT5XzRFU7kZoV4nx93YTjOWjc0XeMTKcy-OGsGDEtTQT6T0BL0IpP96hEd5K-jh5OkcD1JjI2Yuijp6PkzFeTFUdTJ5GJz_LGE34FmUw9Qwm2VUBV1qR5D951Dnbhv9Y2xJXja-sj8SVZAM42dZkp0xcVfBIe6Y_96C1QVp_JbVXi2NUKLZVcE0EXGlL46Sur8Rgq_jMWdfz9ZKLCWhx8vt2hVSQNSH01nFpZAC2YBIb6lc88E-PVIXCSG3RW3wzMSjehGs3TH9cOz3wJXpYiHhGbmRUsrBlLarad7EnGCwP50kBaiJh2jdNpPcQFC7gEG6GewVN7FfAxEg_m8OnBj93OY3LMc6j9IIJyu5"
const token1="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1PVVNTQUJFSkkiLCJpZCI6MTAyLCJyb2xlIjpbIm5pbCJdLCJleHAiOjE2MjQ0MzUzNzB9.g2hfSda-JbyN-sZuFRG2b9HKC0sLCzJje-kJjbfRLXdWdwbg7DOddeFLWbG2DmADoblaHiLytD09cL3jRC8n0E9na-asc_jzWbWMI4ZN2nPY0_Tdn_knX4jmXYaoRUtgf10R35ZWn45byzrzWV5XHDCbd_CibyjnqGZARaQ7siKQQQVXpQ651S6R1ox08VlZ6AFFpvVojKCibLO3bx_lNx8xzjRRRtCO_LsipNuj6cFGYIBCDpPyS1Fi5YN3Tep_8-4A2t1mj_L8V3LlmTnNFDqlrKS2SV9XVNeYYypDcplYFpOBEimkndITDtLtBeavFNER2LVATWgJPLUWLJjka7FUWhwovLtbVTo0E50-4Rz8rmnRrTD_o9rkkweictsYh4v6278_KGB8fKRDZjzAyUxcK6u82Rnmd4E5uOZgoelCOMZaiXnxa94qZAs34m9AK1uNXBuZJnlyYjOh7YJI79JGBatK4vJNR-jn0CtUEv4dGgZ_wBqEd50NSSEI8vkuhx2p3KQhU19ujIQa1U9_9GyLiHKXnNOKGP2JnBRftYs1TnMyvORe8jK-FY80pYke54pVl7sf8dIHq9w4ZpxAldaC15qsBeylxdZpW06NH8-b1w5W_jS1BvJBeaZX_WeaeDhHjei0cxmHS7ASZi1P9vTTJvy9bEHeXXfvqTBho2I"
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
    <Suspense fallback={(<Spin className="Spin"><div></div></Spin>)}>
    <ApolloProvider client={client}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ApolloProvider>
    </Suspense>
);