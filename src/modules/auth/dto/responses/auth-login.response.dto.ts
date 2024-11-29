import { Exclude, Expose, Type } from "class-transformer";
import { UserProfileResponseDto } from "src/modules/users/dto/responses/user-profile.response.dto";

@Exclude()
export class AuthLoginResponseDto {
  @Expose()
  token: string;

  @Expose()
  tokenExpires: number;

  @Expose()
  @Type(() => UserProfileResponseDto)
  user: UserProfileResponseDto;
}