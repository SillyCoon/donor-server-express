import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donation_point_role} from "./donation_point_role";
import {user_role} from "./user_role";


@Entity("role",{schema:"donorday" } )
export class role {

    @Column("varchar",{ 
        nullable:false,
        primary:true,
        length:64,
        name:"id"
        })
    id:string;
        

    @Column("tinytext",{ 
        nullable:false,
        name:"description"
        })
    description:string;
        

   
    @OneToMany(type=>donation_point_role, donation_point_role=>donation_point_role.role,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donationPointRoles:donation_point_role[];
    

   
    @OneToMany(type=>user_role, user_role=>user_role.role,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    userRoles:user_role[];
    
}
