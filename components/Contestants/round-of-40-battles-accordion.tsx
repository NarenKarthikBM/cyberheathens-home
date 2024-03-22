'use client';

import { Accordion, Badge, Card, Group, Stack, Text } from '@mantine/core';
import { Contestant } from '@/app/types/contestants';
import { GROUPS } from '@/app/constants/lists';
import { RoundOf40Battle } from '@/app/types/rounds';
import { getContestant } from '@/app/utils/get-contestant';
import AddRoundOf40BattleForm from '../forms/add-round-of-40-battle/add-round-of-40-battle-form';
import RemoveRoundOf40BattleForm from '../forms/remove-round-of-40-battle/remove-round-of-40-battle-form';
import EditRoundOf40BattleForm from '../forms/edit-round-of-40-battle/edit-round-of-40-battle-form';

export function RoundOf40BattlesAccordion(
  props: Readonly<{
    contestants: Array<Contestant>;
    battles: Array<RoundOf40Battle>;
  }>
) {
  return (
    <Accordion multiple>
      {GROUPS.map((group) => (
        <Accordion.Item key={group.value} value={group.value}>
          <Accordion.Control>{group.label}</Accordion.Control>
          <Accordion.Panel>
            <Stack justify="center">
              {props.battles
                .filter((battle) => battle.groupName === group.value)
                .map((battle) => {
                  const contestant1 = getContestant(props.contestants, battle.contestantIDs[0]);
                  const contestant2 = getContestant(props.contestants, battle.contestantIDs[1]);
                  return (
                    <Card key={`${contestant1?.name.toString()} ${contestant2?.name.toString()}`}>
                      <Group justify="space-evenly">
                        <Stack align="center" gap="xs">
                          {contestant1?.emailID === battle.winnerID ? (
                            <Badge size="sm" color="green">
                              Winner
                            </Badge>
                          ) : null}
                          <Group>
                            <Text
                              size="lg"
                              fw={contestant1?.emailID === battle.winnerID ? '700' : '400'}
                            >
                              {contestant1?.name}
                            </Text>
                          </Group>
                          <Group>
                            <Badge>Batch {contestant1?.batch}</Badge>
                            <Badge color="cyan">{contestant1?.languages[0]}</Badge>
                          </Group>
                        </Stack>
                        <Text size="lg">VS.</Text>
                        <Stack align="center" gap="xs">
                          {contestant2?.emailID === battle.winnerID ? (
                            <Badge size="sm" color="green">
                              Winner
                            </Badge>
                          ) : null}
                          <Group>
                            <Text
                              size="lg"
                              fw={contestant2?.emailID === battle.winnerID ? '700' : '400'}
                            >
                              {contestant2?.name}
                            </Text>
                          </Group>
                          <Group>
                            <Badge>Batch {contestant2?.batch}</Badge>
                            <Badge color="cyan">{contestant2?.languages[0]}</Badge>
                          </Group>
                        </Stack>
                      </Group>
                      <Group justify="center" mt="lg">
                        <RemoveRoundOf40BattleForm contestants={battle.contestantIDs} />
                        <EditRoundOf40BattleForm battle={battle} contestants={props.contestants} />
                      </Group>
                    </Card>
                  );
                })}
              <AddRoundOf40BattleForm
                contestants={props.contestants || []}
                groupName={group.value}
              />
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
