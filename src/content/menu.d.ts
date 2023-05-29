type MenuItem = {
  title: string;
  url: string;
  children?: Array<ChildItem>;
};

type ChildItem = {
  title: string;
  url: string;
  grandchildren: {
    place: 'left' | 'right'; // shouldn't this be decided programmatically?
    items: Array<GrandChildItem>;
  };
};

type GrandChildItem = {
  title: string;
  url: string;
};

declare module '@/content/menu.json' {
  export const items: Array<MenuItem>;
}
