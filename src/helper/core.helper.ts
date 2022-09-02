/* eslint-disable @typescript-eslint/no-explicit-any */
import type { product } from "../types";

export const arrayFindObjIndex = (array: any, item: any) => {
  return array.findIndex((i: product) => {
    return i.id === item.id;
  });
};

export const arrayDeleteByItem = (array: any, item: any) => {
  const index = array.indexOf(item);
  if (index > -1) array.splice(index, 1);
};

export const filterUnique = (array: any) => {
  function onlyUnique(value: any, index: any, self: string | any[]) {
    return self.indexOf(value) === index;
  }
  return array.filter(onlyUnique);
};

export const loadFile = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files as never;
  return URL.createObjectURL(files[0]);
};

export const updateObjArray = (array: any, item: product, newItem: any) => {
  const index = array.indexOf(item);
  array[index] = {
    ...array[index],
    ...newItem,
  };
};
