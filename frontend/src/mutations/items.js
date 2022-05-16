import { useQuery, gql } from "@apollo/client";

const CREATE_ITEM = gql`
  mutation (
    $name: String
    $shop: Int
    $shopname: String
    $category: String
    $description: String
    $price: Float
    $quantity: Int
    $image: String
  ) {
    createItem(
      name: $name
      shop: $shop
      shopname: $shopname
      category: $category
      description: $description
      price: $price
      quantity: $quantity
      image: $image
    ) {
      name
    }
  }
`;

const UPDATE_ITEM = gql`
mutation (
    $item_ID
    $name: String
    $category: String
    $description: String
    $price: Float
    $quantity: Int
    $image: String
  ) {
    updateItem(
        item_ID: $item_ID
        name: $name
        category: $category
        description: $description
        price: $price
        quantity: $quantity
        image: $image
      ) {
        name

      }
    }
  `;

const UPDATE_ITEM_QUANTITY = gql`
mutation (
    $item_ID
    $quantity: Int
    ) {
        updateItemQuantity(
            item_ID: $item_ID
            quantity: $quantity
          ) {
            item_ID
            quantity
          }
        }
      `;

// Create Item
export const CreateItem = (
  name,
  shop,
  shopname,
  description,
  category,
  price,
  quantity,
  image
) => {
  const { error, loading, data } = useQuery(CREATE_ITEM, {
    variables: {
      name,
      shop,
      shopname,
      description,
      category,
      price,
      quantity,
      image,
    },
  });
  return {
    error,
    data,
    loading,
  };
};

// Update Item
export const UpdateItem = (
  item_ID,
  name,
  shop,
  shopname,
  description,
  category,
  price,
  quantity,
  image
) => {
  const { error, loading, data } = useQuery(UPDATE_ITEM, {
    variables: {
      item_ID,
      name,
      shop,
      shopname,
      description,
      category,
      price,
      quantity,
      image,
    },
  });
  return {
    error,
    data,
    loading,
  };
};

// Update Item Quantity
export const UpdateItemQuantity = (item_ID, quantity) => {
  const { error, loading, data } = useQuery(UPDATE_ITEM_QUANTITY, {
    variables: { item_ID, quantity },
  });
  return {
    error,
    data,
    loading,
  };
};
