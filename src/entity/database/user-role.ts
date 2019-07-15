import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { BaseUser } from "./user";
import { Role } from "./role";


@Entity("user_role", { schema: "donorday" })
@Index("user_id", ["user",])
@Index("role_id", ["role",])
export class UserRole {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id?: number;

    @Column({ nullable: true, name: 'user_id' })
    userId: number

    @Column({ nullable: true, name: 'role_id' })
    roleId: string

    @ManyToOne(type => BaseUser, user => user.userRoles, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'user_id' })
    user?: BaseUser | null;

    @ManyToOne(type => Role, role => role.userRoles, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'role_id' })
    role?: Role | null;

}
