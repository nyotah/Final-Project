export type TodoList = {
    id: string;
    name: string;
    todos: string[];
  };

export type Todos = {
    [listName: string]: {
      todos: string[];
    };
  };
  
  export type SetOpenedTask = (taskName: string) => void;
  
  export type SidebarProps = {
    todos: Record<string, { todos: string[] }>;
    setOpenedTask: (taskName: string) => void;
    onCreateList: () => void;
    sidebarCollapsed: boolean;
    setSidebarCollapsed: (value: boolean) => void;
  };
  
  
  export type MyListsProps = {
    todoName: string;
    setOpenedTask: SetOpenedTask;
    onDeleteList: (todoName: string) => void;
  };
  
export type TaskListProps = {
  todos: Record<string, { todos: string[] }>;
  openedTask: string | null;
  onAddTask: () => void;
  todoLists: TodoList[];
  setOpenedTask: (taskName: string | null) => void
};


  export type CreateListProps = {
    onCreateList: () => void; 
  };

  export type CreateTaskProps = {
    openedTask: string | null;
    onAddTask: () => void;
  };

  export type TaskItemProps = {
    task: string;
    taskIndex: number;
    listId: string;
    onUpdate: () => void;
    onDeleteTask: (taskToDelete: string) => void;
  };
  