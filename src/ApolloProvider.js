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
const token2 = "eyJhbGciOiJSUzI1NiJ9.eyJ1c2VybmFtZSI6ImVtcGFkbWluIiwiaWQiOjc5LCJyb2xlcyI6WyJST0xFX1NVUEVSX0FETUlOIiwiUk9MRV9VU0VSIl0sImlhdCI6MTU1MTEwNjA4NSwiZXhwIjo3ODU4MzA2MDg1fQ.DDGHdnJUrjfwW-WcZDaKy7jhQgp6dDwLPqDk0UK5_2OnNKHfRvZ-oIKxaHo4ifeoZfS4fJqdfXd0QnQWZi2wriOTT44DNUNGLADitBm6avP2ejRX70Tsif-Q6dpBp60DaiQ-AGCdjj09VzeqiearQNzI5DneAJ9r9HqELKmE5JFqO_EUD7M4cQE38tytGBoiaLFLyOphvjdqiivQ7l-10GxPYpAOj5T3zeQuq3jEpszmjHZhbovgvunY8lpX8TdvE44KNbP5r7ozj4wagiMW3FHPGZflerZURAejNUZtphFBnB4CHtzKUeSKdeki6m6VaFU6IT5XzRFU7kZoV4nx93YTjOWjc0XeMTKcy-OGsGDEtTQT6T0BL0IpP96hEd5K-jh5OkcD1JjI2Yuijp6PkzFeTFUdTJ5GJz_LGE34FmUw9Qwm2VUBV1qR5D951Dnbhv9Y2xJXja-sj8SVZAM42dZkp0xcVfBIe6Y_96C1QVp_JbVXi2NUKLZVcE0EXGlL46Sur8Rgq_jMWdfz9ZKLCWhx8vt2hVSQNSH01nFpZAC2YBIb6lc88E-PVIXCSG3RW3wzMSjehGs3TH9cOz3wJXpYiHhGbmRUsrBlLarad7EnGCwP50kBaiJh2jdNpPcQFC7gEG6GewVN7FfAxEg_m8OnBj93OY3LMc6j9IIJyu5"
const token1="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vdXNzYS5iZWppQHNhc3RlYy1ncm91cC5jb20iLCJpZCI6MTAyLCJyb2xlIjpbIm5pbCJdLCJleHAiOjE2MjQ2OTkyMjV9.KsBl7LW1vSJhERBRiRuZCKf63DDlq62_zyeErXGwfa_hJRrekoKUsFwEbURZ1QlKdgHfZb97pi5jm2UkNT4ngFVRCNXy4r5Mm4FFCP3Bk5QEUdMZiSTHJYK3Rp2Z0JxNlwDmmqVWBy-CX9-7sESzL76qLGARdtZxMKg_f9AH88fhI8_cOdjnJZX46l-VspUu3NCin4icD7IdTY4jyjt6VfbgezpV2ujfUKCXeDHQ5mKIES5R7ywyQDoazTY4NESJyRdLljC3WOk-CzaX_xA5XVAqBinzmPdJ-gZEtZUaMlt8xgRoMuIY-RxWRhFcHw65Kl6-_uOmIEkl7S3hpLy5dnlgI628RpZUFo2BhbD21OCPr8VuIChFgZCA9q-Va8gJBgkx9bQnSmiKeVBHg9zl7dQrI6zVWhat-dU7hfC_iq6ombZbKXra4Ca2pqQ7u2RMH30btkDYdpG7dw1bcfkxggUlMe9i7xtDtqv4sxT-GFLzq2yfaPmdvlA5oJKOP_Lq-l3splAbP5W6IK2v3Lops3664OkNy62CpdfYmYwSR1FAaWNatgQMu3Jh3Zq0ysDIPViE04ohz7vr0H2TRZ1c7-J9nKXtwx1x4qT-ZpPinE-dGkCiHxXZkkBtT7jz3ANmPYGV9KvxlPxSbs6uX99MEdpXVxAoZOfiD8T_smrFhVw"

const firstLink = new HttpLink({

    uri: 'https://mbeji-cloud-sandbox.webtv-solution.dev/query',
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