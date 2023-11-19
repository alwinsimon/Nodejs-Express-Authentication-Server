import mongoose from "mongoose";
import { Password } from "../utils/v1-api-utils/password";

// An interface that describes the properties that are required to create a new user
interface UserAttrs {
  email: string;
  password: string;
}

// An interface that describes the properties that a User Model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttrs): UserDoc;
}

// An interface that describes the properties that a User Document has.
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const newHashedPassword = await Password.toHash(this.get("password"));
    this.set("password", newHashedPassword);
  }
  done();
});

userSchema.statics.build = (attributes: UserAttrs) => {
  return new User(attributes);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
