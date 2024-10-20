import axios from "axios";

export const  listUsers = async(token) => {
    return axios.get('http://localhost:8000/api/users',{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const updateMember = (token, id, form) => {
    return axios.post("http://localhost:8000/api/change-role", { id, ...form }, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
  };

  export const changeUserStatus = (token, id, enabled) => {
    return axios.post("http://localhost:8000/api/change-status",{ id, enabled },  {
        headers: {
          Authorization: `Bearer ${token}`,  
        },
      });
  };