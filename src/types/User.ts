export interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    age: number;
    marital_status: "married" | "unmarried";
    is_employed: boolean;
    is_founder: boolean;
  }
  