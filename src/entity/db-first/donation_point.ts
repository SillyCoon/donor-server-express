import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donation_point_role} from "./donation_point_role";
import {donation_time} from "./donation_time";


@Entity("donation_point",{schema:"donorday" } )
export class donation_point {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:128,
        name:"address"
        })
    address:string;
        

    @Column("text",{ 
        nullable:false,
        name:"description"
        })
    description:string;
        

   
    @OneToMany(type=>donation_point_role, donation_point_role=>donation_point_role.point,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donationPointRoles:donation_point_role[];
    

   
    @OneToMany(type=>donation_time, donation_time=>donation_time.point,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donationTimes:donation_time[];
    
}
