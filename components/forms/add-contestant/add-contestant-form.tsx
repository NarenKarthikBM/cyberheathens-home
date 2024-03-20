'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Autocomplete, Button, Modal, Select, Stack, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { BATCHES, GROUPS, LANGUAGES } from '@/app/constants/lists';
import { addContestant } from '@/components/actions/add-contestant-action';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const AddContestantForm = () => {
  const [state, formAction] = useFormState(addContestant, {
    status: 0,
  });
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (state.status === 200) {
      close();
    }
  }, [state]);

  return (
    <>
      <Button onClick={open}>Add a Contestant</Button>
      <Modal opened={opened} onClose={close} title="Add a Contestant" centered>
        <form action={formAction}>
          <Stack>
            <TextInput label="Name" name="name" required />
            <Select
              label="Group"
              placeholder="Pick Group"
              data={GROUPS}
              name="group_name"
              required
            />
            <Select
              label="Language"
              placeholder="Pick Language"
              data={LANGUAGES}
              name="language"
              required
            />
            <Autocomplete
              label="Batch"
              placeholder="Pick Batch"
              data={BATCHES}
              name="batch"
              required
            />
            <TextInput label="Email ID" name="email_id" required />
            <TextInput label="HR ID" name="hr_id" required />
            <SubmitButton />
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default AddContestantForm;
