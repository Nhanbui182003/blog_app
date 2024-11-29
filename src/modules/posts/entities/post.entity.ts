import { Category } from "src/modules/categories/entities/category.entity";
import { Tag } from "src/modules/tags/entities/tag.entity";
import { User } from "src/modules/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-hepler";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

@Entity()
export class Post extends EntityHelper{
    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column()
    image: string;

    @Column({ type: 'text' })
    content: string;

    @ManyToOne(() => User , user => user.posts)
    user: User;

    @ManyToOne(() => Category , Category => Category.posts, {onDelete: "CASCADE"})
    category: Category;

    @ManyToMany(() => Tag, tag => tag.posts, {
        cascade: true,
    })
    @JoinTable({
        name: 'post_tag',
        joinColumn: {
            name: 'postId',
            referencedColumnName: 'id'
        },
        inverseJoinColumn: {
            name: 'tagId',
            referencedColumnName: 'id'
        }
    })
    tags? : Tag[]
}
