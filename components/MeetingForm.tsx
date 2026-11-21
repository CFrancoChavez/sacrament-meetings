'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';
import type { MeetingFormState } from '@/lib/actions';

interface MeetingFormProps {
  action: (prevState: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  initialMeeting?: SacramentMeeting;
  submitLabel: string;
}

export function MeetingForm({ action, initialMeeting, submitLabel }: MeetingFormProps) {
  const initialState: MeetingFormState = { message: null, errors: {} };
  const [state, formAction, isPending] = useActionState(action, initialState);

  const defaultAnnouncements = initialMeeting?.announcements?.join('\n') ?? '';
  const defaultWardBusiness =
    initialMeeting?.wardBusiness.map((b) => b.description).join('\n') ?? '';
  const defaultSpeakers =
    initialMeeting?.speakers
      .map((s) => `${s.name} | ${s.topic} | ${s.type}`)
      .join('\n') ?? '';

  return (
    <form action={formAction} className="space-y-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      {/* Date & Type */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-slate-700">
            Meeting Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={initialMeeting?.date ?? ''}
            aria-describedby="date-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div id="date-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.date?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="meetingType" className="block text-sm font-medium text-slate-700">
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={initialMeeting?.meetingType ?? 'regular'}
            aria-describedby="meetingType-error"
            className="mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="regular">Regular Meeting</option>
            <option value="testimony">Fast &amp; Testimony Meeting</option>
            <option value="stake">Stake Conference</option>
            <option value="general">General Conference</option>
            <option value="special">Special Program</option>
          </select>
          <div id="meetingType-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.meetingType?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="presiding" className="block text-sm font-medium text-slate-700">
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            placeholder="e.g., Bishop David Smith"
            defaultValue={initialMeeting?.presiding ?? ''}
            aria-describedby="presiding-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div id="presiding-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.presiding?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="conducting" className="block text-sm font-medium text-slate-700">
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            placeholder="e.g., Brother Carlos Perez"
            defaultValue={initialMeeting?.conducting ?? ''}
            aria-describedby="conducting-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div id="conducting-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.conducting?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Opening Hymn & Prayer */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="openingHymnNumber" className="block text-sm font-medium text-slate-700">
            Opening Hymn #
          </label>
          <input
            id="openingHymnNumber"
            name="openingHymnNumber"
            type="number"
            defaultValue={initialMeeting?.openingHymn.number ?? ''}
            aria-describedby="openingHymnNumber-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="openingHymnNumber-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.openingHymnNumber?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="openingHymnTitle" className="block text-sm font-medium text-slate-700">
            Opening Hymn Title
          </label>
          <input
            id="openingHymnTitle"
            name="openingHymnTitle"
            type="text"
            defaultValue={initialMeeting?.openingHymn.title ?? ''}
            aria-describedby="openingHymnTitle-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="openingHymnTitle-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.openingHymnTitle?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="openingPrayer" className="block text-sm font-medium text-slate-700">
            Invocation (Opening Prayer)
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={initialMeeting?.openingPrayer ?? ''}
            aria-describedby="openingPrayer-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="openingPrayer-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.openingPrayer?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Sacrament Hymn */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="sacramentHymnNumber" className="block text-sm font-medium text-slate-700">
            Sacrament Hymn #
          </label>
          <input
            id="sacramentHymnNumber"
            name="sacramentHymnNumber"
            type="number"
            defaultValue={initialMeeting?.sacramentHymn.number ?? ''}
            aria-describedby="sacramentHymnNumber-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="sacramentHymnNumber-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.sacramentHymnNumber?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="sacramentHymnTitle" className="block text-sm font-medium text-slate-700">
            Sacrament Hymn Title
          </label>
          <input
            id="sacramentHymnTitle"
            name="sacramentHymnTitle"
            type="text"
            defaultValue={initialMeeting?.sacramentHymn.title ?? ''}
            aria-describedby="sacramentHymnTitle-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="sacramentHymnTitle-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.sacramentHymnTitle?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Speakers & Musical Numbers */}
      <div>
        <label htmlFor="speakersText" className="block text-sm font-medium text-slate-700">
          Speakers &amp; Musical Numbers (one per line: Name | Topic | speaker or musical-number)
        </label>
        <textarea
          id="speakersText"
          name="speakersText"
          rows={3}
          placeholder="Sister Ana Gomez | Faith in Jesus Christ | speaker"
          defaultValue={defaultSpeakers}
          aria-describedby="speakersText-error"
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
        />
        <div id="speakersText-error" aria-live="polite" className="mt-1 text-xs text-red-600">
          {state.errors?.speakersText?.map((err) => (
            <p key={err}>{err}</p>
          ))}
        </div>
      </div>

      {/* Ward Business & Announcements */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="wardBusinessText" className="block text-sm font-medium text-slate-700">
            Ward Business (one item per line)
          </label>
          <textarea
            id="wardBusinessText"
            name="wardBusinessText"
            rows={2}
            defaultValue={defaultWardBusiness}
            aria-describedby="wardBusinessText-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="wardBusinessText-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.wardBusinessText?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="announcementsText" className="block text-sm font-medium text-slate-700">
            Announcements (one item per line)
          </label>
          <textarea
            id="announcementsText"
            name="announcementsText"
            rows={2}
            defaultValue={defaultAnnouncements}
            aria-describedby="announcementsText-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="announcementsText-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.announcementsText?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={initialMeeting?.stakeBusiness ?? false}
          className="h-4 w-4 rounded border-slate-300 text-blue-600"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium text-slate-700">
          Include Stake Business
        </label>
      </div>

      {/* Closing Hymn & Prayer */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="closingHymnNumber" className="block text-sm font-medium text-slate-700">
            Closing Hymn #
          </label>
          <input
            id="closingHymnNumber"
            name="closingHymnNumber"
            type="number"
            defaultValue={initialMeeting?.closingHymn.number ?? ''}
            aria-describedby="closingHymnNumber-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="closingHymnNumber-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.closingHymnNumber?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="closingHymnTitle" className="block text-sm font-medium text-slate-700">
            Closing Hymn Title
          </label>
          <input
            id="closingHymnTitle"
            name="closingHymnTitle"
            type="text"
            defaultValue={initialMeeting?.closingHymn.title ?? ''}
            aria-describedby="closingHymnTitle-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="closingHymnTitle-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.closingHymnTitle?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="closingPrayer" className="block text-sm font-medium text-slate-700">
            Benediction (Closing Prayer)
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={initialMeeting?.closingPrayer ?? ''}
            aria-describedby="closingPrayer-error"
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
          />
          <div id="closingPrayer-error" aria-live="polite" className="mt-1 text-xs text-red-600">
            {state.errors?.closingPrayer?.map((err) => (
              <p key={err}>{err}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Submit & Cancel */}
      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-4">
        <Link
          href="/meetings"
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
}