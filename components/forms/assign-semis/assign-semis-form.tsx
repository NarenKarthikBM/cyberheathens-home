'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@mantine/core';
import { assignSemis } from '@/components/actions/assign-semis';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" color="cyan" disabled={pending} mx="auto">
      {pending ? 'Assigning..' : 'Assign Semis'}
    </Button>
  );
}

const AssignSemisForm = () => {
  const [state, formAction] = useFormState(assignSemis, {
    status: 0,
  });

  console.log(state);

  return (
    <form action={formAction} style={{ width: 'fit-content', margin: 'auto' }}>
      <SubmitButton />
    </form>
  );
};

export default AssignSemisForm;
