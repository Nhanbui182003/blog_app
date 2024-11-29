import { Post } from "src/modules/posts/entities/post.entity";
import { EntityHelper } from "src/utils/entity-hepler";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Category extends EntityHelper {
    @Column({ type: 'varchar', length: 100 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    description: string

    @OneToMany(() => Post, post => post.category)
    posts: Post[]
}
