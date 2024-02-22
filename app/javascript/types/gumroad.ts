export type UserProfile = {
  name: string;
  currency_type: string;
  bio: string;
  twitter_handle: string | null;
  id: string;
  user_id: string;
  url: string;
  links: string[];
  profile_url: string;
  email: string;
  display_name: string;
};

export type UseUserProfileResult = {
  loading: boolean;
  error: string | null;
  profile: UserProfile | null;
};

export type Product = {
  custom_permalink: string | null;
  custom_receipt: string | null;
  custom_summary: string | null;
  custom_fields: string[];
  customizable_price: string | null;
  description: string;
  deleted: boolean;
  max_purchase_count: string | null;
  name: string;
  preview_url: string | null;
  require_shipping: boolean;
  subscription_duration: string | null;
  published: boolean;
  url: string;
  id: string;
  price: number;
  purchasing_power_parity_prices: {
    [key: string]: number;
  };
  currency: string;
  short_url: string;
  thumbnail_url: string;
  tags: string[];
  formatted_price: string;
  file_info: {};
  sales_count: string;
  sales_usd_cents: string;
  is_tiered_membership: boolean;
  recurrences: string[] | null;
  variants: {
    title: string;
    options: {
      name: string;
      price_difference: number;
      purchasing_power_parity_prices: {
        [key: string]: number;
      };
      is_pay_what_you_want: boolean;
      recurrence_prices: {
        [key: string]: {
          price_cents: number;
          suggested_price_cents: number | null;
          purchasing_power_parity_prices: {
            [key: string]: number;
          };
        };
      } | null;
    }[];
  }[];
};
