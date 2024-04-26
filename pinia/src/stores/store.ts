import { defineStore } from "pinia";
import { v4 as uuid } from 'uuid';

// TODO: Make Entries draggable and let them care for their state
const listsFixture: TodoList[] = [
    {
        title: "Einkaufen",
        id: "24d36027-c03a-40e1-9afd-b5684d308c8f",
        entries: [
            {
                id: "23fe4a43-bc3e-4d4c-8e79-7436c59b1900",
                completed: true,
                title: "Salat",
            },
            {
                id: "98beca09-94be-48be-920f-b3246621a64f",
                completed: false,
                title: "Rumpsteak",
            },
        ],
    },
    {
        title: "Arbeit",
        id: "a9bb0af9-c2cd-4f73-9d2e-a44c7e3364a2",
        entries: [
            {
                id: "92e5aac1-0f03-4b38-ad7b-3227118cce9d",
                completed: false,
                title: "Vue Vortrag App fertig programmieren",
            },
            {
                id: "1d8da7ea-4fb6-4c5c-bb4d-e8253b7785a1",
                completed: false,
                title: "Ablauf Vortrag überlegen",
            },
            {
                id: "5eff59ef-b45d-4438-8ebb-6aa3eb0aaec3",
                completed: false,
                title: "Projektplan erstellen",
            },
        ],
    },
    {
        title: "Privat",
        id: "164bef85-7fc6-4dd0-80b9-fbfb28ad50d5",
        entries: [
            {
                id: "c71ace5c-9e31-4739-91de-7f3a999772c3",
                completed: false,
                title: "Zahnarzttermin machen",
            },
            {
                id: "2285cb58-8e27-4f59-873b-53b4427c80fc",
                completed: true,
                title: "Regal aufbauen",
            },
            {
                id: "cb012020-8f46-43b6-b9cc-5bed22e4927f",
                completed: false,
                title: "Familienausflug planen",
            },
        ],
    },
];

export interface Entry {
    id: string;
    title: string;
    completed: boolean;
}

export interface TodoList {
    id: string;
    title: string;
    entries: Entry[];
}

export interface TodoListState {
    lists: TodoList[];
    activeList: TodoList | undefined;
}

export const useListStore = defineStore("lists", {
    state: (): TodoListState => ({
        lists: listsFixture,
        activeList: listsFixture[0],
    }),
    getters: {
        openTodosByList: (state) => {
            return state.lists.map((list) => ({
                id: list.id,
                title: list.title,
                openTodos: list.entries.filter((entry) => !entry.completed).length,
            }));
        },
    },
    actions: {
        addList(title: string) {
            const newList = {
                title: title,
                id: uuid(),
                entries: [],
            };
            this.lists.push(newList);
        },
        addEntry(title: string) {
            if (this.activeList) {
                this.activeList.entries.push({
                    id: uuid(),
                    title: title,
                    completed: false,
                });
            }
        },
        setActiveList(id: string) {
            this.activeList = this.lists.find(list => list.id === id);
        },
    },
});