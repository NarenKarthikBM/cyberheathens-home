'use server';

import { kv } from '@vercel/kv';
import { revalidatePath } from 'next/cache';
import { Contestant } from '@/app/types/contestants';

export async function editContestant(prevState: any, formData: FormData) {
  const emailID = formData.get('email_id')?.toString();
  const name = formData.get('name')?.toString();
  const groupName = formData.get('group_name')?.toString();
  const language = formData.get('language')?.toString();
  const batch = formData.get('batch')?.toString();
  const hrID = formData.get('hr_id')?.toString();

  if (
    emailID === undefined ||
    name === undefined ||
    groupName === undefined ||
    language === undefined ||
    hrID === undefined ||
    batch === undefined
  ) {
    return { status: 400 };
  }

  try {
    const contestants = (await kv.get<Contestant[]>('contestants')) || [];
    const newContestants = contestants.filter(
      (contestant) => contestant.emailID !== prevState.emailID
    );
    newContestants.push({
      name,
      groupName,
      languages: [language],
      batch,
      hrID,
      emailID,
      description: '',
      image: '',
    });
    await kv.set('contestants', newContestants);
    revalidatePath('/');
    return { status: 200, emailID: prevState.emailID };
  } catch (error) {
    return { status: 400, emailID: prevState.emailID };
  }
}
