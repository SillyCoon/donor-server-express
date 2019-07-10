import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {donor_time_doc} from "./donor_time_doc";


@Entity("donor_document",{schema:"donorday" } )
export class donor_document {

    @PrimaryGeneratedColumn({
        type:"int", 
        name:"id"
        })
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:128,
        name:"description"
        })
    description:string;
        

   
    @OneToMany(type=>donor_time_doc, donor_time_doc=>donor_time_doc.document,{ onDelete: 'RESTRICT' ,onUpdate: 'RESTRICT' })
    donorTimeDocs:donor_time_doc[];
    
}
