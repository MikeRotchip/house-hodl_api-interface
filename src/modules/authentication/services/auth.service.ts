import { Auth } from '../entities';
import { AuthRole } from '../enums';

export type RoleEditOutput = {
  succeeded: AuthRole[];
  failed: AuthRole[];
};

enum RoleOperation {
  ADD,
  REMOVE,
}

export class AuthService {
  constructor(private auth: Auth, private token: string) {}

  getAuthEntity(): Auth {
    return this.auth;
  }

  getToken(): string {
    return this.token;
  }

  addRoles(roles: AuthRole[]): RoleEditOutput {
    const output: RoleEditOutput = { succeeded: [], failed: [] };

    for (const role of roles) {
      const res = this.addRole(role);
      if (res) {
        output.succeeded.push(role);
      } else {
        output.failed.push(role);
      }
    }

    return output;
  }

  removeRoles(account: Auth, roles: AuthRole[]): RoleEditOutput {
    const output: RoleEditOutput = { succeeded: [], failed: [] };

    for (const role of roles) {
      const res = this.removeRole(role);
      if (res) {
        output.succeeded.push(role);
      } else {
        output.failed.push(role);
      }
    }

    return output;
  }

  isGranted(role: AuthRole): boolean {
    return !!(this.auth.roles & (1 << role));
  }

  // return true on success, otherwise false
  addRole(role: AuthRole): boolean {
    if (this.isGranted(role)) {
      return false;
    }

    this.setRole(role, RoleOperation.ADD);

    return true;
  }

  // return true on success, otherwise false
  removeRole(role: AuthRole): boolean {
    if (!this.isGranted(role)) {
      return false;
    }

    this.setRole(role, RoleOperation.REMOVE);

    return true;
  }

  private setRole(bit: number, operation: RoleOperation): number {
    const num = 1 << bit;

    if (operation === RoleOperation.ADD) {
      this.auth.roles |= num;
    } else if (operation === RoleOperation.REMOVE) {
      this.auth.roles &= ~num;
    }

    return this.auth.roles;
  }
}
