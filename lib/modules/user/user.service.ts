import {
    BadRequest,
    NotFound,
    UnprocessableEntity,
  } from "@/lib/utilities/error";
  import { Prisma } from "@prisma/client";
  import errors from "constants/errors";
  import bcrypt from "bcrypt";
  
  import * as validator from "./users.validator";
  import * as dal from "./users.dal";

  import {
    AgreementBody,
    GetRegistrationBody,
    RegistrationBody,
    SendResetLinkBody,
    VerificationBody,
    ValidateResetLinkParams,
    ResetPasswordBody,
    CanGenerateCVBody,
  } from "@/lib/utilities/types";
  import sendEmail from "@/lib/utilities/sendEmail";
  import {
    confirmationEmailTemplate,
    sendResetPasswordLinkTemplate,
  } from "@/lib/utilities/emailTemplates";
  import { generateKey } from "@/lib/utilities/general";
  
  
  
  export const addUserAgreement = async (userId: string, body: AgreementBody) => {
    validator.validateAgreementBody(body);
  
    const query: Prisma.UserWhereInput = {
      id: userId,
    };
    const foundUser = await dal.findUser(query);
  
    if (!foundUser) throw new BadRequest(errors.USERS.NOT_FOUND);
  
    const updateBody: Prisma.UserUpdateInput | Prisma.UserUncheckedUpdateInput = {
      agreed: true,
    };
  
    const user = await dal.updateUserById(foundUser.id, updateBody);
    return { agreed: user.agreed };
  };
  