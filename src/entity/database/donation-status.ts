import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DonorTime } from "./donor-time";


@Entity("donation_status", { schema: "donorday" })
export class DonationStatus {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        length: 128,
        name: "name"
    })
    name: string;


    @Column("text", {
        nullable: false,
        name: "description"
    })
    description: string;



    @OneToMany(() => DonorTime, donor_time => donor_time.status, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorTimes: DonorTime[];

}
