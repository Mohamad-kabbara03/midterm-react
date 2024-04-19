import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
  } from 'class-validator';
  
  /**
   * 
   * @param minLength 
   * @param maxLength 
   * @param validationOptions 
   * @returns validationOptions
   * 
   * The function IsLengthAndNoSpecialChars is a decorator factory, and the returned function inside it is the actual decorator function. 
   * Decorator factories are functions that return decorator functions when invoked.
   * In TypeScript, a decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. 
   * It uses the @expression syntax, where expression is typically a function that gets called at runtime with information about the decorated declaration.
   * In our case:
   * The IsLengthAndNoSpecialChars function is a decorator factory that takes parameters (minLength, maxLength, and validationOptions).
   * The returned function inside IsLengthAndNoSpecialChars is the actual decorator function.
   * The decorator function is called with the registerDecorator function, which is part of the class-validator library. 
   * It registers a custom validation decorator with the specified name, target class, and property name.
   * So, when you apply this decorator to a class property using the @IsLengthAndNoSpecialChars syntax, 
   * it will enforce the custom validation logic defined in the decorator. This example seems to define 
   * a custom validator for checking if a string has a certain length and contains no special characters.
   */
  export function IsLengthAndNoSpecialChars(
    minLength: number,
    maxLength: number,
    validationOptions?: ValidationOptions,
  ) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isLengthAndNoSpecialChars',
        target: object.constructor,
        propertyName: propertyName,
        constraints: [minLength, maxLength],
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [min, max] = args.constraints;
            const regex = new RegExp(`^[a-zA-Z0-9]{${min},${max}}$`);
            return typeof value === 'string' && regex.test(value);
          },
          defaultMessage(args: ValidationArguments) {
            const [min, max] = args.constraints;
            return `${args.property} must be between ${min} and ${max} characters long and contain no special characters`;
          },
        },
      });
    };
  }
  