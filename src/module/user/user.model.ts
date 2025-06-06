import { model, Model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import MongooseHelper from "../../utility/mongoose.helpers";
import { IAuthProvider, Role } from "../auth/auth.interface";

const isRequired = function (this: IUser): boolean {
  return !!this.isAuthProvider;
};
const requiredProvider = function (this: IUser): boolean {
  return !this.isAuthProvider;
};
const isProvider = function (this: IUser): boolean {
  return !!this.authProvider;
};

export const UserSchema: Schema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: isRequired,
    },
    lastName: {
      type: String,
      required: isRequired,
    },
    userName: {
      type: String,
      required: isRequired,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email must be unique"],
    },
    password: {
      type: String,
      required: isRequired,
    },
    role: {
      type: String,
      enum: Role,
      required: [true, "Role is required"],
    },
    photo: {
      type: String,
      required: false,
    },
    mobile: {
      type: String,
      required: isRequired,
    },
    location: {
      type: String,
      required: isRequired,
    },
    isAuthProvider: {
      type: Boolean,
      required: [isProvider, "Declare is this auth provider or not"],
    },
    authProvider: {
      type: [
        {
          sub: {
            type: String,
            required: requiredProvider,
          },
          authProviderName: {
            type: String,
            required: requiredProvider,
          },
        },
      ],
      required: requiredProvider,
    },
    passwordUpdatedAt: {
      type: Date,
      default: Date.now(),
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

MongooseHelper.preSaveHashPassword(UserSchema);

MongooseHelper.comparePasswordIntoDb(UserSchema);
MongooseHelper.findExistence<IUser>(UserSchema);

MongooseHelper.applyToJSONTransform(UserSchema);

const User: Model<IUser> = model<IUser>("User", UserSchema);
export default User;
