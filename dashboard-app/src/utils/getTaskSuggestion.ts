export function getTaskSuggestion(temp: number): string {
  if (temp > 20) {
    return 'Outdoor Coffee Break/Walk';
  }
  return 'Deep Work / Focus Session';
}
