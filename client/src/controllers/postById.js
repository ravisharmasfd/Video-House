import axios from "axios"

const postById = async(id)=>{
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/post/${id}`);
    
    return res.data;
}
export default postById;