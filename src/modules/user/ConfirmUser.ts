import { User } from './../../entity/User';
import { redis } from './../../redis';
import { Resolver, Mutation, Arg } from "type-graphql";
import { confirmationPrefix } from '../constants/redisPrefixes';


@Resolver()
export class ConfirmUserResolver {
    @Mutation(() => Boolean)
    async confirmUser(
        @Arg("token") token: string,

    ): Promise<boolean> {
        const userId = await redis.get(confirmationPrefix + token)

        if (!userId) {
            return false;
        }

        await User.update({ id: parseInt(userId, 10) }, { confirmed: true });//update the use based on the id 
        await redis.del(token)
        return true
    }
}