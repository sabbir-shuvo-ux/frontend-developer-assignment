export type UserType = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender?: "Male" | "Women";
  address1?: string;
  address2?: string;
};

export type MetaType = {
  total: number;
  page: number;
  limit: number;
  pages: number;
};
