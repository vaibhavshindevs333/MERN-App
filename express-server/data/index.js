import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
];

export const users = [
    {
        _id: userIds[0],
        firstName: " ",
        lastName: " ",
        contact:"",
        email: " ",
        password: " ",
        picture: " ",
        location: " ",
        occupation: " ",
        createdAt: " ",
        updatedAt: " ",
        __v: 0,
      },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: " ",
    lastName: " ",
    location: " ",
    description: " ",
    picture: " ",
    userPicture: " ",
  },
];
