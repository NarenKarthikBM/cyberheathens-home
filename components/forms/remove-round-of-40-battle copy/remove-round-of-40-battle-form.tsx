'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { useEffect } from 'react';
import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { deleteRoundOf40Battle } from '@/components/actions/delete-round-of-40-battle';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} color="red" fullWidth mt="lg">
      {pending ? 'Deleting..' : 'Delete'}
    </Button>
  );
}

const RemoveRoundOf40BattleForm = (props: { contestants: Array<string> }) => {
  const [state, formAction] = useFormState(deleteRoundOf40Battle, {
    status: 0,
    contestantIDs: props.contestants,
  });
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (state.status === 200) {
      close();
    }
  }, [state]);

  return (
    <>
      <Button onClick={open} color="red">
        Delete
      </Button>
      <Modal opened={opened} onClose={close} title="Delete Round Of 40 Battle" centered>
        <form action={formAction}>
          <Text>
            This battle involves {props.contestants[0]} and {props.contestants[1]}
          </Text>
          <SubmitButton />
        </form>
      </Modal>
    </>
  );
};

export default RemoveRoundOf40BattleForm;
