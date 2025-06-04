import { httpBaseV2 } from "@/app/config/api-base-v2";
import { UserResponse } from "../types";

export const getUsers = async () => httpBaseV2.get<UserResponse[]>("/user");
