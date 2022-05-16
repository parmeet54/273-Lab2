import { useQuery, gql } from "@apollo/client";

const CREATE_ORDER = gql`
  mutation (
    $order_ID: Int
    $username: String
    $items: List
    $total: Float
    $date_purc: String
  ) {
    createOrder(
      order_ID: $order_ID
      username: $username
      items: $items
      total: $total
      date_purc: $date_purc
    ) {
      order_ID
      username
      items {
        item_ID
        name
        totalPrice
        quantity
      }
      total
      date_purc
    }
  }
`;

// Create Order
export const CreateOrder = (order_ID, username, items, total, date_purc) => {
  const { error, loading, data } = useQuery(CREATE_ORDER, {
    variables: {
      order_ID,
      username,
      items,
      total,
      date_purc,
    },
  });
  return {
    error,
    data,
    loading,
  };
};
