import type { Metadata } from 'next';
import WorkPage from '@/components/pages/WorkPage';

export const metadata: Metadata = {
  title: 'Our Work — BinaryScouts',
  description:
    'Case studies and project showcases from BinaryScouts. AI automation, SaaS development, enterprise dashboards, and growth engineering — all with real results.',
};

export default function Page() {
  return <WorkPage />;
}
