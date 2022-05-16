import { useQuery, gql } from "@apollo/client";

const CREATE_SHOP = gql`
  mutation ($shop_ID: Int, $name: String, $username: String, $image: String) {
    createShop(
      shop_ID: $shop_id
      name: $name
      username: $username
      image: $image
    ) {
      shop_ID
      name
      username
      image
      total_sales
    }
  }
`;

const UPDATE_SHOP = gql`
  mutation ($shop_ID: Int, $name: String, $total_sales: Int, $image: String) {
    updateShop(
      shop_ID: $shop_ID
      name: $name
      total_sales: $total_sales
      image: $image
    ) {
      shop_ID
      name
      total_sales
      image
    }
  }
`;

// Create Shop
export const CreateShop = (shop_ID, name, username, total_sales, image) => {
  const { error, loading, data } = useQuery(CREATE_SHOP, {
    variables: {
      shop_ID,
      name,
      username,
      total_sales,
      image,
    },
  });
  return {
    error,
    data,
    loading,
  };
};

// Update Shop
export const UpdateShop = (shop_ID, name, total_sales, image) => {
  const { error, loading, data } = useQuery(UPDATE_SHOP, {
    variables: {
      shop_ID,
      name,
      total_sales,
      image,
    },
  });
  return {
    error,
    data,
    loading,
  };
};
