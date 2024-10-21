import axios from 'axios';
import { throttledGetDataFromApi, THROTTLE_TIME } from './index';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('throttledGetDataFromApi', () => {
  const endpoint = '/data';
  const responseData = { data: 'test data' };

  beforeEach(() => {
    jest.useFakeTimers();
    mockedAxios.create.mockReturnValue(mockedAxios);
    mockedAxios.get.mockResolvedValue({ data: responseData });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(endpoint);
    expect(mockedAxios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(endpoint);
    jest.advanceTimersByTime(THROTTLE_TIME);
    await throttledGetDataFromApi(endpoint);
    expect(mockedAxios.get).toHaveBeenCalledWith(endpoint);
  });

  test('should return response data', async () => {
    const data = await throttledGetDataFromApi(endpoint);
    expect(data).toEqual(responseData);
  });
});
