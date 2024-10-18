import mongoose from "mongoose";



export const userSchema = mongoose.Schema({
    name :{ 
        type : String,
        require : true
    },
    phone :{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true 
    },
    password:{
        type : String,
        require : true
    },
    auto :{
        type : String
    },
    address:{
        type : String
    },
    basket :{
        type: [Object], 
        default: []
    }
})

const User = mongoose.model('User', userSchema);

export default User;