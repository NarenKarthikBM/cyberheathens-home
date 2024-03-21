export const dynamic = 'force-dynamic';

import { Container, Stack, Table, Title } from '@mantine/core';
import { kv } from '@vercel/kv';
import { Contestant } from '@/app/types/contestants';
import AddContestantForm from '@/components/forms/add-contestant/add-contestant-form';
import { RoundOf40Battle } from '@/app/types/rounds';
import { RoundOf40BattlesAccordion } from '@/components/Contestants/round-of-40-battles-accordion';
import EditContestantForm from '@/components/forms/edit-contestant/edit-contestant-form';
import AddContestantBulkForm from '@/components/forms/add-contestant-bulk/add-contestant-form';

export default async function AdminPage({ params }: { params: { passcode: string } }) {
  if (
    params.passcode !==
    'EMPTiz65lp5G72sDssazZDfCTWzAaILVI45X-JxCcYfhvqsHAn0cCqiFDpQMBeOUPg5WfmhR-yNZSn0dYlt6gw'
  ) {
    return null;
  }

  const contestantsList = await kv.get<Contestant[]>('contestants');
  const roundOf40BattlesList = await kv.get<RoundOf40Battle[]>('round_of_40_battles');
  console.log(contestantsList, roundOf40BattlesList);

  return (
    <Container p="lg">
      <Title order={1} style={{ textAlign: 'center' }}>
        Admin
      </Title>
      <Stack gap="lg">
        <Stack gap="lg">
          <Title order={2}>Contestants</Title>
          <AddContestantBulkForm />
          <Table
            data={{
              head: ['Name', 'Group Name', 'Language', 'Batch', 'HR ID', 'Action'],
              body: contestantsList
                ? contestantsList.map((contestant) => [
                    contestant.name,
                    contestant.groupName,
                    contestant.languages[0],
                    contestant.batch,
                    contestant.hrID,
                    <EditContestantForm contestant={contestant} />,
                  ])
                : [],
            }}
          />
          <AddContestantForm />
        </Stack>
        <Stack gap="lg">
          <Title order={2}>Round of 40 Battles</Title>
          <RoundOf40BattlesAccordion
            contestants={contestantsList || []}
            battles={roundOf40BattlesList || []}
          />
        </Stack>
      </Stack>
    </Container>
  );
}
