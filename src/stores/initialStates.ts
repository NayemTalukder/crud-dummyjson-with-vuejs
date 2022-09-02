import type { product } from "@/types";

export const initialNewProductState = {
  title: "",
  description: "",
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [],
};

export const initialModalState = {
  show: false,
  type: "",
  onlyView: true,
  productLabel: "",
  mainHeader: "",
  subHeader: "",
  item: null as unknown as product,
  oldValue: "",
  newValue: "",
};

export const initialFilterState = {
  sortBy: "",
  desc: false,
  priceRange: {
    lowerLimit: 0,
    upperLimit: 0,
  },
};
