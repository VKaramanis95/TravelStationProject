/* eslint-env jest */
import { shallowMount } from '@vue/test-utils';
import DateRangePicker from '../src/components/DateRangePicker.vue';

describe('DateRangePicker.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(DateRangePicker);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders the component properly', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.date-range-picker').exists()).toBe(true);
  });

  it('has correct initial data', () => {
    expect(wrapper.vm.today).toBe(new Date().toISOString().split('T')[0]);
    expect(wrapper.vm.oneYearAgo).toBe(new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]);
    expect(wrapper.vm.startDate).toBe('');
    expect(wrapper.vm.endDate).toBe('');
  });

  it('blocks dates older than one year in the start date picker', () => {
    const startDateInput = wrapper.find('#start-date');
    expect(startDateInput.attributes('min')).toBe(wrapper.vm.oneYearAgo);
    expect(startDateInput.attributes('max')).toBe(wrapper.vm.today);
  });

  it('blocks dates older than one year in the end date picker', () => {
    const endDateInput = wrapper.find('#end-date');
    expect(endDateInput.attributes('min')).toBe(wrapper.vm.oneYearAgo);
    expect(endDateInput.attributes('max')).toBe(wrapper.vm.today);
  });

  it('validates start date and end date correctly', async () => {
    wrapper.setData({ startDate: '2023-03-25', endDate: '2023-03-24' });
    await wrapper.vm.validateDates();
    expect(wrapper.vm.errorMessage).toBe('Start date cannot be later than end date.');

    wrapper.setData({ startDate: '2023-03-24', endDate: '2023-03-25' });
    await wrapper.vm.validateDates();
    expect(wrapper.vm.errorMessage).toBe('');
  });

  it('sets a date range properly when the range button is clicked', async () => {
    const rangeButton = wrapper.find('.range-buttons button:nth-child(1)'); 
    await rangeButton.trigger('click');
    expect(wrapper.vm.endDate).toBe(new Date().toISOString().split('T')[0]);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    expect(wrapper.vm.startDate).toBe(oneMonthAgo.toISOString().split('T')[0]);
  });

  it('fetches Bitcoin price correctly', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ bitcoin: { usd: 28000 } })
      })
    );

    await wrapper.vm.fetchBitcoinPrice();

    expect(wrapper.vm.btcPrice).toBe(28000);
    expect(global.fetch).toHaveBeenCalledWith('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('shows an error if fetching Bitcoin price fails', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('API failure')));

    await wrapper.vm.fetchBitcoinPrice();

    expect(wrapper.vm.btcError).toBe('Failed to fetch Bitcoin price. Please try again later.');
    global.fetch.mockClear();
    delete global.fetch;
  });

  it('shows an error if fetching Bitcoin price fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch = jest.fn(() => Promise.reject(new Error('API failure')));
  
    await wrapper.vm.fetchBitcoinPrice();
  
    expect(wrapper.vm.btcError).toBe('Failed to fetch Bitcoin price. Please try again later.');
  
    consoleSpy.mockRestore();
    global.fetch.mockClear();
    delete global.fetch;
  });
  
});
