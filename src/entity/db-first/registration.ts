import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donorinfo} from "./donorinfo";


@Entity("registration",{schema:"donorday" } )
export class registration {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:128,
        name:"text"
        })
    text:string;
        

   
    @OneToMany(type=>donorinfo, donorinfo=>donorinfo.registration,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorinfos:donorinfo[];
    
}
