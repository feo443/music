import ProjectClient from "./project-client";
import { Metadata } from 'next';

type Props = {
  params: {
    id: string;
  };
};

export const metadata: Metadata = {
  title: 'Project Details'
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  
  return <ProjectClient id={resolvedParams.id} />;
}