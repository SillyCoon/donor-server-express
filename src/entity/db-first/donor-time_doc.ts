import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DonorTime } from "./donor-time";
import { DonorDocument } from "./donor-document";


@Entity("donor_time_doc", { schema: "donorday" })
@Index("donor_time_id", ["donorTime",])
@Index("document_id", ["document",])
export class DonorTimeDoc {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;



    @ManyToOne(() => DonorTime, donor_time => donor_time.donorTimeDocs, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'donor_time_id' })
    donorTime: DonorTime | null;



    @ManyToOne(() => DonorDocument, donor_document => donor_document.donorTimeDocs, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'document_id' })
    document: DonorDocument | null;

}
