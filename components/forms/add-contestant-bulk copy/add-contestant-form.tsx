'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Modal, Stack, Textarea } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { addContestants } from '@/components/actions/add-contestants-bulk';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving..' : 'Save'}
    </Button>
  );
}

const AddContestantBulkForm = () => {
  const [state, formAction] = useFormState(addContestants, {
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
      <Button onClick={open}>Add Contestants (JSON)</Button>
      <Modal opened={opened} onClose={close} title="Add Contestants" centered>
        <form action={formAction}>
          <Stack>
            <Textarea label="JSON" name="bulk" required />
            <SubmitButton />
          </Stack>
        </form>
      </Modal>
    </>
  );
};

export default AddContestantBulkForm;
