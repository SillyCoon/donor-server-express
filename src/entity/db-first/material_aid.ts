import {Column,Entity,Index,JoinColumn,ManyToOne,OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {donorinfo} from "./donorinfo";
import {department} from "./department";


@Entity("material_aid",{schema:"donorday" } )
@Index("department_id",["department",])
export class material_aid {

    @OneToOne(() => donorinfo, donorinfo => donorinfo.materialAid,{ primary:true, nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'id'})
    @PrimaryGeneratedColumn()
    id:donorinfo | null;


   
    @ManyToOne(() => department, department => department.materialAids,{  nullable:false,onDelete: 'RESTRICT',onUpdate: 'RESTRICT' })
    @JoinColumn({ name:'department_id'})
    department:department | null;


    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"passport"
        })
    passport:string;
        

    @Column("text",{ 
        nullable:false,
        name:"issued"
        })
    issued:string;
        

    @Column("date",{ 
        nullable:false,
        name:"issued_date"
        })
    issued_date:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:7,
        name:"subdivision_code"
        })
    subdivision_code:string;
        

    @Column("text",{ 
        nullable:false,
        name:"address_registration"
        })
    address_registration:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:12,
        name:"INN"
        })
    INN:string;
        

    @Column("date",{ 
        nullable:false,
        name:"birthday"
        })
    birthday:string;
        
}
