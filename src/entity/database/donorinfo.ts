import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { User } from "./user";
import { Weight } from "./weight";
import { Citizenship } from "./citizenship";
import { Registration } from "./registration";
import { DonorTime } from "./donor-time";
import { MaterialAid } from "./material-aid";


@Entity("donorinfo", { schema: "donorday" })
@Index("weight_id", ["weight",])
@Index("citizenship_id", ["citizenship",])
@Index("registration_id", ["registration",])
export class Donorinfo {


    @OneToOne(() => User, user => user.donorinfo, { primary: true, nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'id' })
    id?: User | null;


    @Column("varchar", {
        nullable: false,
        name: "first_name"
    })
    firstName: string;


    @Column("varchar", {
        nullable: false,
        length: 64,
        name: "patronymic"
    })
    patronymic: string;


    @Column("varchar", {
        nullable: false,
        length: 64,
        name: "last_name"
    })
    lastName: string;


    @Column("varchar", {
        nullable: false,
        length: 11,
        name: "phone"
    })
    phone: string;


    @Column("varchar", {
        nullable: false,
        length: 64,
        name: "vk"
    })
    vk: string;


    @Column({ nullable: true, name: 'weight_id' })
    weightId: number

    @Column({ nullable: true, name: 'citizenship_id' })
    citizenshipId: number

    @Column({ nullable: true, name: 'registration_id'})
    registrationId: number

    @ManyToOne(() => Weight, weight => weight.donorinfos, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'weight_id' })
    weight?: Weight | null;



    @ManyToOne(() => Citizenship, citizenship => citizenship.donorinfos, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'citizenship_id' })
    citizenship?: Citizenship | null;



    @ManyToOne(() => Registration, registration => registration.donorinfos, { nullable: false, onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    @JoinColumn({ name: 'registration_id' })
    registration?: Registration | null;



    @OneToMany(() => DonorTime, donor_time => donor_time.donor, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    donorTimes?: DonorTime[];



    @OneToOne(() => MaterialAid, material_aid => material_aid.id, { onDelete: 'RESTRICT', onUpdate: 'RESTRICT' })
    materialAid?: MaterialAid | null;

}
