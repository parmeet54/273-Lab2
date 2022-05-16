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

const GET_ITEM = gql`
  query ($item_ID: Int) {
    getItemById(item_ID: $item_ID) {
      item_ID
      name
      shop
      description
      price
      quantity
      category
      image
      shopname
    }
  }
`;

const GET_ITEMS_BY_SHOP = gql`
  query ($shop: Int) {
    getItemsByShop(shop: $shop) {
      item_ID
      name
      shop
      description
      price
      quantity
      category
      image
      shopname
    }
  }
`;

// Get ALL Items
export const useItems = () => {
  const { error, data, loading } = useQuery(GET_ITEMS);

  return {
    error,
    data,
    loading,
  };
};

// Get Single Item
export const useItem = (item_ID) => {
  const { error, data, loading } = useQuery(GET_ITEM, {
    variables: {
      item_ID,
    },
  });

  return {
    error,
    data,
    loading,
  };
};

// Get Items by Shop
export const GetItemsByShop = (shop) => {
  const { error, data, loading } = useQuery(GET_ITEMS_BY_SHOP, {
    variables: {
      shop,
    },
  });

  return {
    error,
    data,
    loading,
  };
};
