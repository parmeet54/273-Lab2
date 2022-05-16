import { useQuery, gql } from "@apollo/client";

const GET_SHOP_BY_ID = gql`
  query ($shop_ID: Int) {
    getShopByID(shop_ID: $shop_ID) {
      shop_ID
      name
      username
      total_sales
      image
    }
  }
`;

const GET_SHOP_BY_USER = gql`
  query ($username: String) {
    getShopByUser(username: $username) {
      shop_ID
      name
      username
      total_sales
      image
    }
  }
`;

// Get ALL Shops
export const getShop = () => {
  const { error, data, loading } = useQuery(GET_SHOP_BY_ID);

  return {
    error,
    data,
    loading,
  };
};

// Get Single Item
export const getShopByUser = (username) => {
  const { error, data, loading } = useQuery(GET_SHOP_BY_USER, {
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
