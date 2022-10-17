import { User } from './../../../entity/User';
//we are creating a custom decorator

import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';


//here the logic to see wether the email is valid or no 
@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    validate(email: string) {
        return User.findOne({ where: { email } }).then(user => {
            if (user) return false;
            return true;
        });
    }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint,
        });
    };
}