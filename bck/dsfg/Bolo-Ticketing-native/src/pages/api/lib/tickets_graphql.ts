import { gql } from "@apollo/client";

//getting customer tickets
export const GET_CUSTOMER_TICKETS = gql`
  query getCustomerTickets($input: GetCustomerTicketsInput!) {
    getCustomerTickets(input: $input) {
      ID {
        ID
      }
      title
      endUserData {
        firstName
        lastName
        contact {
          phone
          email
        }
      }
      timeStampData {
        createdOn
        lastUpdatedOn
      }
    }
  }
`;

//getting customer ticket details
export const GET_TICKET_DETAIL = gql`
  query getCustomerTicketDetails($input: GetCustomerTicketDetailsInput!) {
    getCustomerTicketDetails(input: $input) {
      ID {
        ID
      }
      endUserData {
        firstName
        lastName
        contact {
          email
          phone
        }
      }
      ticketDetails {
        title
        description
      }
    }
  }
`;

//customer ticket delete mutation
export const CUSTOMER_DELETE_TICKET = gql`
  mutation deleteCustomerTicket($input: DeleteCustomerTicketInput!) {
    deleteCustomerTicket(input: $input)
  }
`;

//Customer bulk delete mutation
export const BULK_DELETE_CUSTOMER_TICKETS = gql`
  mutation bulkDeleteCustomerTickets($input: BulkDeleteCustomerTicketsInput!) {
    bulkDeleteCustomerTickets(input: $input)
  }
`;

//Customer Create tickets mutation
export const CREATE_CUSTOMER_TICKETS = gql`
  mutation createCustomerTicket($input: CreateCustomerTicketInput!) {
    createCustomerTicket(input: $input) {
      ID {
        ID
      }
    }
  }
`;
