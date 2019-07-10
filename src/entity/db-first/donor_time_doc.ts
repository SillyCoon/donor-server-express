import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donor_time} from "./donor_time";
import {donor_document} from "./donor_document";


@Entity("donor_time_doc",{schema:"donorday" } )
@Index("donor_time_id",["donorTime",])
@Index("document_id",["document",])
export class donor_time_doc {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

   
    @ManyToOne(type=>donor_time, donor_time=>donor_time.donorTimeDocs,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'donor_time_id'})
    donorTime:donor_time | null;


   
    @ManyToOne(type=>donor_document, donor_document=>donor_document.donorTimeDocs,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'document_id'})
    document:donor_document | null;

}
