import { httpBaseV2 } from "@/app/config/api-base-v2";
import { UserResponse, CreateUser } from "../types";

export const getUsers = async () => httpBaseV2.get<UserResponse[]>("/user");

export const createUser = async (user: CreateUser) =>
  httpBaseV2.post<void>("/user", user);
