import { Prisma, User } from "@prisma/client";
import prisma from "config/prisma";


export const findUser = async (
  query: Prisma.UserWhereInput,
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: query,
  });
  return user;
};

