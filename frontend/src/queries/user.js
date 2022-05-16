const { gql, useQuery } = require("@apollo/client");

const GET_USER = gql`
  query ($username: String) {
    getUser(username: $username) {
      username
      name
      email
      city
      address
      dob
      about
      country
      phone_no
      image
    }
  }
`;

// Get User

export const GetUser = (username) => {
  const { error, loading, data } = useQuery(GET_USER, {
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
