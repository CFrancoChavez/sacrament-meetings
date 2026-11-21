'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
  addMeeting,
  updateMeeting as updateMeetingInDb,
  deleteMeeting as deleteMeetingInDb,
} from './meetings-db';
import type { MeetingType, SpeakerItem, WardBusinessItem } from './types';

const MeetingFormSchema = z.object({
  date: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Please enter a valid date (YYYY-MM-DD).'),
  meetingType: z.enum(['regular', 'testimony', 'stake', 'general', 'special'], {
    message: 'Please select a valid meeting type.',
  }),
  presiding: z.string().trim().min(2, 'Presiding leader is required (min 2 characters).'),
  conducting: z.string().trim().min(2, 'Conducting leader is required (min 2 characters).'),
  openingHymnNumber: z.coerce
    .number({ message: 'Opening hymn number must be a number.' })
    .int()
    .min(1, 'Opening hymn number must be at least 1.')
    .max(400, 'Opening hymn number must be 400 or less.'),
  openingHymnTitle: z.string().trim().min(2, 'Opening hymn title is required.'),
  openingPrayer: z.string().trim().min(2, 'Opening prayer name is required.'),
  sacramentHymnNumber: z.coerce
    .number({ message: 'Sacrament hymn number must be a number.' })
    .int()
    .min(1, 'Sacrament hymn number must be at least 1.')
    .max(400, 'Sacrament hymn number must be 400 or less.'),
  sacramentHymnTitle: z.string().trim().min(2, 'Sacrament hymn title is required.'),
  closingHymnNumber: z.coerce
    .number({ message: 'Closing hymn number must be a number.' })
    .int()
    .min(1, 'Closing hymn number must be at least 1.')
    .max(400, 'Closing hymn number must be 400 or less.'),
  closingHymnTitle: z.string().trim().min(2, 'Closing hymn title is required.'),
  closingPrayer: z.string().trim().min(2, 'Closing prayer name is required.'),
  announcementsText: z.string().optional(),
  wardBusinessText: z.string().optional(),
  stakeBusiness: z.boolean().optional(),
  speakersText: z.string().optional(),
});

export type MeetingFormState = {
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingHymnNumber?: string[];
    openingHymnTitle?: string[];
    openingPrayer?: string[];
    sacramentHymnNumber?: string[];
    sacramentHymnTitle?: string[];
    closingHymnNumber?: string[];
    closingHymnTitle?: string[];
    closingPrayer?: string[];
    announcementsText?: string[];
    wardBusinessText?: string[];
    speakersText?: string[];
  };
  message?: string | null;
};

function parseLines(raw?: string): string[] {
  if (!raw) return [];
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function parseWardBusiness(raw?: string): WardBusinessItem[] {
  return parseLines(raw).map((description) => ({ description }));
}

function parseSpeakers(raw?: string): SpeakerItem[] {
  return parseLines(raw).map((line) => {
    const [namePart, topicPart, typePart] = line.split('|').map((s) => s.trim());
    return {
      name: namePart || 'TBD',
      topic: topicPart || 'Gospel Message',
      type: typePart === 'musical-number' ? 'musical-number' : 'speaker',
    };
  });
}

function extractPayload(formData: FormData) {
  return {
    date: formData.get('date'),
    meetingType: formData.get('meetingType'),
    presiding: formData.get('presiding'),
    conducting: formData.get('conducting'),
    openingHymnNumber: formData.get('openingHymnNumber'),
    openingHymnTitle: formData.get('openingHymnTitle'),
    openingPrayer: formData.get('openingPrayer'),
    sacramentHymnNumber: formData.get('sacramentHymnNumber'),
    sacramentHymnTitle: formData.get('sacramentHymnTitle'),
    closingHymnNumber: formData.get('closingHymnNumber'),
    closingHymnTitle: formData.get('closingHymnTitle'),
    closingPrayer: formData.get('closingPrayer'),
    announcementsText: formData.get('announcementsText')?.toString() ?? '',
    wardBusinessText: formData.get('wardBusinessText')?.toString() ?? '',
    stakeBusiness: formData.get('stakeBusiness') === 'on',
    speakersText: formData.get('speakersText')?.toString() ?? '',
  };
}

export async function createMeeting(
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  void prevState;
  const validatedFields = MeetingFormSchema.safeParse(extractPayload(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to create meeting.',
    };
  }

  const data = validatedFields.data;

  try {
    await addMeeting({
      date: data.date,
      meetingType: data.meetingType as MeetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: parseLines(data.announcementsText),
      openingHymn: {
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      },
      openingPrayer: data.openingPrayer,
      wardBusiness: parseWardBusiness(data.wardBusinessText),
      stakeBusiness: Boolean(data.stakeBusiness),
      sacramentHymn: {
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      },
      speakers: parseSpeakers(data.speakersText),
      closingHymn: {
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    console.error('Database Error in createMeeting:', error);
    throw new Error('Failed to create sacrament meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  prevState: MeetingFormState,
  formData: FormData
): Promise<MeetingFormState> {
  void prevState;
  const validatedFields = MeetingFormSchema.safeParse(extractPayload(formData));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing or invalid fields. Failed to update meeting.',
    };
  }

  const data = validatedFields.data;

  try {
    await updateMeetingInDb(id, {
      date: data.date,
      meetingType: data.meetingType as MeetingType,
      presiding: data.presiding,
      conducting: data.conducting,
      announcements: parseLines(data.announcementsText),
      openingHymn: {
        number: data.openingHymnNumber,
        title: data.openingHymnTitle,
      },
      openingPrayer: data.openingPrayer,
      wardBusiness: parseWardBusiness(data.wardBusinessText),
      stakeBusiness: Boolean(data.stakeBusiness),
      sacramentHymn: {
        number: data.sacramentHymnNumber,
        title: data.sacramentHymnTitle,
      },
      speakers: parseSpeakers(data.speakersText),
      closingHymn: {
        number: data.closingHymnNumber,
        title: data.closingHymnTitle,
      },
      closingPrayer: data.closingPrayer,
    });
  } catch (error) {
    console.error('Database Error in updateMeeting:', error);
    throw new Error('Failed to update sacrament meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number): Promise<void> {
  try {
    await deleteMeetingInDb(id);
  } catch (error) {
    console.error('Database Error in deleteMeeting:', error);
    throw new Error('Failed to delete sacrament meeting. Please try again.');
  }

  revalidatePath('/meetings');
}