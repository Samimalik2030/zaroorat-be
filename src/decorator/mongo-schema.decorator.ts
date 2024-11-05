import { Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaOptions } from 'mongoose';
import { ToObjectOptions } from 'mongoose';

function toObject<T>(c: new () => T): ToObjectOptions<HydratedDocument<T>> {
  return {
    transform: (_doc, ret) => {
      ret._id = ret._id.toString();
      const instance = new c();
      //   delete ret.password;
      Object.assign(instance, ret);
      return instance;
    },
  };
}

export function MongoSchema(options?: SchemaOptions) {
  return function (target: any) {
    return Schema({
      timestamps: true,
      toObject: toObject(target),
      ...options,
    })(target);
  };
}
