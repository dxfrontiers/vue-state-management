import { Entry } from './Entry';

export interface TodoList {
   title: string;
   id: string;
   entries: Entry[];
}
