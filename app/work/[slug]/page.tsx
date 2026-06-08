import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects } from '@/lib/projects';
import CaseStudyPage from '@/components/pages/CaseStudyPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found — BinaryScouts' };

  return {
    title: `${project.title} — BinaryScouts`,
    description: project.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return <CaseStudyPage slug={slug} />;
}
