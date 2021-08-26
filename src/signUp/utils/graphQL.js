import gql from "graphql-tag";

export const graphQL_shema = ()=> {

    const SignUp = gql`
        mutation($input:CreateUserInput!) {
            addUser(input:$input) {
                code
                message
                token
            }

        }
    `;
    const CreateCustomer = gql `
    mutation ($email:String!) {
     createCustomer(email:$email) {
      code
      message
      customerId
     }
    }
    `
    const CreateSubscription = gql `
  mutation ($input:PaymentSubscriptionInput) {
  createSubscription(input:$input) {
      code
      message
      subscriptionId
      clientSecret
      customerId
  }
}
    `
    const payementIntent = gql `
    mutation ($input:PaymentIntentInput!) {
  createPaymentIntent(input:$input) {
      code
      message
      clientSecret

  }
}
    `

    return({
        SignUp,
        CreateCustomer,
        CreateSubscription,
        payementIntent
    })
}