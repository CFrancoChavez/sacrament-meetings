import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);
const ITEMS_PER_PAGE = 5;

export async function getMeetings(
  query: string = '',
  currentPage: number = 1,
  date?: string | null
): Promise<SacramentMeeting[]> {
  if (date) {
    const rows = await sql`
      SELECT
        id,
        to_char(date, 'YYYY-MM-DD') AS "date",
        meeting_type                AS "meetingType",
        presiding,
        conducting,
        announcements,
        opening_hymn                AS "openingHymn",
        opening_prayer              AS "openingPrayer",
        ward_business               AS "wardBusiness",
        stake_business              AS "stakeBusiness",
        sacrament_hymn              AS "sacramentHymn",
        speakers,
        closing_hymn                AS "closingHymn",
        closing_prayer              AS "closingPrayer"
      FROM meetings
      WHERE date = ${date}::date
      ORDER BY date DESC
    `;
    return rows as unknown as SacramentMeeting[];
  }

  const safePage = Math.max(1, Number.isFinite(currentPage) ? Math.floor(currentPage) : 1);
  const searchTerm = `%${query.trim()}%`;
  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding        ILIKE ${searchTerm}
      OR conducting    ILIKE ${searchTerm}
      OR meeting_type  ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return rows as unknown as SacramentMeeting[];
}

export async function getMeetingsTotalPages(query: string = ''): Promise<number> {
  const searchTerm = `%${query.trim()}%`;

  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding        ILIKE ${searchTerm}
      OR conducting    ILIKE ${searchTerm}
      OR meeting_type  ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  return Math.max(1, Math.ceil(Number(rows[0].count) / ITEMS_PER_PAGE));
}

export async function getMeetingById(id: number): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
  `;

  return (rows[0] as unknown as SacramentMeeting) ?? null;
}

// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(
  _data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  void _data;
  throw new Error('addMeeting: database implementation coming in Week 04');
}

export async function updateMeeting(
  _id: number,
  _updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  void _id;
  void _updates;
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(_id: number): Promise<boolean> {
  void _id;
  throw new Error('deleteMeeting: database implementation coming in Week 04');
}