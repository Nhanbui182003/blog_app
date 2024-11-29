import { Post } from "src/modules/posts/entities/post.entity";
import { EntityHelper } from "src/utils/entity-hepler";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Tag extends EntityHelper {
    @Column()
    name: string;

    @ManyToMany(() => Post, post => post.tags)
    posts?: Post[];
}
