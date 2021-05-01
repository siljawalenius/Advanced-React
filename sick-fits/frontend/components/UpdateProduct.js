import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import DisplayError from "./ErrorMessage";
import useForm from '../lib/useForm'
import Form from './styles/Form'

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      price
      description
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    # updateproduct function from gql
    updateProduct(
      id: $id
      data: {name: $name, description: $description, price: $price }
    ) {
      # return
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  //1. get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: id },
  });

  //2. get mutation to update the product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  //create some state for form inputs
  const { inputs, handleChange, resetForm, clearForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>
  if(error ) return <DisplayError />
  //3. get the form to handle updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
            variables: {
                id:id,
                    name: inputs.name,
                    description:inputs.description,
                    price:inputs.price
            }
        })
        console.log(res)
        
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          ></input>
        </label>

        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="price"
            value={inputs.price}
            onChange={handleChange}
          ></input>
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>

        <button type="submit"> Update Product </button>
      </fieldset>
    </Form>
  );
}
