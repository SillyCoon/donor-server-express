import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donorinfo } from "./donorinfo";
import { IRoleOption } from '../abstract/IRoleOption';


@Entity("registration", { schema: "donorday" })
export class Registration implements IRoleOption {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 128,
        name: "text"
    })
    text: string;



    @OneToMany(() => Donorinfo, donorinfo => donorinfo.registration, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorinfos: Donorinfo[];

}
