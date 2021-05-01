import { useMutation } from "@apollo/client"
import gql from "graphql-tag"


const DELETE_PRODUCT_MUTATION = gql`
    mutation DELETE_PRODUCT_MUTATION($id: ID!){
        deleteProduct(id: $id){
            id
            name
        }
    }
`

function update(cache, payload){
    console.log(payload)
    console.log('updating after delete...')
    //evict the deleted item from the cache to make it disappear 
    cache.evict(cache.identify(payload.data.deleteProduct))
}

export default function DeleteProduct({id, children}) {
    const [deleteProduct, {loading, error}] = useMutation(
        DELETE_PRODUCT_MUTATION, 
        {
            variables: {id: id},
            update: update
        }
    )
    return (
        <button type = "button" onClick={() =>{ 
               if( confirm('Are you sure you want to delete this item?')){
                  // console.log('BYE')
                  //1. delete this item
                  deleteProduct().catch((err) => alert(err.message))
                  
                  //2. wirte a mutation to delete it from backend
               }
            }}>
            {children}
        </button>
    )
}
