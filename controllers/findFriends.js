import User from '../models/user.js';

const findFriends = async(req,res)=>{
    try {
        const page = req.params.page;
        if(!page) page = 0;
        const find = await User.find({},{firstName:1,lastName:1,userName:1,_id:1,followers:1}).limit({$limit: 50}).skip(page*20)
        res.json(find)
    } catch (error) {
        res.status(500)
    }
    
}
export default findFriends;