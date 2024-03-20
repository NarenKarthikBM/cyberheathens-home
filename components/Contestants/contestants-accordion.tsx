'use client';

import { Accordion, Table } from '@mantine/core';
import { Contestant } from '@/app/types/contestants';
import { GROUPS } from '@/app/constants/lists';

export function ContestantsAccordion(props: { contestants: Array<Contestant> }) {
  return (
    <Accordion>
      {GROUPS.map((group) => (
        <Accordion.Item key={group.value} value={group.value}>
          <Accordion.Control>{group.label}</Accordion.Control>
          <Accordion.Panel>
            <Table
              data={{
                head: ['Name', 'Language', 'Batch', 'HR ID'],
                body: props.contestants
                  .filter((contestant) => contestant.groupName === group.value)
                  .map((contestant) => [
                    contestant.name,
                    contestant.languages[0],
                    contestant.batch,
                    contestant.hrID,
                  ]),
              }}
            />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
