import { Post } from "src/modules/posts/entities/post.entity";
import { Role } from "src/modules/roles/entities/role.entity";
import { EntityHelper } from "src/utils/entity-hepler";
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";

@Entity()
export class User extends EntityHelper{
    @Column({ type: String, nullable: false })
    email: string;
  
    @Column({ type: String, nullable: true })
    firstName?: string;
  
    @Column({ type: String, nullable: true })
    lastName?: string;
  
    @Column({ type: String, nullable: false })
    password: string;
    
    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_role',
        joinColumn: {
            name: 'userId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'roleId',
            referencedColumnName: 'id',
        },
    })
    roles?: Role[];

    @OneToMany(() => Post, post => post.user)
    posts: Post[]
}
