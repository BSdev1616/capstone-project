import { describe, it, expect } from 'vitest';
import { getTaskSuggestion } from '../src/utils/getTaskSuggestion';

describe('getTaskSuggestion', () => {
  it('should suggest "Outdoor Coffee Break/Walk" if temperature > 20°C', () => {
    expect(getTaskSuggestion(21)).toBe('Outdoor Coffee Break/Walk');
    expect(getTaskSuggestion(30)).toBe('Outdoor Coffee Break/Walk');
  });

  it('should suggest "Deep Work / Focus Session" if temperature <= 20°C', () => {
    expect(getTaskSuggestion(20)).toBe('Deep Work / Focus Session');
    expect(getTaskSuggestion(15)).toBe('Deep Work / Focus Session');
    expect(getTaskSuggestion(-5)).toBe('Deep Work / Focus Session');
  });
});
