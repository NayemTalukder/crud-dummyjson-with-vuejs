import type { product, filterState } from "../types";

export const getFieldValuePair = (
  label: string,
  value: string | number | string[],
  item = null as unknown as product
) => {
  if (label === "Title") {
    if (!item) return { title: value };
    return { title: item.title };
  } else if (label === "Description") {
    if (!item) return { description: value };
    return { description: item.description };
  } else if (label === "Price") {
    if (item) return { price: item.price };
    return { price: parseInt(value as never) };
  } else if (label === "Discount Percentage") {
    if (item) return { discountPercentage: item.discountPercentage };
    return {
      discountPercentage: parseInt(parseFloat(value as string).toFixed(2)),
    };
  } else if (label === "Rating") {
    if (item) return { rating: item.rating };
    return { rating: parseInt(parseFloat(value as string).toFixed(2)) };
  } else if (label === "Stock") {
    if (item) return { stock: item.stock };
    return { stock: parseInt(value as never) };
  } else if (label === "Brand") {
    if (item) return { brand: item.brand };
    return { brand: value as never };
  } else if (label === "Category") {
    if (item) return { category: item.category };
    return { category: value as never };
  } else if (label === "Thumbnail") {
    if (item) return { thumbnail: item.thumbnail };
    return { thumbnail: value as never };
  } else if (label === "Images") {
    if (item) return { images: item.images };
    return { images: value as never };
  }
};

export const getFieldValue = (item: product | never, label: string) => {
  if (label === "Title") return item.title;
  else if (label === "Description") item.description;
  else if (label === "Price") return item.price;
  else if (label === "Discount Percentage") return item.discountPercentage;
  else if (label === "Rating") return item.rating;
  else if (label === "Stock") return item.stock;
  else if (label === "Brand") return item.brand;
  else if (label === "Category") return item.category;
  else if (label === "Thumbnail") return item.thumbnail;
  else if (label === "Images") return item.images;
};

export const getInputFieldType = (label: string) => {
  if (label === "Title") return "text";
  else if (label === "Description") return "textarea";
  else if (label === "Price") return "number";
  else if (label === "Discount Percentage") return "number";
  else if (label === "Rating") return "number";
  else if (label === "Stock") return "number";
  else if (label === "Brand") return "text";
  else if (label === "Category") return "text";
  else if (label === "Thumbnail") return "file";
  else if (label === "Images") return "file";
};

export const sortProductArray = (
  array: product[],
  sortBy: string,
  desc = false
) => {
  if (sortBy === "Rating") {
    array.sort((a, b) => a.rating - b.rating);
  } else array.sort((a, b) => a.stock - b.stock);

  if (desc) array.reverse();
};

export const filterProductArray = (
  array: product[],
  sortBy: { lowerLimit: number; upperLimit: number }
) => {
  function filterByPrice(item: product) {
    if (item.price >= sortBy.lowerLimit && item.price <= sortBy.upperLimit) {
      return true;
    }
    return false;
  }
  const filteredData = array.filter(filterByPrice);
  return filteredData;
};

export const getData = async (
  filter: filterState,
  products = null as unknown as product[]
) => {
  if (filter.priceRange.upperLimit === 0) {
    sortProductArray(products, filter.sortBy, filter.desc);
    return products;
  } else {
    const filteredData = filterProductArray(products, filter.priceRange);
    if (filter.sortBy !== "")
      sortProductArray(filteredData, filter.sortBy, filter.desc);
    return filteredData;
  }
};
