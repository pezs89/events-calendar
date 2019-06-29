export interface Event {
    title: string;
    description: string;
    startDate: number;
    endDate?: number;
    isAllDay: boolean;
    location: string;
  }