import { Exclude, Expose } from "class-transformer"

@Exclude()
export class RoleResponseDto {
    @Expose()
    value: number
}