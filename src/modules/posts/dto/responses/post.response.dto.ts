import { Exclude, Expose, Type } from "class-transformer";
import { CategoryResponseDto } from "src/modules/categories/dto/responses/category.reponse.dto";
import { TagResponseDto } from "src/modules/tags/dto/responses/tag.response.dto";
import { UserProfileResponseDto } from "src/modules/users/dto/responses/user-profile.response.dto";

@Exclude()
export class PostResponseDTO {
    @Expose()
    id : string;

    @Expose()
    title: string;

    @Expose()
    content: string;

    @Expose()
    @Type(() => UserProfileResponseDto)
    user: UserProfileResponseDto;

    @Expose()
    @Type(() => CategoryResponseDto)
    category: CategoryResponseDto;

    @Expose()
    @Type(() => TagResponseDto)
    tags?: TagResponseDto[]

}