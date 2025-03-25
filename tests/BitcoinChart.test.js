/* eslint-env jest */
jest.mock("axios");

import { shallowMount } from "@vue/test-utils";
import BitcoinChart from "../src/components/BitcoinChart.vue";
import axios from "axios";
import flushPromises from "flush-promises";

describe("BitcoinChart.vue", () => {
  let wrapper;

  beforeEach(async () => {
    axios.get.mockResolvedValueOnce({
      data: { prices: [[1672444800000, 20000], [1672531200000, 21000]] },
    });

    wrapper = shallowMount(BitcoinChart, {
      props: { dateRange: { startDate: "2023-01-01", endDate: "2023-01-10" } },
    });
    jest.spyOn(console, "error").mockImplementation(() => {}); 

    await flushPromises(); 
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error.mockRestore();
  });

  test("renders without errors", () => {
    expect(wrapper.exists()).toBe(true);
  });

  test("displays error message when API call fails", async () => {
    axios.get.mockRejectedValueOnce(new Error("API error"));

    wrapper.vm.fetchBitcoinData(wrapper.props().dateRange);
    await flushPromises();

    expect(wrapper.text()).toContain("Failed to fetch Bitcoin data. Please try again.");
  });
  
});
