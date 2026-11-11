import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  {
    id: 2,
    date: '2026-05-10',
    meetingType: 'testimony',
    presiding: 'Bishop Smith',
    conducting: 'Brother Miller',
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Johnson',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [],
    closingHymn: { number: 304, title: 'Teach Me to Walk in the Light' },
    closingPrayer: 'Sister Taylor',
    announcements: ['Youth activity: Wednesday at 7 PM']
  },
  {
    id: 3,
    date: '2026-05-17',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister Anderson',
    wardBusiness: [{ description: 'Releasing of Elders Quorum counselor' }],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Brother Wilson', topic: 'Service and Discipleship', type: 'speaker' },
      { name: 'Sister Clark', topic: 'Gratitude', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Thomas',
    announcements: ['Self-reliance class starts next Tuesday']
  },
  {
    id: 4,
    date: '2026-05-24',
    meetingType: 'stake',
    presiding: 'Stake President Nelson',
    conducting: 'President Nelson',
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Sister White',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'High Councilor Lee', topic: 'Covenants', type: 'speaker' }
    ],
    closingHymn: { number: 2, title: 'The Spirit of God' },
    closingPrayer: 'Brother Harris',
    announcements: ['Stake Conference broadcast schedule']
  },
  {
    id: 5,
    date: '2026-05-31',
    meetingType: 'general',
    presiding: 'Bishop Smith',
    conducting: 'Brother Miller',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Brother Martin',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 180, title: 'Father in Heaven, We Pay Thee This Day' },
    speakers: [
      { name: 'Primary Children', topic: 'Articles of Faith', type: 'musical-number' },
      { name: 'Sister Young', topic: 'Prayer and Revelation', type: 'speaker' }
    ],
    closingHymn: { number: 98, title: 'I Need Thee Every Hour' },
    closingPrayer: 'Sister Jackson',
    announcements: ['Ward picnic scheduled for June 6']
  }
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}