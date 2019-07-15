import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { Donorinfo } from "./donorinfo";


@Entity("citizenship", { schema: "donorday" })
export class Citizenship {

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



    @OneToMany(type => Donorinfo, donorinfo => donorinfo.citizenship, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorinfos: Donorinfo[];

}
