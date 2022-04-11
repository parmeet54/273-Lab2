const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema ({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    about:{
        type: String,
    },
    address:{
        type: String,
    },
    city:{
        type: String,
    },
    country:{
        type: String,
    },
    dob:{
        type: String,
    },
    phone_no:{
        type: String,
    },
    image:{
        type: String,
        default:"/default.jpeg"
    }
});

// Hash the password
UserSchema.pre(
    'save',
    async function(next){
        const user = this;
        const hash= await bcrypt.hash(this.password,10);

        this.password = hash;
        next();
    }
)

// Validate the user login
UserSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password,user.password);

    return compare;
}

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;