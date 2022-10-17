import { Length, IsEmail } from "class-validator";
import { Field, InputType } from "type-graphql";
import "reflect-metadata";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";
import { PasswordInput } from './../../shared/PasswordInput';

@InputType()
export class RegisterInput extends PasswordInput {
    @Field()
    @Length(1, 30)
    firstName: string;

    @Length(1, 30)
    @Field()
    lastName: string;


    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: "Email already in use" })
    email: string;



}