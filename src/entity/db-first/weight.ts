import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donorinfo} from "./donorinfo";


@Entity("weight",{schema:"donorday" } )
export class weight {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:64,
        name:"text"
        })
    text:string;
        

   
    @OneToMany(type=>donorinfo, donorinfo=>donorinfo.weight,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorinfos:donorinfo[];
    
}
