export interface Event {
  guId?: string;
  title: string;
  description: string;
  startDate: number;
  endDate?: number;
  isAllDay: boolean;
  location: string;
}
