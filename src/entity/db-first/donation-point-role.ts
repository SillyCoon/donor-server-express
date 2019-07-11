import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { DonationPoint } from "./donation-point";
import { Role } from "./role";


@Entity("donation_point_role", { schema: "donorday" })
@Index("point_id", ["point",])
@Index("role_id", ["role",])
export class DonationPointRole {

    @PrimaryGeneratedColumn({
        type: "int",
        name: "id"
    })
    id: number;



    @ManyToOne(() => DonationPoint, donation_point => donation_point.donationPointRoles, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'point_id' })
    point: DonationPoint | null;



    @ManyToOne(() => Role, role => role.donationPointRoles, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'role_id' })
    role: Role | null;


    @Column("tinyint", {
        nullable: false,
        width: 1,
        name: "success"
    })
    success: boolean;

}
