export type ListItem = {
  id: string;
  name: string;
  isSelected: boolean;
  items: ListItem[];
};

export type ListMatches = {
  id: string;
  matches: number;
};

export type ServerListItem = {
  id: string;
  name: string;
  items: ListItem[];
};

export type HistoryItem = {
  id: ListItem["id"];
  name: ListItem["name"];
  actionType: HistoryActionType;
  date: string;
};

export enum HistoryActionType {
  Select = "select",
  Remove = "remove"
}

export type PostsGetterVariables = {
  searchText: string;
};
