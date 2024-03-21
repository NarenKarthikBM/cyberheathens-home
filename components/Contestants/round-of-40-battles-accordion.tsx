'use client';

import { Accordion, Badge, Card, Group, Stack, Text } from '@mantine/core';
import { Contestant } from '@/app/types/contestants';
import { GROUPS } from '@/app/constants/lists';
import { RoundOf40Battle } from '@/app/types/rounds';
import { getContestant } from '@/app/utils/get-contestant';
import AddRoundOf40BattleForm from '../forms/add-round-of-40-battle/add-round-of-40-battle-form';
import RemoveRoundOf40BattleForm from '../forms/add-round-of-40-battle copy/add-round-of-40-battle-form';

export function RoundOf40BattlesAccordion(
  props: Readonly<{
    contestants: Array<Contestant>;
    battles: Array<RoundOf40Battle>;
  }>
) {
  return (
    <Accordion>
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
                      <Group justify="center">
                        <Stack>
                          <Group>
                            <Text
                              size="lg"
                              fw={contestant1?.emailID === battle.winnerID ? '700' : '400'}
                            >
                              {contestant1?.name}
                            </Text>
                            {contestant1?.emailID === battle.winnerID ? (
                              <Badge size="lg" color="green">
                                Winner
                              </Badge>
                            ) : null}
                          </Group>
                          <Group>
                            <Badge>Batch {contestant1?.batch}</Badge>
                            <Badge color="cyan">{contestant1?.languages[0]}</Badge>
                          </Group>
                        </Stack>
                        <Text size="lg">VS.</Text>
                        <Stack>
                          <Group>
                            <Text
                              size="lg"
                              fw={contestant2?.emailID === battle.winnerID ? '700' : '400'}
                            >
                              {contestant2?.name}
                            </Text>
                            {contestant2?.emailID === battle.winnerID ? (
                              <Badge size="lg" color="green">
                                Winner
                              </Badge>
                            ) : null}
                          </Group>

                          <Group>
                            <Badge>Batch {contestant2?.batch}</Badge>
                            <Badge color="cyan">{contestant2?.languages[0]}</Badge>
                          </Group>
                        </Stack>
                      </Group>
                      <Group justify="center" mt="lg">
                        <RemoveRoundOf40BattleForm contestants={battle.contestantIDs} />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-external-link"
                          width="44"
                          height="44"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="#2c3e50"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
                          <path d="M11 13l9 -9" />
                          <path d="M15 4h5v5" />
                        </svg>
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
