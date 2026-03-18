import { fetchEventsFromSheet } from './google-sheets';

export interface MathEvent {
  id: string;
  title: string;
  organization: string;
  startDate: string;
  endDate: string;
  category: '공모전' | '경시대회' | '캠프' | '학술대회' | '교육/연수' | string;
  target: string[];
  region: string;
  image: string;
  link: string;
  isForeign?: boolean;
}

const FOREIGN_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1XHqx2vhtNKvWTd29STpumq4yzQG4sYfC77088y_Z72Q/export?format=csv&gid=796189473';
const DOMESTIC_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1mIuU2vOWnrn7Shl5aV_ckGvUpDOSG2QIoqfj7knxd3U/export?format=csv&gid=555511388';

export async function getEvents(): Promise<MathEvent[]> {
  try {
    const [foreignEvents, domesticEvents] = await Promise.all([
      fetchEventsFromSheet(FOREIGN_SHEET_URL, true),
      fetchEventsFromSheet(DOMESTIC_SHEET_URL, false)
    ]);

    return [...domesticEvents, ...foreignEvents];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}
