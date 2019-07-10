import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donation_point} from "./donation_point";
import {role} from "./role";


@Entity("donation_point_role",{schema:"donorday" } )
@Index("point_id",["point",])
@Index("role_id",["role",])
export class donation_point_role {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>donation_point, donation_point=>donation_point.donationPointRoles,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'point_id'})
    point:donation_point | null;


   
    @ManyToOne(type=>role, role=>role.donationPointRoles,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'role_id'})
    role:role | null;


    @Column("tinyint",{ 
        nullable:false,
        width:1,
        name:"success"
        })
    success:boolean;
        
}
