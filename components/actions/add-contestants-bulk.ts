'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { Contestant } from '@/app/types/contestants';

export async function addContestants(prevState: any, formData: FormData) {
  const json = formData.get('bulk')?.toString();
  if (json === undefined) {
    return { status: 400 };
  }
  const contestantsList = JSON.parse(json);
  const contestants: Contestant[] = contestantsList.map((contestant: any) => ({
    name: contestant.name,
    emailID: contestant.emailID,
    groupName: '',
    hrID: contestant.hrID,
    languages: [contestant.languages.toLowerCase()],
    batch: contestant.batch,
    description: '',
    image: '',
  }));

  try {
    await kv.set('contestants', contestants);
    revalidatePath('/');
    return { status: 200 };
  } catch (error) {
    return { status: 400 };
  }
}
