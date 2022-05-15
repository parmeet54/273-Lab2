import { useQuery, gql } from "@apollo/client";

const GET_ITEMS = gql`
  query {
    getAllItems {
      item_ID
      name
      shop
      shopname
      description
      price
      quantity
      category
      fav
      image
    }
  }
`;

export const useItems = () => {
  const { error, data, loading } = useQuery(GET_ITEMS);

  return {
    error,
    data,
    loading,
  };
};
