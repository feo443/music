import { Metadata } from "next";
import ProjectClient from "./project-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Project ${resolvedParams.id} - Details`,
  };
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  return <ProjectClient id={params.id} />;
}