import { Exclude, Expose, Transform, Type } from "class-transformer";
import { RoleResponseDto } from "src/modules/roles/dto/responses/role.response.dto";

@Exclude()
export class UserProfileResponseDto{
    @Expose()
    id: string;

    @Expose()
    email: string;

    @Expose()
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    @Type(() => RoleResponseDto)
    roles: RoleResponseDto[]
}