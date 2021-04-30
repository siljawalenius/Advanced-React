import { useMutation } from '@apollo/client';
import gql from 'graphql-tag'
import useForm from '../lib/useForm'
import Form from './styles/Form'
import DisplayError from './ErrorMessage'
import {ALL_PRODUCTS_QUERY} from './Products'
import Router from 'next/router'

const CREATE_PRODUCT_MUTATION = gql`
    mutation CREATE_PRODUCT_MUTATION(
        # which variables get passed in and their types
        # a ! means required
        $name: String! 
        $description: String!
        $price: Int!
        $image: Upload
    ){
        createProduct(data:{
            name: $name
            description: $description
            price: $price
            status: "AVAILABLE"
            photo: {
                create: {
                    image: $image,
                    altText: $name
                }
            }
        }){
            id
            price
            description
            name

        }
    }
`;



export default function CreateProduct() {

    //set initial values here 
    const { inputs, handleChange, resetForm, clearForm } = useForm({
        image: '',
        name: '',
        price: 0,
        description: ''
    });

    const [createProduct, {loading, error, data}] = useMutation(CREATE_PRODUCT_MUTATION, {
        variables: inputs,
        refetchQueries:[{query: ALL_PRODUCTS_QUERY}]
    })



    return (
        <Form onSubmit = {async (e) => {
            e.preventDefault();
            console.log(inputs)
            //submit input fields to backend
            const response = await createProduct();
            //console.log(res)
            clearForm()
            //now, go to the product page
            Router.push({
                pathname: `/product/${response.data.createProduct.id}`,
            })

        }}>
            <DisplayError error = {error}></DisplayError>
            <fieldset disabled = {loading} aria-busy = {loading}>

            <label htmlFor = "image">
                Image
                <input 
                    type = "file" 
                    id = "image" 
                    name = "image" 
                    onChange = {handleChange}
                ></input>
            </label>
            <label htmlFor = "name">
                Name
                <input 
                    type = "text" 
                    id = "name" 
                    name = "name" 
                    placeholder = "Name"
                    value = {inputs.name}
                    onChange = {handleChange}
                ></input>
            </label>

            <label htmlFor = "price">
                Price
                <input 
                    type = "number" 
                    id = "price" 
                    name = "price" 
                    placeholder = "price"
                    value = {inputs.price}
                    onChange = {handleChange}
                ></input>
            </label>

            <label htmlFor = "description">
                Description
                <textarea 
                    id = "description" 
                    name = "description" 
                    placeholder = "Description"
                    value = {inputs.description}
                    onChange = {handleChange}
                ></textarea>
            </label>

            <button type = "submit"> + Add product </button>
            
            </fieldset>
        </Form>
    )
}