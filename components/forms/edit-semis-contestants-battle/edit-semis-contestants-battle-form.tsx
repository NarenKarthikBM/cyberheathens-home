'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Modal, Select, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Contestant } from '@/app/types/contestants';
import { editSemisContestants } from '@/components/actions/edit-semis-contestants';
import { Semis } from '@/app/types/rounds';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const EditSemisContestants = (props: { contestants: Contestant[]; groupName: string }) => {
  const [state, formAction] = useFormState(editSemisContestants, {
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
        Edit
      </Button>
      <Modal opened={opened} onClose={close} title="Edit Semis Contestants" centered>
        <form action={formAction}>
          <Stack>
            <Select
              label="Contestant 1"
              placeholder="Pick a Contestant"
              data={props.contestants
                // .filter((contestant) => contestant.groupName === props.groupName)
                .map((contestant) => ({
                  label: `${contestant.name} (${contestant.batch}) (${contestant.languages[0]})`,
                  value: contestant.emailID,
                }))}
              name="email_id_1"
              searchable
              required
            />
            <Select
              label="Contestant 2"
              placeholder="Pick a Contestant"
              data={props.contestants.map((contestant) => ({
                label: `${contestant.name} (${contestant.batch}) (${contestant.languages[0]})`,
                value: contestant.emailID,
              }))}
              searchable
              name="email_id_2"
            />
            <Select
              label="Contestant 3"
              placeholder="Pick a Contestant"
              data={props.contestants.map((contestant) => ({
                label: `${contestant.name} (${contestant.batch}) (${contestant.languages[0]})`,
                value: contestant.emailID,
              }))}
              searchable
              name="email_id_3"
            />
            <SubmitButton />
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default EditSemisContestants;
