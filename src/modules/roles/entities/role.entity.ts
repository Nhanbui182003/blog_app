import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../enums/role.enum";
import { User } from "src/modules/users/entities/user.entity";
import { EntityHelper } from "src/utils/entity-hepler";

@Entity()
export class Role  extends EntityHelper{
    @Column({ nullable: false })
    value: UserRole;
  
    @ManyToMany(() => User, user => user.roles)
    users?: User[];
}
