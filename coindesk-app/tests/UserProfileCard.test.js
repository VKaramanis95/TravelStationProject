import { mount } from "@vue/test-utils";
import UserProfileCard from "../src/components/UserProfileCard.vue";

describe("UserProfileCard.vue", () => {
  it("renders user profile with name, email, address, and phone", () => {
    const wrapper = mount(UserProfileCard);

    expect(wrapper.text()).toContain("User Profile");
    expect(wrapper.text()).toContain("Name:");
    expect(wrapper.text()).toContain("Email:");
    expect(wrapper.text()).toContain("Address:");
    expect(wrapper.text()).toContain("Phone:");
  });

  it("displays a user avatar", () => {
    const wrapper = mount(UserProfileCard);
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("alt")).toBe("User Avatar");
  });

  it("fetches a random avatar from API and updates it", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ picture: { large: "https://randomuser.me/api/portraits/men/1.jpg" } }]
          })
      })
    );

    const wrapper = mount(UserProfileCard);
    await new Promise(process.nextTick);

    expect(wrapper.vm.user.avatar).toBe("https://randomuser.me/api/portraits/men/1.jpg");
  });

  it("displays a fallback avatar if API fails", async () => {
    global.fetch = jest.fn(() => Promise.reject("API Error"));

    const wrapper = mount(UserProfileCard);
    await new Promise(process.nextTick);

    expect(wrapper.vm.user.avatar).not.toBe("https://randomuser.me/api/portraits/men/1.jpg"); 
  });
});
