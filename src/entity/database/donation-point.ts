import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DonationPointRole } from "./donation-point-role";
import { DonationTime } from "./donation-time";


@Entity("donation_point", { schema: "donorday" })
export class DonationPoint {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;


    @Column("varchar", {
        nullable: false,
        name: "name"
    })
    name: string;


    @Column("varchar", {
        nullable: false,
        length: 128,
        name: "address"
    })
    address: string;


    @Column("text", {
        nullable: false,
        name: "description"
    })
    description: string;



    @OneToMany(() => DonationPointRole, donation_point_role => donation_point_role.point, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donationPointRoles: DonationPointRole[];



    @OneToMany(() => DonationTime, donation_time => donation_time.point, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donationTimes: DonationTime[];

}
