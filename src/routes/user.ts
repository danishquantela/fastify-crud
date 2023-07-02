import {
  deleteUserHandler,
  getUserHandler,
  getUsersHandler,
  postUserHandler,
  updateUserHandler,
} from "../controllers/users";

const User = {
  type: "object",
  properties: {
    _id: { type: "string" },
    name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
  },
};
const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: User,
      },
    },
  },
  handler: getUsersHandler,
};
const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUserHandler,
};
const postUserOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: { type: "string" },
        email: { type: "string" },
        password: { type: "string" },
      },
    },
    response: {
      201: User,
    },
  },
  handler: postUserHandler,
};

const patchUserOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          user: User,
        },
      },
    },
  },
  handler: updateUserHandler,
};

const deleteUserOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
          user: User,
        },
      },
    },
  },
  handler: deleteUserHandler,
};

const userRoutes = (app: any, options: any, done: any) => {
  app.get("/", getUsersOpts);
  app.get("/:id", getUserOpts);
  app.post("/", postUserOpts);
  app.put("/:id", patchUserOpts);
  app.delete("/:id", deleteUserOpts);

  done();
};

export default userRoutes;
