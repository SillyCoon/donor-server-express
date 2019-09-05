import { IRoleOption } from './../abstract/IRoleOption';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donorinfo } from "./donorinfo";


@Entity("citizenship", { schema: "donorday" })
export class Citizenship implements IRoleOption {

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



    @OneToMany(() => Donorinfo, donorinfo => donorinfo.citizenship, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorinfos: Donorinfo[];

}
