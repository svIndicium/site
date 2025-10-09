type MemberWithInfo = {
  name: string;
  function: string;
  introduction: string;
  photo: string;
};

type SimpleMember = {
  name: string;
  function: string;
};

type Board<MemberType> = {
  year: string;
  groupPhoto: string;
  members: Array<MemberType>;
};

declare module '@/content/boards.json' {
  currentBoard: Board<MemberWithInfo>;
  previousBoards: Array<Board<SimpleMember>>;
}

export = '@/content/boards.json';
