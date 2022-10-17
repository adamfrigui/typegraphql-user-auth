import { Field, ID, ObjectType, Root } from "type-graphql"
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)//Field means that i would like to expose this to graphql
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column()
    firstName: string

    @Field()
    @Column()
    lastName: string


    @Field()
    @Column('text', { unique: true })
    email: string

    //this will not be stored in the db
    @Field()
    name(@Root() parent: User): string {//the user gonna be the value that we're gonna return in register
        return `${parent.firstName} ${parent.lastName}`
    }//the root is basically the parent


    //now the password is a db field but not a graphql field
    @Column()
    password: string

    @Column("bool", { default: false })
    confirmed: boolean

}