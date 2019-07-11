import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DonorTimeDoc } from "./donor-time_doc";


@Entity("donor_document", { schema: "donorday" })
export class DonorDocument {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 128,
        name: "description"
    })
    description: string;



    @OneToMany(() => DonorTimeDoc, donor_time_doc => donor_time_doc.document, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorTimeDocs: DonorTimeDoc[];

}
