'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { RoundOf40Battle } from '@/app/types/rounds';

export async function deleteRoundOf40Battle(prevState: any, formData: FormData) {
  console.log(formData.get('none'));
  try {
    const battles = (await kv.get<RoundOf40Battle[]>('round_of_40_battles')) || [];
    await kv.set(
      'round_of_40_battles',
      battles.filter((battle) => battle.contestantIDs === prevState.contestantIDs)
    );
    revalidatePath('/');
    return { status: 200, contestantIDs: prevState.contestantIDs };
  } catch (error) {
    return { status: 400, contestantIDs: prevState.contestantIDs };
  }
}
