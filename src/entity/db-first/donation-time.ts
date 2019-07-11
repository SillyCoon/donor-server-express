import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DonationPoint } from "./donation-point";
import { DonorTime } from "./donor-time";


@Entity("donation_time", { schema: "donorday" })
@Index("point_id", ["point",])
export class DonationTime {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;



    @ManyToOne(() => DonationPoint, donation_point => donation_point.donationTimes, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'point_id' })
    point: DonationPoint | null;


    @Column("datetime", {
        nullable: false,
        name: "date"
    })
    date: Date;


    @Column("int", {
        nullable: false,
        name: "donor_quantity"
    })
    donor_quantity: number;


    @Column("tinyint", {
        nullable: false,
        width: 1,
        name: "is_stopped"
    })
    is_stopped: boolean;


    @Column("tinyint", {
        nullable: false,
        width: 1,
        name: "is_historical"
    })
    is_historical: boolean;



    @OneToMany(() => DonorTime, donor_time => donor_time.donationTime, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorTimes: DonorTime[];

}
