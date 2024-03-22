'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { Semis } from '@/app/types/rounds';

export async function editSemisBattle(prevState: any, formData: FormData) {
  const winnerID = formData.get('winnerID');
  if (winnerID === undefined) {
    return { status: 400 };
  }

  try {
    const battles = (await kv.get<Semis[]>('semis_battles')) || [];
    const currentBattle = battles.filter(
      (battle) => battle.contestantIDs[0] === prevState.contestantIDs[0]
    )[0];
    await kv.set('semis_battles', [
      ...battles.filter((battle) => battle.contestantIDs[0] !== prevState.contestantIDs[0]),
      { ...currentBattle, winnerID },
    ]);
    const finalists = [
      ...battles.filter((battle) => battle.contestantIDs[0] !== prevState.contestantIDs[0]),
      { ...currentBattle, winnerID },
    ]
      .filter((semis) => semis.winnerID !== '')
      .map((semis) => semis.winnerID);
    await kv.set('finals', { contestantIDs: finalists, hrLink: '', winnerID: '' });
    revalidatePath('/');
    return { status: 200, contestantIDs: prevState.contestantIDs };
  } catch (error) {
    return { status: 400, contestantIDs: prevState.contestantIDs };
  }
}
