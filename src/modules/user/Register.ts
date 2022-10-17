import { logger } from './../middleware/logger';
import { isAuth } from './../middleware/isAuth';
import { RegisterInput } from './register/RegisterInput';
import { User } from './../../entity/User';
import { Query, Resolver, Mutation, Arg, UseMiddleware } from "type-graphql";
import "reflect-metadata";
import bcrypt from 'bcryptjs'
import { sendEmail } from '../utils/sendEmail';
import { createConfirmationURL } from '../utils/createConfirmationURL';

@Resolver()//we know which field we are resolving to , in this case we are resolving to the user type
export class RegisterResolver {
    // @Authorized()
    @UseMiddleware(isAuth, logger)
    @Query(() => String)
    async helloWorld() {
        return "Hello World!";
    }
    // @FieldResolver()
    // async name(@Root() parent: User) {//the user g   onna be the value that we're gonna return in register
    //     return `${parent.firstName} ${parent.lastName}`
    // } //the root is basically the parent

    @Mutation(() => User)
    async register(
        @Arg("data") { firstName, lastName, email, password }: RegisterInput,

    ): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        }).save()

        await sendEmail(email, await createConfirmationURL(user.id))
        return user;
    }
}