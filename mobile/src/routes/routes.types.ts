export type StackNavigatorParams = {
  signIn: undefined;
  signUp: undefined;
  home: undefined;
  processing: undefined;
  confirmed: undefined;
  tabNavigator: undefined;
  reserve: {
    imageUri: string;
    message: string;
    seller: string;
    description: string;
    locationUri: string;
  };
  detail: {
    imageUri: string;
    price: number;
    seller: string;
    food: string;
    description: string;
  };
  nearby: {
    imageUri: string;
    message: string;
    seller: string;
    description: string;
    locationUri: string;
  };
  order: {
    imageUri: string;
    price: number;
    seller: string;
    food: string;
    description: string;
  };
};
export type TabNavigatorParams = {
  home: undefined;
  report: undefined;
  categories: undefined;
  user: undefined;
};
