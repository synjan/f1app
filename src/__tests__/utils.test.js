import { formatDateTimeNordic } from '../utils/dateUtils';
import { getCountryCode } from '../utils/countryUtils';

describe('formatDateTimeNordic', () => {
  it('formats date and time correctly', () => {
    const date = '2023-07-02';
    const time = '14:00:00Z';
    expect(formatDateTimeNordic(date, time)).toBe('søn. 2. juli 2023, 14:00');
  });
});

describe('getCountryCode', () => {
  it('returns correct country code for known countries', () => {
    expect(getCountryCode('United Kingdom')).toBe('gb');
    expect(getCountryCode('USA')).toBe('us');
  });

  it('returns "unknown" and logs a warning for unknown countries', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(getCountryCode('Neverland')).toBe('unknown');
    expect(consoleSpy).toHaveBeenCalledWith('Country code not found for: Neverland');
    consoleSpy.mockRestore();
  });
});
