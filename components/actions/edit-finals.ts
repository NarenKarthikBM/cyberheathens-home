'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { Finals } from '@/app/types/rounds';

export async function editFinals(prevState: any, formData: FormData) {
  const winnerID = formData.get('winnerID');
  if (winnerID === undefined) {
    return { status: 400 };
  }

  try {
    const finals = (await kv.get<Finals>('finals')) || [];
    await kv.set('finals', { ...finals, winnerID });
    revalidatePath('/');
    return { status: 200, contestantIDs: prevState.contestantIDs };
  } catch (error) {
    return { status: 400, contestantIDs: prevState.contestantIDs };
  }
}
