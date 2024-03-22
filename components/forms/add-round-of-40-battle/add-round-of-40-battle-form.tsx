'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Modal, Select, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GROUPS } from '@/app/constants/lists';
import { addRoundOf40Battle } from '@/components/actions/add-round-of-40-battle';
import { Contestant } from '@/app/types/contestants';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const AddRoundOf40BattleForm = (props: { contestants: Contestant[]; groupName: string }) => {
  const [state, formAction] = useFormState(addRoundOf40Battle, {
    status: 0,
    groupName: props.groupName,
  });
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (state.status === 200) {
      close();
    }
  }, [state]);

  return (
    <>
      <Button onClick={open} mx="auto">
        Add a Round Of 40 Battle
      </Button>
      <Modal opened={opened} onClose={close} title="Add a Round Of 40 Battle" centered>
        <form action={formAction}>
          <Stack>
            <Select
              label="Contestant 1"
              placeholder="Pick a Contestant"
              data={props.contestants
                // .filter((contestant) => contestant.groupName === props.groupName)
                .map((contestant) => ({
                  label: `${contestant.name} (${contestant.batch})`,
                  value: contestant.emailID,
                }))}
              name="email_id_1"
              required
            />
            <Select
              label="Contestant 2"
              placeholder="Pick a Contestant"
              data={props.contestants.map((contestant) => ({
                label: `${contestant.name} (${contestant.batch}) (${contestant.languages[0]})`,
                value: contestant.emailID,
              }))}
              name="email_id_2"
              required
            />
            <Select
              label="Group"
              placeholder="Pick Group"
              data={GROUPS}
              name="group_name"
              value={props.groupName}
              required
              disabled
            />
            <TextInput label="HR Link" name="hr_link" required />
            <SubmitButton />
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default AddRoundOf40BattleForm;
