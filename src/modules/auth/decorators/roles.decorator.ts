import { SetMetadata } from "@nestjs/common";

export const RolesDecorator = (...roles: number[]) => SetMetadata('roles',roles)