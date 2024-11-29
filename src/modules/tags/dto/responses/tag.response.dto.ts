import { Exclude, Expose } from "class-transformer";

@Exclude()
export class TagResponseDto{
    @Expose()
    id: string;

    @Expose()
    name: string;
}