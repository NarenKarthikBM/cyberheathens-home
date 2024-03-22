import {
  Badge,
  Card,
  CardSection,
  Container,
  Divider,
  Flex,
  Group,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { kv } from '@vercel/kv';
import { Contestant } from '@/app/types/contestants';
import AddContestantForm from '@/components/forms/add-contestant/add-contestant-form';
import { Finals, RoundOf40Battle, Semis } from '@/app/types/rounds';
import { RoundOf40BattlesAccordion } from '@/components/Contestants/round-of-40-battles-accordion';
import EditContestantForm from '@/components/forms/edit-contestant/edit-contestant-form';
import AddContestantBulkForm from '@/components/forms/add-contestant-bulk/add-contestant-form';
import { SEMIS_GROUPS } from '@/app/constants/lists';
import AssignSemisForm from '@/components/forms/assign-semis/assign-semis-form';
import { getContestant } from '@/app/utils/get-contestant';
import EditSemisBattleForm from '@/components/forms/edit-semis-battle/edit-semis-battle-form';
import EditFinalsBattleForm from '@/components/forms/edit-finals/edit-finals-form';

export const dynamic = 'force-dynamic';

function sortContestants(a: Contestant, b: Contestant) {
  if (a.languages[0] === b.languages[0]) {
    if (a.batch && b.batch) {
      return Number(b.batch) - Number(a.batch);
    }
    return 0;
  }
  return a.languages[0].localeCompare(b.languages[0]);
}

export default async function AdminPage({ params }: { params: { passcode: string } }) {
  if (
    params.passcode !==
    'EMPTiz65lp5G72sDssazZDfCTWzAaILVI45X-JxCcYfhvqsHAn0cCqiFDpQMBeOUPg5WfmhR-yNZSn0dYlt6gw'
  ) {
    return null;
  }

  const contestantsList = await kv.get<Contestant[]>('contestants');
  const roundOf40BattlesList = await kv.get<RoundOf40Battle[]>('round_of_40_battles');
  const semisBattleList = await kv.get<Semis[]>('semis_battles');
  const finals = await kv.get<Finals>('finals');
  const grandWinner =
    finals && finals.winnerID !== '' ? getContestant(contestantsList || [], finals.winnerID) : null;

  return (
    <Container p="lg">
      <Title order={1} style={{ textAlign: 'center' }}>
        Admin
      </Title>
      <Stack gap="lg">
        <Title order={2}>Contestants</Title>
        <AddContestantBulkForm />
        <Table
          data={{
            head: ['Name', 'Language', 'Batch', 'HR ID', 'Action'],
            body: contestantsList
              ? contestantsList
                  .sort((a, b) => sortContestants(a, b))
                  .map((contestant) => [
                    contestant.name,
                    // contestant.groupName,
                    contestant.languages[0],
                    contestant.batch,
                    contestant.hrID,
                    <EditContestantForm contestant={contestant} />,
                  ])
              : [],
          }}
        />
        <AddContestantForm />
        <Divider />
        <Title order={2}>Round of 30 Battles</Title>
        <RoundOf40BattlesAccordion
          contestants={contestantsList || []}
          battles={roundOf40BattlesList || []}
        />
        <Divider />
        <Title order={2}>Semis</Title>
        <AssignSemisForm />
        <Group justify="space-evenly" gap="lg">
          {SEMIS_GROUPS.map((group) => {
            const battle = semisBattleList
              ? semisBattleList.filter((semisBattle) => semisBattle.groupName === group.value)[0]
              : null;
            return (
              <Card key={group.value} w="400px">
                <CardSection withBorder inheritPadding py="xs">
                  <Group justify="space-between">
                    <Text fw={500} size="lg">
                      {group.label}
                    </Text>
                    <EditSemisBattleForm contestants={contestantsList || []} battle={battle} />
                  </Group>
                </CardSection>
                <CardSection inheritPadding py="xs">
                  <Stack align="center" gap="lg" style={{ width: '100%' }}>
                    {battle
                      ? battle.contestantIDs.map((contestantID) => {
                          const contestant = getContestant(contestantsList || [], contestantID);
                          return (
                            <Group
                              wrap="wrap"
                              bg={
                                battle?.winnerID === contestant?.emailID ? 'darkgreen' : undefined
                              }
                              style={{ width: '100%' }}
                              p="sm"
                            >
                              <Text
                                size="lg"
                                fw={battle?.winnerID === contestant?.emailID ? '700' : '400'}
                              >
                                {contestant?.name}
                              </Text>
                              <Badge>Batch {contestant?.batch}</Badge>
                              <Badge color="cyan">{contestant?.languages[0]}</Badge>
                            </Group>
                          );
                        })
                      : null}
                  </Stack>
                </CardSection>
              </Card>
            );
          })}
        </Group>
        <Divider />
        <Title order={2}>Grand Finale</Title>
        {finals ? (
          <EditFinalsBattleForm contestants={contestantsList || []} battle={finals} />
        ) : null}
        {grandWinner ? (
          <Group justify="center">
            <Card
              w="400px"
              h="250px"
              shadow="lg"
              radius="lg"
              withBorder
              style={{ border: '2px solid green' }}
            >
              <Flex
                direction="column"
                align="center"
                justify="center"
                style={{ width: '100%', height: '100%' }}
                gap="lg"
              >
                <Title>{grandWinner?.name}</Title>
                <Group>
                  <Badge size="lg">Batch {grandWinner?.batch}</Badge>
                  <Badge size="lg" color="cyan">
                    {grandWinner?.languages[0]}
                  </Badge>
                </Group>
                <Badge size="xl" color="green">
                  Winner
                </Badge>
              </Flex>
            </Card>
          </Group>
        ) : null}
        {finals ? (
          <Group justify="space-evenly" gap="lg">
            {finals.contestantIDs
              .filter((finalist) => finalist !== finals.winnerID)
              .map((finalist, id: number) => {
                const contestant = getContestant(contestantsList || [], finalist);
                return (
                  <Card key={finalist + id.toString()} w="400px" h="250px" shadow="lg" radius="lg">
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      style={{ width: '100%', height: '100%' }}
                      gap="lg"
                    >
                      <Title>{contestant?.name}</Title>
                      <Group>
                        <Badge size="lg">Batch {contestant?.batch}</Badge>
                        <Badge size="lg" color="cyan">
                          {contestant?.languages[0]}
                        </Badge>
                      </Group>
                    </Flex>
                  </Card>
                );
              })}
          </Group>
        ) : null}
      </Stack>
    </Container>
  );
}
