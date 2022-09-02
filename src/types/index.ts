export type RootState = {
  products: product[];
  filteredProducts: product[];
  rawProducts: product[];
  newProduct: newProduct;
  modalState: ModalState;
  loader: boolean;
  loaderOverlay: boolean;
  filter: filterState;
  cart: cartItem[];
  limitReached: boolean;
};

export interface product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface newProduct {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ModalState {
  show: boolean;
  type: string;
  onlyView: boolean;
  productLabel: string;
  mainHeader: string;
  subHeader: string;
  item: product | unknown;
  oldValue: string;
  newValue: string;
}

export interface filterState {
  sortBy: string;
  desc: boolean;
  priceRange: {
    lowerLimit: number;
    upperLimit: number;
  };
}

export interface cartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity: number;
}
