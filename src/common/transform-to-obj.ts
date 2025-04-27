import { Types } from 'mongoose';

const objectIdToString = (value: any) =>
  value instanceof Types.ObjectId ? value.toString() : value;

export const transformObjectId = (obj: any) => {
  if (Array.isArray(obj.value)) {
    return obj.value.map(objectIdToString);
  } else {
    return objectIdToString(obj.value);
  }
};

// console.time('transform');
// Object.keys(ret).forEach((key) => {
//   const value = ret[key];
//   if (Array.isArray(value)) {
//     ret[key] = value.map(objectIdToString);
//   } else {
//     ret[key] = value instanceof Types.ObjectId ? value.toString() : value;
//   }
// });
// console.timeEnd('transform');
