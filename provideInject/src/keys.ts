import { InjectionKey } from "vue";
import { Entry } from "./Entry";

/*
 * to get typescript support for injected functions, we need to define injection
 * keys. storing them in a separate file is the recommended way since ES exports
 * don't work inside <script setup>. we can't colocate the keys and their
 * provided functions, which makes finding the provided functions harder when
 * trying to jump to definition
 */
export const addListKey: InjectionKey<(title?: string) => void> = Symbol();
export const addEntryKey: InjectionKey<(title?: string) => void> = Symbol();
export const removeEntryKey: InjectionKey<(id: string) => void> = Symbol();
export const updateEntryKey: InjectionKey<(update: Entry) => void> = Symbol();
export const setActiveListKey: InjectionKey<(id: string) => void> = Symbol();
