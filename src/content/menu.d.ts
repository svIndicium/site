type MenuItem = {
  title: string;
  url: string;
  children?: Array<ChildItem>
}

type ChildItem = {
  title: string;
  url: string;
  grandchildren: {
    place: "left" | "right";
    items: Array<GrandChildItem>
  };
}

type GrandChildItem = {
  title: string;
  url: string;
}

declare module '@/content/menu.json' {
  export const items: Array<MenuItem>;
}
