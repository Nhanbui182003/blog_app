import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<number[]>('roles', [
      context.getClass(),
      context.getHandler(),
    ]);

    if (!roles.length) {
      return true;
    }
    
    const request = context.switchToHttp().getRequest();
    const userRoles = request.user?.roles?.map(role => role.value);
    const hasPermission = roles.some(item => userRoles.includes(item));
    
    if (!hasPermission) {
      throw new ForbiddenException();
    }
    return true;
  }
}
