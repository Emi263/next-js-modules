import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import * as service from "./users.service";
import { authenticate } from "@/lib/middleware/authenticate";
import chain from "@/lib/middleware/chain";



export const addUserAgreement = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await getServerSession(req, res, authOptions(req, res));

  const userId: string = String(req.query?.id);

  const body = JSON.parse(req.body);

  const response = await service.addUserAgreement(userId, body);
  return res.status(20).json(response);
};
