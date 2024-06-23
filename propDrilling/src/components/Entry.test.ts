import { mount } from "@vue/test-utils";
import { expect, test } from "vitest";
import Entry from "./Entry.vue";

test("should emit update event", async () => {
    const wrapper = mount(Entry, {
        props: {
            entry: {
                id: "12345",
                title: "buy fish",
                completed: false, // not completed
            },
            lastElement: false,
        },
    });

    const checkbox = wrapper.find("input[type='checkbox']");
    await checkbox.setValue(true);

    expect(wrapper.emitted()).toHaveProperty("entryUpdated");
    console.log(JSON.stringify(wrapper.emitted()));
    expect(wrapper.emitted()["entryUpdated"][0][0]["completed"]).toBeTruthy();
});
