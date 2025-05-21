import { Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaOptions } from 'mongoose';
import { ToObjectOptions } from 'mongoose';

function toObject<T>(
  c: new () => T,
  exclude: string[] = [],
): ToObjectOptions<HydratedDocument<T>> {
  return {
    transform: (_doc, ret) => {
      ret.id = ret._id.toString();
      exclude.forEach((x) => {
        const parts = x.split('.');
        if (parts.length > 1) {
          let ref = ret;
          for (let i = 0; i < parts.length - 1; i++) {
            ref = ref[parts[i]];
          }
          delete ref[parts[parts.length - 1]];
        } else {
          delete ret[x];
        }
      });

 
      const instance = new c();
      Object.assign(instance, ret);
      return instance;
    },
  };
}

export function MongoSchema(options?: SchemaOptions & { exclude?: string[] }) {
  return function (target: any) {
    return Schema({
      timestamps: true,
      toObject: toObject(target, options?.exclude || []),
      ...options,
    })(target);
  };
}
