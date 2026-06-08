import { redirect } from 'next/navigation';

// /games is now /work — redirect permanently
export default function Page() {
  redirect('/work');
}
