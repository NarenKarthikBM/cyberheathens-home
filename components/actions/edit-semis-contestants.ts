'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { Semis } from '@/app/types/rounds';

export async function editSemisContestants(prevState: any, formData: FormData) {
  const emailID1 = formData.get('email_id_1')?.toString();
  const emailID2 =
    formData.get('email_id_2') !== undefined ? formData.get('email_id_2')?.toString() : null;
  const emailID3 =
    formData.get('email_id_3') !== undefined ? formData.get('email_id_3')?.toString() : null;
  const hrLink = '';

  if (emailID1 === undefined || prevState.groupName === undefined || hrLink === undefined) {
    return { status: 400 };
  }

  const contestantIDsList = [emailID1];
  if (emailID2) {
    contestantIDsList.push(emailID2);
  }
  if (emailID3) {
    contestantIDsList.push(emailID3);
  }

  try {
    const battles = (await kv.get<Semis[]>('semis_battles')) || [];
    const newBattles = battles.filter((battle) => battle.groupName !== prevState.groupName);
    newBattles.push({
      contestantIDs: contestantIDsList,
      groupName: prevState.groupName,
      hrLink,
      winnerID: '',
    });
    await kv.set('semis_battles', newBattles);
    revalidatePath('/');
    return { status: 200, groupName: prevState.groupName };
  } catch (error) {
    return { status: 400, groupName: prevState.groupName };
  }
}
