import { TodoList } from "./TodoList";

export const todoListFixture: TodoList[] = [
    {
        title: "Shopping",
        id: "24d36027-c03a-40e1-9afd-b5684d308c8f",
        entries: [
            {
                id: "23fe4a43-bc3e-4d4c-8e79-7436c59b1900",
                completed: true,
                title: "broccoli",
            },
            {
                id: "98beca09-94be-48be-920f-b3246621a64f",
                completed: false,
                title: "chicken breast",
            },
            {
                id: "1aad4155-ee2f-4f2a-8191-e5d265c6a70e",
                completed: false,
                title: "rice",
            },
        ],
    },
    {
        title: "Work",
        id: "a9bb0af9-c2cd-4f73-9d2e-a44c7e3364a2",
        entries: [
            {
                id: "92e5aac1-0f03-4b38-ad7b-3227118cce9d",
                completed: true,
                title: "fix bug",
            },
            {
                id: "5eff59ef-b45d-4438-8ebb-6aa3eb0aaec3",
                completed: false,
                title: "log hours",
            },
        ],
    },
    {
        title: "Other",
        id: "164bef85-7fc6-4dd0-80b9-fbfb28ad50d5",
        entries: [
            {
                id: "c71ace5c-9e31-4739-91de-7f3a999772c3",
                completed: false,
                title: "dentist appointment",
            },
            {
                id: "cb012020-8f46-43b6-b9cc-5bed22e4927f",
                completed: false,
                title: "plan summer vacation",
            },
        ],
    },
];
