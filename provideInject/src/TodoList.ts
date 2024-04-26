import { Entry } from './Entry.ts';

export interface TodoList {
   title: string;
   id: string;
   entries: Entry[];
}
