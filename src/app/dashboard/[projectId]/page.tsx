import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ProjectView } from "@/components/dashboard/project-view";
import { getProject, normalizeCoverage, projects } from "@/content/dashboard-data";

type ProjectParams = { projectId: string };
type ProjectSearch = { coverage?: string | string[] };

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<ProjectParams> }): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProject(projectId);
  return { title: project ? project.name : "Project dashboard" };
}

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

async function ProjectRoute({
  params,
  searchParams,
}: {
  params: Promise<ProjectParams>;
  searchParams: Promise<ProjectSearch>;
}) {
  const { projectId } = await params;
  const query = await searchParams;
  const project = getProject(projectId);
  if (!project) {
    return (
      <div className="grid gap-4">
        <h1>That job is not in this demo.</h1>
        <p>These are sample jobs only.</p>
        <Link href="/dashboard" className="tap dash-text-link inline-flex w-fit items-center font-semibold">
          All jobs
        </Link>
      </div>
    );
  }
  return <ProjectView project={project} initialCoverage={normalizeCoverage(firstParam(query.coverage))} />;
}

export default function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<ProjectParams>;
  searchParams: Promise<ProjectSearch>;
}) {
  return (
    <Suspense fallback={<p>Loading this job.</p>}>
      <ProjectRoute params={params} searchParams={searchParams} />
    </Suspense>
  );
}
