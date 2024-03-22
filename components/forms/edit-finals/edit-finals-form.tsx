'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Group, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Finals } from '@/app/types/rounds';
import { Contestant } from '@/app/types/contestants';
import { editFinals } from '@/components/actions/edit-finals';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="green" fullWidth mt="lg">
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const EditFinalsBattleForm = (props: { battle: Finals; contestants: Array<Contestant> }) => {
  const [state, formAction] = useFormState(editFinals, {
    status: 0,
    contestantIDs: props.battle.contestantIDs,
  });
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (state.status === 200) {
      close();
    }
  }, [state]);

  return (
    <>
      <Group justify="center">
        <Button onClick={open} color="green">
          Set Winner
        </Button>
      </Group>
      <Modal opened={opened} onClose={close} title="Set Winner" centered>
        <form action={formAction}>
          <Select
            label="Winner"
            placeholder="Pick a Winner"
            data={props.contestants
              .filter((contestant) => props.battle?.contestantIDs.includes(contestant.emailID))
              .map((contestant) => ({
                label: `${contestant.name} (${contestant.batch})`,
                value: contestant.emailID,
              }))}
            name="winnerID"
            required
          />
          <SubmitButton />
        </form>
      </Modal>
    </>
  );
};

export default EditFinalsBattleForm;
