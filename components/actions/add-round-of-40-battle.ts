'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { RoundOf40Battle } from '@/app/types/rounds';

export async function addRoundOf40Battle(prevState: any, formData: FormData) {
  const emailID1 = formData.get('email_id_1')?.toString();
  const emailID2 = formData.get('email_id_2')?.toString();
  const hrLink = formData.get('hr_link')?.toString();

  if (
    emailID1 === undefined ||
    emailID2 === undefined ||
    prevState.groupName === undefined ||
    hrLink === undefined
  ) {
    return { status: 400 };
  }

  try {
    const battles = (await kv.get<RoundOf40Battle[]>('round_of_40_battles')) || [];
    battles.push({
      contestantIDs: [emailID1, emailID2],
      groupName: prevState.groupName,
      hrLink,
      winnerID: '',
    });
    await kv.set('round_of_40_battles', battles);
    revalidatePath('/');
    return { status: 200, groupName: prevState.groupName };
  } catch (error) {
    return { status: 400, groupName: prevState.groupName };
  }
}
