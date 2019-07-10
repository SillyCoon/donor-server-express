import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donation_point} from "./donation_point";
import {donor_time} from "./donor_time";


@Entity("donation_time",{schema:"donorday" } )
@Index("point_id",["point",])
export class donation_time {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>donation_point, donation_point=>donation_point.donationTimes,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'point_id'})
    point:donation_point | null;


    @Column("datetime",{ 
        nullable:false,
        name:"date"
        })
    date:Date;
        

    @Column("int",{ 
        nullable:false,
        name:"donor_quantity"
        })
    donor_quantity:number;
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        name:"is_stopped"
        })
    is_stopped:boolean;
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        name:"is_historical"
        })
    is_historical:boolean;
        

   
    @OneToMany(type=>donor_time, donor_time=>donor_time.donationTime,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorTimes:donor_time[];
    
}
