import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Donorinfo } from "./donorinfo";
import { UserRole } from "./user-role";
import * as bcrypt from "bcryptjs";

@Entity("user", { schema: "donorday" })
@Index("IDX_78a916df40e02a9deb1c4b75ed", ["email",], { unique: true })
export class BaseUser {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        name: "password"
    })
    password: string;


    @Column("varchar", {
        nullable: false,
        unique: true,
        name: "email"
    })
    email: string;


    @Column("datetime", {
        nullable: false,
        default: () => "'CURRENT_TIMESTAMP(6)'",
        name: "createdAt"
    })
    createdAt: Date;


    @Column("datetime", {
        nullable: false,
        default: () => "'CURRENT_TIMESTAMP(6)'",
        name: "updatedAt"
    })
    updatedAt: Date;



    @OneToOne(() => Donorinfo, donorinfo => donorinfo.id, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorinfo: Donorinfo | null;



    @OneToMany(() => UserRole, user_role => user_role.user, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    userRoles: UserRole[];

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        console.log(this.password);
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }

}
