/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CatalogueInterface {
  _id?: string;
  id?: string;
  name: string;
  start_date: Date | string | any;
  end_date: Date | string | any;
  is_active: boolean;
  cover: string | File | undefined | any;
  user_id?: string;
  pages?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
