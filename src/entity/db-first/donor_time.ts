import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donorinfo} from "./donorinfo";
import {donation_time} from "./donation_time";
import {donation_status} from "./donation_status";
import {donor_time_doc} from "./donor_time_doc";


@Entity("donor_time",{schema:"donorday" } )
// @Index("donor_id",["donor",])
@Index("donation_time_id",["donationTime",])
@Index("status_id",["status",])
export class donor_time {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>donorinfo, donorinfo=>donorinfo.donorTimes,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'donor_id'})
    donor:donorinfo | null;


   
    @ManyToOne(type=>donation_time, donation_time=>donation_time.donorTimes,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'donation_time_id'})
    donationTime:donation_time | null;


   
    @ManyToOne(type=>donation_status, donation_status=>donation_status.donorTimes,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'status_id'})
    status:donation_status | null;


   
    @OneToMany(type=>donor_time_doc, donor_time_doc=>donor_time_doc.donorTime,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorTimeDocs:donor_time_doc[];
    
}
