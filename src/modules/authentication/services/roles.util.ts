import { AuthRole } from '../enums';

export const rolesUtil = (roles: AuthRole[]): number => {
  let rolesNumber = 0;
  for (const role of roles) {
    rolesNumber |= 1 << role;
  }

  return rolesNumber;
};
