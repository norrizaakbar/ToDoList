const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// UserSchema.pre("save", function (next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }

//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }

//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

UserSchema.pre("save", async function (next) {
  try {
    // Generate a salt
    // const salt = await bcrypt.genSalt(10);

    // Hash password with salt
    const hashPw = await bcrypt.hashSync(this.password);

    // Assign the hashed password to the user's password
    this.password = hashPw;
    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("Users", UserSchema);

module.exports = User;
