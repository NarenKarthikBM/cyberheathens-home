'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Modal, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { RoundOf40Battle } from '@/app/types/rounds';
import { Contestant } from '@/app/types/contestants';
import { editRoundOf40Battle } from '@/components/actions/edit-round-of-40-battle';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="green" fullWidth mt="lg">
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const EditRoundOf40BattleForm = (props: {
  battle: RoundOf40Battle;
  contestants: Array<Contestant>;
}) => {
  const [state, formAction] = useFormState(editRoundOf40Battle, {
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
      <Button onClick={open} color="green">
        Set Winner
      </Button>
      <Modal opened={opened} onClose={close} title="Set Winner of Battle" centered>
        <form action={formAction}>
          <Select
            label="Winner"
            placeholder="Pick a Winner"
            data={props.contestants
              .filter((contestant) => props.battle.contestantIDs.includes(contestant.emailID))
              .map((contestant) => ({
                label: `${contestant.name} (${contestant.batch})`,
                value: contestant.emailID,
              }))}
            name="winnerID"
            clearable
          />
          <SubmitButton />
        </form>
      </Modal>
    </>
  );
};

export default EditRoundOf40BattleForm;
