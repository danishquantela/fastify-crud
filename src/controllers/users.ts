import { FastifyReply, FastifyRequest, RequestBodyDefault } from "fastify";
import User from "../models/users";
import { User as UserInterface } from "../types/user";

export const getUsersHandler = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await User.find();
    reply.send(users);
  } catch (err) {
    console.log(err);
  }
};

export const getUserHandler = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    reply.send(user);
  } catch (err) {
    console.log(err);
  }
};

export const postUserHandler = async (
  req: FastifyRequest<{ Body: UserInterface }>,
  reply: FastifyReply
) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const user = new User({ name, email, password });
    await user.save();
    reply.send(user);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserHandler = async (
  req: FastifyRequest<{ Body: UserInterface; Params: { id: number } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );

    reply.send({ user, message: "User updated successfully" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserHandler = async (
  req: FastifyRequest<{ Params: { id: string } }>,
  reply: FastifyReply
) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      reply.code(404).send({ message: "User not found" });
    }
    reply.send({ user, message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};
