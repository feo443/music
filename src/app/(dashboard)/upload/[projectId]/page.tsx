import { Metadata } from "next";
import UploadClient from "./upload-client";

interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `Upload - Project ${resolvedParams.projectId}`,
  };
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  return <UploadClient projectId={resolvedParams.projectId} />;
} 