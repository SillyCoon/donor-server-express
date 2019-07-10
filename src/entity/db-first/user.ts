import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donorinfo} from "./donorinfo";
import {user_role} from "./user_role";


@Entity("user",{schema:"donorday" } )
@Index("IDX_78a916df40e02a9deb1c4b75ed",["email",],{unique:true})
export class user {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        name:"password"
        })
    password:string;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        name:"email"
        })
    email:string;
        

    @Column("datetime",{ 
        nullable:false,
        default: () => "'CURRENT_TIMESTAMP(6)'",
        name:"createdAt"
        })
    createdAt:Date;
        

    @Column("datetime",{ 
        nullable:false,
        default: () => "'CURRENT_TIMESTAMP(6)'",
        name:"updatedAt"
        })
    updatedAt:Date;
        

   
    @OneToOne(type=>donorinfo, donorinfo=>donorinfo.id,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorinfo:donorinfo | null;


   
    @OneToMany(type=>user_role, user_role=>user_role.user,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    userRoles:user_role[];
    
}
