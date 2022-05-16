import { useQuery, gql } from "@apollo/client";

const GET_ORDERS = gql`
  query ($username: String) {
    getOrdersByUser(username: $username) {
      order_ID
      username
      total
      date_purc
      items {
        item_ID
        name
        shop
        price
        totalPrice
        quantity
        stock
        image
      }
    }
  }
`;

export const useOrders = (username) => {
  const { error, data, loading } = useQuery(GET_ORDERS, {
    variables: {
      username,
    },
  });

  return {
    error,
    data,
    loading,
  };
};
