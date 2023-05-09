import mongoose from "mongoose";

const userIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
];

const groupIds = [
    new mongoose.Types.ObjectId(),
    new mongoose.Types.ObjectId(),
]

export const groups = [
    {
        _id: groupIds[0],
        name: "Global",
        description: "Group Global",
        members:  [userIds[0], userIds[1]]
    },
    {
        _id: groupIds[1],
        name: "Not in Global",
        description: "Not in Global",
        members: [userIds[2]]
    }
]

export const users = [
    {
        _id: userIds[0],
        firstName: "test",
        lastName: "me",
        email: "aaaaaaa@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
        picturePath: "p2.jpeg",
        group: groupIds[0],
        createdAt: 1115211422,
        updatedAt: 1115211422,
    },
    {
        _id: userIds[1],
        firstName: "test123",
        lastName: "me123",
        email: "aaaaaaatests@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUyz",
        picturePath: "p2.jpeg",
        group: groupIds[0],
        createdAt: 1115211423,
        updatedAt: 1115211423,
    },
    {
        _id: userIds[2],
        firstName: "NootIn",
        lastName: "NootIn",
        email: "aaaaaaatestsNotIn@gmail.com",
        password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUyy",
        picturePath: "p1.jpeg",
        group: groupIds[1],
        createdAt: 1115211424,
        updatedAt: 1115211424,
    },]
export const posts = [
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[1],
        firstName: "test",
        lastName: "me",
        description: "Some really long random description",
        picturePath: "post1.jpeg",
        userPicturePath: "p2.jpeg",
        group: groupIds[0]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[0],
        firstName: "test123",
        lastName: "me123",
        description: "Some really long random descriptionsssss",
        picturePath: "post2.jpeg",
        userPicturePath: "p1.jpeg",
        group: groupIds[0]
    },
    {
        _id: new mongoose.Types.ObjectId(),
        userId: userIds[2],
        firstName: "NootIn",
        lastName: "NootIn",
        description: "Some really long random descriptionsssss",
        picturePath: "post2.jpeg",
        userPicturePath: "p1.jpeg",
        group: groupIds[1]
    },
]