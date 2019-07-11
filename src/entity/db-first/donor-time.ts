import { Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Donorinfo } from "./donorinfo";
import { DonationTime } from "./donation-time";
import { DonationStatus } from "./donation-status";
import { DonorTimeDoc } from "./donor-time_doc";


@Entity("donor_time", { schema: "donorday" })
// @Index("donor_id",["donor",])
@Index("donation_time_id", ["donationTime",])
@Index("status_id", ["status",])
export class DonorTime {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;



    @ManyToOne(() => Donorinfo, donorinfo => donorinfo.donorTimes, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'donor_id' })
    donor: Donorinfo | null;



    @ManyToOne(() => DonationTime, donation_time => donation_time.donorTimes, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'donation_time_id' })
    donationTime: DonationTime | null;



    @ManyToOne(() => DonationStatus, donation_status => donation_status.donorTimes, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'status_id' })
    status: DonationStatus | null;



    @OneToMany(() => DonorTimeDoc, donor_time_doc => donor_time_doc.donorTime, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorTimeDocs: DonorTimeDoc[];

}
