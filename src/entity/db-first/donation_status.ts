import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donor_time} from "./donor_time";


@Entity("donation_status",{schema:"donorday" } )
export class donation_status {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:128,
        name:"name"
        })
    name:string;
        

    @Column("text",{ 
        nullable:false,
        name:"description"
        })
    description:string;
        

   
    @OneToMany(type=>donor_time, donor_time=>donor_time.status,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorTimes:donor_time[];
    
}
