'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { RoundOf40Battle } from '@/app/types/rounds';

export async function editRoundOf40Battle(prevState: any, formData: FormData) {
  const winnerID = formData.get('winnerID');
  console.log(winnerID, prevState);
  if (winnerID === undefined) {
    return { status: 400 };
  }

  try {
    const battles = (await kv.get<RoundOf40Battle[]>('round_of_40_battles')) || [];
    const currentBattle = battles.filter(
      (battle) => battle.contestantIDs[0] === prevState.contestantIDs[0]
    )[0];
    await kv.set('round_of_40_battles', [
      ...battles.filter((battle) => battle.contestantIDs[0] !== prevState.contestantIDs[0]),
      { ...currentBattle, winnerID: winnerID || "" },
    ]);
    revalidatePath('/');
    return { status: 200, contestantIDs: prevState.contestantIDs };
  } catch (error) {
    return { status: 400, contestantIDs: prevState.contestantIDs };
  }
}
