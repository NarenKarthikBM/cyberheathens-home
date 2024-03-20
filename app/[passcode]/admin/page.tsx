import { Card, Container, Group, Stack, Table, Text, Title } from '@mantine/core';
import { kv } from '@vercel/kv';
import { Contestant } from '@/app/types/contestants';
import AddContestantForm from '@/components/forms/add-contestant/add-contestant-form';
import { RoundOf40Battle } from '@/app/types/rounds';
import { getContestant } from '@/app/utils/get-contestant';

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
        <Title order={2}>Contestants</Title>
        <Table
          data={{
            head: ['Name', 'Group Name', 'Language', 'Batch', 'HR ID'],
            body: contestantsList
              ? contestantsList.map((contestant) => [
                  contestant.name,
                  contestant.groupName,
                  contestant.languages[0],
                  contestant.batch,
                  contestant.hrID,
                ])
              : [],
          }}
        />
        <AddContestantForm />
      </Stack>
      <Stack gap="lg">
        <Title order={2}>Round of 40 Battles</Title>
        {contestantsList
          ? roundOf40BattlesList?.map((battle) => (
              <Card>
                <Group>
                  <Text size="lg">
                    {getContestant(contestantsList, battle.contestantIDs[0])?.name}
                  </Text>
                  <Text size="lg">VS.</Text>
                  <Text size="lg">
                    {getContestant(contestantsList, battle.contestantIDs[1])?.name}
                  </Text>
                </Group>
              </Card>
            ))
          : null}
        <AddContestantForm />
      </Stack>
    </Container>
  );
}
