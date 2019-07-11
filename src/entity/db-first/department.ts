import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
import { MaterialAid } from "./material-aid";


@Entity("department", { schema: "donorday" })
export class Department {

    @Column("varchar", {
        nullable: false,
        primary: true,
        length: 32,
        name: "id"
    })
    id: string;


    @Column("varchar", {
        nullable: false,
        length: 128,
        name: "name"
    })
    name: string;



    @OneToMany(type => MaterialAid, material_aid => material_aid.department, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    materialAids: MaterialAid[];

}
