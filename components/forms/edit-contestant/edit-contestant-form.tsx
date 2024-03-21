'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Autocomplete, Button, Modal, Select, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BATCHES, GROUPS, LANGUAGES } from '@/app/constants/lists';
import { Contestant } from '@/app/types/contestants';
import { editContestant } from '@/components/actions/edit-contestant';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const EditContestantForm = (props: { contestant: Contestant }) => {
  const [state, formAction] = useFormState(editContestant, {
    status: 0,
    emailID: props.contestant.emailID,
  });
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (state.status === 200) {
      close();
    }
  }, [state]);

  return (
    <>
      <Button onClick={open}>Edit Contestant</Button>
      <Modal opened={opened} onClose={close} title="Edit Contestant" centered>
        <form action={formAction}>
          <Stack>
            <TextInput label="Name" name="name" defaultValue={props.contestant.name} required />
            <Select
              label="Group"
              placeholder="Pick Group"
              data={GROUPS}
              name="group_name"
              defaultValue={props.contestant.groupName}
              required
            />
            <Select
              label="Language"
              placeholder="Pick Language"
              data={LANGUAGES}
              name="language"
              defaultValue={props.contestant.languages[0]}
              required
            />
            <Autocomplete
              label="Batch"
              placeholder="Pick Batch"
              data={BATCHES}
              name="batch"
              defaultValue={props.contestant.batch}
              required
            />
            <TextInput
              label="Email ID"
              name="email_id"
              defaultValue={props.contestant.emailID}
              required
            />
            <TextInput label="HR ID" name="hr_id" defaultValue={props.contestant.hrID} required />
            <SubmitButton />
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default EditContestantForm;
