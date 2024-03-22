'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { RoundOf40Battle, Semis } from '@/app/types/rounds';
import { SEMIS_GROUPS } from '@/app/constants/lists';

function shuffleArray(array: Array<string>) {
  const newArr = array;
  for (let i = newArr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export async function assignSemis(prevState: any, formData: FormData) {
  console.log(prevState, formData.get('none'));
  const battles = await kv.get<Array<RoundOf40Battle>>('round_of_40_battles');
  if (battles == null) {
    return { status: 400 };
  }

  const winners = shuffleArray(battles.map((battle) => battle.winnerID));
  const semisGroups: Array<Semis> = SEMIS_GROUPS.map((group) => ({
    groupName: group.value,
    contestantIDs: [],
    hrLink: '',
    winnerID: '',
  }));
  for (let index = 0; index < winners.length; index += 1) {
    const winnerID: string = winners[index];
    semisGroups[index % 5].contestantIDs.push(winnerID);
  }
  try {
    await kv.set('semis_battles', semisGroups);
    revalidatePath('/');
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
}
