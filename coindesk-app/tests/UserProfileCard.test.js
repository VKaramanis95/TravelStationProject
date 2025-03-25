/* eslint-env jest */
import { mount } from "@vue/test-utils";
import UserProfileCard from "../src/components/UserProfileCard.vue";

beforeAll(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {}); 
});

describe("UserProfileCard.vue", () => {
  test("renders user profile with name, email, address, and phone", () => {
    const wrapper = mount(UserProfileCard);
    expect(wrapper.text()).toContain("User Profile");
    expect(wrapper.text()).toContain(wrapper.vm.user.name);
    expect(wrapper.text()).toContain(wrapper.vm.user.email);
    expect(wrapper.text()).toContain(wrapper.vm.user.address);
    expect(wrapper.text()).toContain(wrapper.vm.user.phone);
  });

  test("displays a user avatar", () => {
    const wrapper = mount(UserProfileCard);
    const img = wrapper.find("img");
    expect(img.exists()).toBe(true);
    expect(img.attributes("src")).toBeTruthy();
  });

  test("fetches a random avatar from API and updates it", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            results: [{ picture: { large: "https://randomuser.me/api/portraits/men/1.jpg" } }],
          }),
      })
    );

    const wrapper = mount(UserProfileCard);
    await new Promise((resolve) => setTimeout(resolve, 100)); 

    expect(wrapper.vm.user.avatar).toBe("https://randomuser.me/api/portraits/men/1.jpg");
  });

  test("displays a fallback avatar if API fails", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("API failed")));

    const wrapper = mount(UserProfileCard);
    await new Promise((resolve) => setTimeout(resolve, 100)); 

    expect(wrapper.vm.user.avatar).not.toBe("https://randomuser.me/api/portraits/men/1.jpg"); 
  });
});
