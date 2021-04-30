import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';
import { useState } from 'react'

export default function useForm(initial = {}){
    //create a state object for our own fields 
    const [inputs, setInputs] = useState(initial);
    

//state we're passing in 
    // Name: Silja
    // description: asdfg
    // price: 2000 

    function handleChange(e){
        //take care of numbers changing to strings
        let { value, name, type } = e.target
        if (type === 'number'){
            value = parseInt(value)
        }
        if (type === 'file'){
            [value] = e.target.files
        }
        setInputs({
            //copy existing state
            ...inputs,

            //update the piece of state we need to 
            //name is the name of the input
            [name]: value,
        })
    }

    function resetForm(){
        setInputs(initial);
    }

    function clearForm(){
        //object.entries returns an array of the objects properties 
        const blankState = Object.fromEntries(Object.entries(inputs).map(
            ([key, value]) => [key, '']
        ))
        
        setInputs(blankState)
    }

    //return the things we want to "surface" from the hook 
    return{
        inputs, 
        handleChange,
        resetForm,
        clearForm
    }
}

