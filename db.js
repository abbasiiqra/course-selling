const mongoose = require("mongoose");
console.log("mongoose connected");
mongoose.connect(
  "mongodb+srv://abbasiiqra44:iqra1234@cluster0.f2yhrro.mongodb.net/course-app"
);

const Schema= mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;

const userSchema = Schema({
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
});
const courseSchema= Schema({
    title:{
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    imageUrl: String,
    creatorId: {
        type:ObjectId,
        ref:"userSchema",
        required:true
    }

});
const adminSchema = Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  }
});
const purchaseSchema = Schema({
  courseId: {
    type: ObjectId,
    ref:"courseSchema",
    required: true,
  },
  userId: {
    type: ObjectId,
    ref:"userSchema",   
    required: true,
  }
});

const userModel= mongoose.model("user",userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.exports ={
    userModel,
    courseModel,
    adminModel,
    purchaseModel
}
