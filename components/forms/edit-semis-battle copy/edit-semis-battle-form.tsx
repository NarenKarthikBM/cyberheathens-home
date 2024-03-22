'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Semis } from '@/app/types/rounds';
import { Contestant } from '@/app/types/contestants';
import { editSemisBattle } from '@/components/actions/edit-semis-battle';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="green" fullWidth mt="lg">
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const EditSemisBattleForm = (props: { battle: Semis | null; contestants: Array<Contestant> }) => {
  const [state, formAction] = useFormState(editSemisBattle, {
    status: 0,
    contestantIDs: props.battle?.contestantIDs,
  });
  const [opened, { open, close }] = useDisclosure(false);

  if (props.battle === null) {
    return null;
  }

  useEffect(() => {
    if (state.status === 200) {
      close();
    }
  }, [state]);

  return (
    <>
      <Button onClick={open} color="green">
        Set Winner
      </Button>
      <Modal opened={opened} onClose={close} title="Set Winner of Battle" centered>
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

export default EditSemisBattleForm;
