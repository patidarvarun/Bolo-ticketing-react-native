import { gql } from "@apollo/client";

//customers login mutation
export const LOGIN_MUTATION = gql`
  mutation LoginCustomer($input: LoginCustomerInput!) {
    loginCustomer(input: $input) {
      jwt
      customerID {
        ID
      }
    }
  }
`;

//customers create mutation
export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      id
      email
    }
  }
`;

//Customers detail update mutation
export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer($id: ID!, $input: UpdateCustomerInput!) {
    updateCustomer(id: $id, input: $input)
  }
`;

//Customer create api mutation
export const CREATE_CUSTOMER_API = gql`
  mutation createCustomerAPIKey($input: CreateAPIKeysInput!) {
    createCustomerAPIKey(input: $input) {
      apiKey
    }
  }
`;

//customer create login api key
export const CUSTOMER_LOGIN_API_KEY = gql`
  mutation loginApiKey($input: LoginApiKeyInput!) {
    loginApiKey(input: $input) {
      jwt
      serviceLocations {
        serviceType
      }
    }
  }
`;

//get customer api key
export const GET_CUSTOMER_API_KEY = gql`
  query getCustomerAPIKeys($input: GetAPIKeysInput!) {
    getCustomerAPIKeys(input: $input) {
      apiKey
    }
  }
`;
