export type UserLoginCredentials = {
  id: number;
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
};

export type CategoriesCardProps = {
  categories: {
    id: number;
    name: string;
    description: string;
    image: string;
  }[];
};

export type ValueProps = {
  values: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
};

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  href: string;
}


export type ContactFormState = {
  success: boolean;
  error: string | null;
};