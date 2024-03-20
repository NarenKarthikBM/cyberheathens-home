import { Contestant } from '../types/contestants';

export function getContestant(contestants: Contestant[], emailID: string) {
  const filter = contestants.filter((contestant) => contestant.emailID === emailID);
  return filter.length > 0 ? filter[0] : null;
}
