import Image from 'next/image';
import { Container, Group, Stack, Title } from '@mantine/core';
import { kv } from '@vercel/kv';
import Logo from '@/public/logo.png';
import { Contestant } from './types/contestants';
import { ContestantsAccordion } from '@/components/Contestants/contestants-accordion';
import { Finals, Qualifiers, RoundOf40Battle, Semis } from './types/rounds';

export default async function HomePage() {
  const constestantsList = await kv.get<Contestant[]>('contestants');
  const roundOf40battles = await kv.get<RoundOf40Battle[]>('round_of_40_battles');
  const qualifiers = await kv.get<Qualifiers[]>('qualifiers');
  const semis = await kv.get<Semis[]>('semis');
  const finals = await kv.get<Finals>('finals');
  console.log(constestantsList, roundOf40battles, qualifiers, semis, finals);

  return (
    <Container p="lg">
      <Group justify="center">
        <Image src={Logo} height={80} width={80} alt="Logo" />
        <Title order={1}>CodeClash</Title>
      </Group>
      <Stack gap="xl">
        <Stack gap="lg">
          <Title order={3}>Contestants</Title>
          <ContestantsAccordion contestants={constestantsList || []} />
        </Stack>
        <div>
          <Title order={3}>Round of 40</Title>
          <div>
            <Title order={4}>Battles</Title>
          </div>
        </div>
        <div>
          <Title order={3}>Qualifiers</Title>
          <div>
            <Title order={4}>Battles</Title>
          </div>
        </div>
        <div>
          <Title order={3}>Semis</Title>
          <div>
            <Title order={4}>Battles</Title>
          </div>
        </div>
        <div>
          <Title order={3}>Finals</Title>
          <div></div>
        </div>
      </Stack>
    </Container>
  );
}
