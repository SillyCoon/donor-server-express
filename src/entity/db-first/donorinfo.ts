import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {user} from "./user";
import {weight} from "./weight";
import {citizenship} from "./citizenship";
import {registration} from "./registration";
import {donor_time} from "./donor_time";
import {material_aid} from "./material_aid";


@Entity("donorinfo",{schema:"donorday" } )
@Index("weight_id",["weight",])
@Index("citizenship_id",["citizenship",])
@Index("registration_id",["registration",])
export class donorinfo {

   
    @OneToOne(type=>user, user=>user.donorinfo,{ primary:true, nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'id'})
    id: user | null;


    @Column("int",{ 
        nullable:false,
        name:"first_name"
        })
    first_name:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:64,
        name:"patronymic"
        })
    patronymic:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:64,
        name:"last_name"
        })
    last_name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:11,
        name:"phone"
        })
    phone:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:64,
        name:"vk"
        })
    vk:string;
        

   
    @ManyToOne(type=>weight, weight=>weight.donorinfos,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'weight_id'})
    weight:weight | null;


   
    @ManyToOne(type=>citizenship, citizenship=>citizenship.donorinfos,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'citizenship_id'})
    citizenship:citizenship | null;


   
    @ManyToOne(type=>registration, registration=>registration.donorinfos,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'registration_id'})
    registration:registration | null;


   
    @OneToMany(type=>donor_time, donor_time=>donor_time.donor,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorTimes:donor_time[];
    

   
    @OneToOne(type=>material_aid, material_aid=>material_aid.id,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    materialAid:material_aid | null;

}
