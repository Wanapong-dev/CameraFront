import axios from "axios";

export const  createProduct = async(token,form) => {
    return axios.post('http://localhost:8000/api/product',form,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const  listProduct = async(token, count = 20) => {
    return axios.get('http://localhost:8000/api/products/'+count,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const  readProduct = async(token, id) => {
    return axios.get('http://localhost:8000/api/product/'+id,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const  deleteProduct = async(token, id) => {
    return axios.delete('http://localhost:8000/api/product/'+id,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const  updateProduct = async(token, id, form) => {
    return axios.put('http://localhost:8000/api/product/'+id,form,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const  uploadFiles = async(token,form) => {
    // console.log('form api frontend',form)
    return axios.post('http://localhost:8000/api/images',{
        image: form
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const  removeFiles = async(token,public_id) => {
    // console.log('form api frontend',form)
    return axios.post('http://localhost:8000/api/removeimages',{
        public_id
    },{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}