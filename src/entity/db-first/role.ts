import {Column,Entity,OneToMany} from "typeorm";
import {DonationPointRole} from "./donation-point-role";
import {UserRole} from "./user-role";


@Entity("role",{schema:"donorday" } )
export class Role {

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
        

   
    @OneToMany(()=>DonationPointRole, donation_point_role=>donation_point_role.role,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donationPointRoles:DonationPointRole[];
    

   
    @OneToMany(()=>UserRole, user_role=>user_role.role,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    userRoles:UserRole[];
    
}
