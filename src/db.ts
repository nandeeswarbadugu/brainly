import mongoose,{Schema,Document} from "mongoose";

// interface User extends Document {
//     username:string,
//     password:string
// }

const UserSchema = new Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

const ContentSchema = new Schema({
    title: String,
    link: String,
    tags: [{
        type: mongoose.Types.ObjectId, ref: 'Tag'
    }],
    type: String,
    userId:{type:mongoose.Types.ObjectId, ref: 'User', required:true}
})


export const UserModel = mongoose.model("users",UserSchema);
export const ContentModel = mongoose.model("conent",ContentSchema);

