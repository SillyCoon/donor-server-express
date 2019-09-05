import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donorinfo } from "./donorinfo";
import { IRoleOption } from '../abstract/IRoleOption';


@Entity("weight", { schema: "donorday" })
export class Weight implements IRoleOption {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 64,
        name: "text"
    })
    text: string;



    @OneToMany(() => Donorinfo, donorinfo => donorinfo.weight, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorinfos: Donorinfo[];

}
