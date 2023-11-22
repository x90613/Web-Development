export type User = {
  id: string;
  username: string;
  email: string;
  provider: "github" | "credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
};


export type Message = {
  id: string;
  content: string;
  toDoc: string; //mapping to Document
  //deltomyself: boolean;
};
