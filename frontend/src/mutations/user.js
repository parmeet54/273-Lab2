import { useQuery, gql } from "@apollo/client";

const CREATE_USER = gql`
  mutation ($username: String, $name: String, #email: String, $password: String) {
    createUser(
      username: $username
      name: $name
      email: $email
      password: $password
    ) {
      username
      name
      email
    }
  }
`;

const UPDATE_USER = gql`
  mutation (
    $username: String
    $name: String
    $about: String
    $dob: String
    $address: String
    $city: String
    $country: String
    $phone_no: String
    $image: String
  ) {
    updateUser(
      username: username
      name: name
      about: about
      dob: dob
      address: address
      city: city
      country: country
      phone_no: phone_no
      image: image
    ) {
      name
      about
      dob
      address
      city
      country
      phone_no
      image
    }
  }
`;

// Create User
export const CreateUser = (username, name, email, password) => {
  const { error, loading, data } = useQuery(CREATE_USER, {
    variables: { username, name, email, password },
  });
  return {
    error,
    data,
    loading,
  };
};

// Update User
export const UpdateUser = (
  username,
  name,
  dob,
  address,
  city,
  country,
  phone_no,
  image
) => {
  const { error, loading, data } = useQuery(UPDATE_USER, {
    variables: {
      username,
      name,
      dob,
      address,
      about,
      city,
      country,
      phone_no,
      image,
    },
  });
  return {
    error,
    data,
    loading,
  };
};
