import { PasswordInput } from './../../shared/PasswordInput';
import { Field, InputType } from "type-graphql";
import "reflect-metadata";



@InputType()
export class ChangePasswordInput extends PasswordInput {

    @Field()
    token: string;

}