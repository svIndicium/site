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
  const currentBoard: Board<MemberWithInfo>;
  const oldBoards: Array<Board<SimpleMember>>;
  export { currentBoard, oldBoards };
}

export = '@/content/boards.json';
