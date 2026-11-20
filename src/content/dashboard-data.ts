/**
 * Demo only. Swap this module for an API client later. Do not put live client prices here.
 * Fictional sample jobs only. Do not replace these records with a live client job.
 */

export type Tone = "red" | "yellow" | "green";
export type ProjectType = "Commercial" | "Multifamily" | "Residential";
export type TradeStatus = "covered" | "partial" | "none";
export type FileStatus = "ready" | "needs-update" | "missing";
export type QuestionStatus = "open" | "draft" | "answered";
export type CoverageFilter = "all" | TradeStatus;
export type FileFilter = "all" | FileStatus;
export type QuestionFilter = "all" | QuestionStatus;

export type ScheduleStatus = "on-schedule" | "at-risk" | "behind";
export type MilestoneState = "done" | "now" | "next" | "later";

export type Project = {
  id: string;
  name: string;
  location: string;
  type: ProjectType;
  phase: string;
  tone: Tone;
  schedule: ScheduleStatus;
  topFocus: string;
  nextStep: string;
  nextStepOwner: string;
  targetDateLabel: string;
  ownerName: string;
  summary: string;
};

export type Phase = {
  id: string;
  projectId: string;
  title: string;
  done: boolean;
  doneThisWeek?: boolean;
};

export type Milestone = {
  id: string;
  projectId: string;
  label: string;
  whenLabel: string;
  state: MilestoneState;
};

export type Blocker = {
  id: string;
  projectId: string;
  title: string;
  owner: string;
  impact: string;
  statusTone: Tone;
};

export type Decision = {
  id: string;
  projectId: string;
  title: string;
  dueLabel: string;
  owner: string;
  statusTone: Tone;
};

export type Vendor = {
  id: string;
  projectId: string;
  name: string;
  work: string;
  statusLabel: string;
  statusTone: Tone;
};

export type TradeCoverage = {
  id: string;
  projectId: string;
  trade: string;
  status: TradeStatus;
  note: string;
};

export type FileRow = {
  id: string;
  projectId: string;
  name: string;
  kind: string;
  status: FileStatus;
  note: string;
};

export type OpenQuestion = {
  id: string;
  projectId: string;
  question: string;
  status: QuestionStatus;
  owner: string;
};

export type Deadline = {
  id: string;
  projectId: string;
  label: string;
  whenLabel: string;
  statusTone: Tone;
  openItems: string;
};

export type ChecklistItem = {
  id: string;
  projectId: string;
  title: string;
  done: boolean;
};

export type FactKind = "blocker" | "decision" | "trade" | "file" | "question" | "custom";
export type JobStatus = "on-track" | "watch" | "stuck";

export type CustomItem = {
  id: string;
  title: string;
  onHand: boolean;
  addedAt: string;
};

export type Fact = {
  id: string;
  projectId: string;
  projectName: string;
  title: string;
  detail: string;
  owner: string;
  tone: Tone;
  kind: FactKind;
};

export type ToneOverrides = {
  blockerTones: Record<string, Tone>;
  decisionTones: Record<string, Tone>;
};

export type PhaseDone = (id: string, fallback: boolean) => boolean;

export const demoDataLabel = "DEMO DATA";
export const exampleDataLabel = "EXAMPLE DATA";
export const demoTodayLabel = "Sample day: Tuesday, March 12";
export const colorHelp =
  "Red means missing or late. Yellow means it needs a look. Green means it's on hand or done.";
export const emptyListHelp = "Nothing in this list. Try All, or pick another status.";
export const tradeHelp =
  "Covered means a trade is lined up. Partial means only some of the work is set. No quote means nobody is lined up yet. This demo does not show prices.";
export const fileHelp =
  "Ready means the file is on hand. Needs update means it is out of date. Missing means we do not have it.";
export const questionHelp =
  "Open means nobody has answered yet. Draft means an answer was started. Answered means it is done.";

export const projects: Project[] = [
  {
    id: "harbor-medical",
    name: "Harbor Medical build-out",
    location: "Bayview (sample)",
    type: "Commercial",
    phase: "Planning",
    tone: "yellow",
    schedule: "at-risk",
    topFocus: "Landlord scope still unconfirmed",
    nextStep: "Call the landlord and ask for the signed scope letter",
    nextStepOwner: "Riley Chen",
    targetDateLabel: "To be confirmed",
    ownerName: "Riley Chen",
    summary: "Planning is moving, but the landlord has not confirmed the scope of work.",
  },
  {
    id: "cedar-court",
    name: "Cedar Court apartments",
    location: "Oak Landing (sample)",
    type: "Multifamily",
    phase: "Build-out",
    tone: "red",
    schedule: "behind",
    topFocus: "Inspections waiting on electrical close-out",
    nextStep: "Get the electrical close-out form signed",
    nextStepOwner: "Morgan Ellis",
    targetDateLabel: "To be confirmed",
    ownerName: "Jordan Hale",
    summary: "Work is underway, and inspections are stuck until the electrical close-out is finished.",
  },
  {
    id: "example-residence",
    name: "Example Residence",
    location: "Maple Hill (sample)",
    type: "Residential",
    phase: "Interiors",
    tone: "green",
    schedule: "on-schedule",
    topFocus: "Client still needs to pick bathroom tile",
    nextStep: "Help the client pick bathroom tile",
    nextStepOwner: "Sam Patel",
    targetDateLabel: "To be confirmed",
    ownerName: "Sam Patel",
    summary:
      "Interiors are in progress. Most rough work is on hand, and the client still needs to pick bathroom tile.",
  },
];

export const blockers: Blocker[] = [
  {
    id: "h-b1",
    projectId: "harbor-medical",
    title: "Landlord scope still unconfirmed",
    owner: "Riley Chen",
    impact: "The plan cannot be locked",
    statusTone: "yellow",
  },
  {
    id: "h-b2",
    projectId: "harbor-medical",
    title: "Site access rules are not written down",
    owner: "Jordan Hale",
    impact: "A site visit is not scheduled",
    statusTone: "yellow",
  },
  {
    id: "c-b1",
    projectId: "cedar-court",
    title: "Electrical close-out is not signed",
    owner: "Morgan Ellis",
    impact: "Inspections cannot be booked",
    statusTone: "red",
  },
  {
    id: "c-b2",
    projectId: "cedar-court",
    title: "Fire-stop photos are missing",
    owner: "Jordan Hale",
    impact: "The inspector asked to see them",
    statusTone: "red",
  },
  {
    id: "c-b3",
    projectId: "cedar-court",
    title: "Unit 2 access is limited",
    owner: "Alex Rivera",
    impact: "A punch item cannot be finished",
    statusTone: "yellow",
  },
  {
    id: "c-b4",
    projectId: "cedar-court",
    title: "Hallway lights are not chosen",
    owner: "Avery Brooks",
    impact: "The finish schedule has a blank line",
    statusTone: "yellow",
  },
  {
    id: "c-b5",
    projectId: "cedar-court",
    title: "Common-area punch list is still open",
    owner: "Jordan Hale",
    impact: "Close-out is waiting on this list",
    statusTone: "red",
  },
  {
    id: "c-b6",
    projectId: "cedar-court",
    title: "Stair paint color is not confirmed",
    owner: "Casey Nguyen",
    impact: "Painters do not have a start note",
    statusTone: "yellow",
  },
  {
    id: "e-b1",
    projectId: "example-residence",
    title: "Bathroom tile is not chosen",
    owner: "Sam Patel",
    impact: "Finish work waits on this choice",
    statusTone: "yellow",
  },
];

export const decisions: Decision[] = [
  {
    id: "h-d1",
    projectId: "harbor-medical",
    title: "Confirm how many exam rooms",
    dueLabel: "To be confirmed",
    owner: "Riley Chen",
    statusTone: "yellow",
  },
  {
    id: "h-d2",
    projectId: "harbor-medical",
    title: "Pick the waiting-room floor",
    dueLabel: "No date set",
    owner: "Avery Brooks",
    statusTone: "yellow",
  },
  {
    id: "c-d1",
    projectId: "cedar-court",
    title: "Approve hallway light fixtures",
    dueLabel: "To be confirmed",
    owner: "Avery Brooks",
    statusTone: "yellow",
  },
  {
    id: "c-d2",
    projectId: "cedar-court",
    title: "Sign the inspection request",
    dueLabel: "Exact time not set",
    owner: "Jordan Hale",
    statusTone: "red",
  },
  {
    id: "c-d3",
    projectId: "cedar-court",
    title: "Confirm stair paint color",
    dueLabel: "No date set",
    owner: "Casey Nguyen",
    statusTone: "yellow",
  },
  {
    id: "e-d1",
    projectId: "example-residence",
    title: "Pick the bathroom tile",
    dueLabel: "To be confirmed",
    owner: "Sam Patel",
    statusTone: "yellow",
  },
  {
    id: "e-d2",
    projectId: "example-residence",
    title: "Confirm cabinet hardware",
    dueLabel: "No date set",
    owner: "Sam Patel",
    statusTone: "yellow",
  },
];

export const vendors: Vendor[] = [
  {
    id: "h-v1",
    projectId: "harbor-medical",
    name: "Northline Demo Co.",
    work: "Demo",
    statusLabel: "Ready to schedule",
    statusTone: "green",
  },
  {
    id: "h-v2",
    projectId: "harbor-medical",
    name: "Sample Electric",
    work: "Electrical",
    statusLabel: "No quote yet",
    statusTone: "red",
  },
  {
    id: "h-v3",
    projectId: "harbor-medical",
    name: "Bay Air Sample",
    work: "HVAC",
    statusLabel: "Needs a second look",
    statusTone: "yellow",
  },
  {
    id: "c-v1",
    projectId: "cedar-court",
    name: "Sample Electric Co.",
    work: "Electrical",
    statusLabel: "Close-out is still open",
    statusTone: "red",
  },
  {
    id: "c-v2",
    projectId: "cedar-court",
    name: "Oak Floor Sample",
    work: "Flooring",
    statusLabel: "No quote yet",
    statusTone: "red",
  },
  {
    id: "c-v3",
    projectId: "cedar-court",
    name: "Harbor Paint Sample",
    work: "Painting",
    statusLabel: "Waiting on a start date",
    statusTone: "yellow",
  },
  {
    id: "c-v4",
    projectId: "cedar-court",
    name: "Plain Pipe Sample",
    work: "Plumbing",
    statusLabel: "Work is accepted",
    statusTone: "green",
  },
  {
    id: "e-v1",
    projectId: "example-residence",
    name: "Sample Roofing",
    work: "Roofing",
    statusLabel: "About half done",
    statusTone: "yellow",
  },
  {
    id: "e-v2",
    projectId: "example-residence",
    name: "Sample Windows",
    work: "Windows",
    statusLabel: "On hand",
    statusTone: "green",
  },
  {
    id: "e-v3",
    projectId: "example-residence",
    name: "Sample Tile Studio",
    work: "Tile",
    statusLabel: "Waiting on a client pick",
    statusTone: "yellow",
  },
  {
    id: "e-v4",
    projectId: "example-residence",
    name: "Sample Cabinets",
    work: "Cabinets",
    statusLabel: "Being built",
    statusTone: "yellow",
  },
];

export const trades: TradeCoverage[] = [
  { id: "h-t1", projectId: "harbor-medical", trade: "Demo", status: "covered", note: "Crew is lined up" },
  { id: "h-t2", projectId: "harbor-medical", trade: "Framing", status: "partial", note: "Layout only. No start date" },
  { id: "h-t3", projectId: "harbor-medical", trade: "Electrical", status: "none", note: "No quote yet" },
  { id: "h-t4", projectId: "harbor-medical", trade: "HVAC", status: "partial", note: "Walkthrough is done" },
  { id: "h-t5", projectId: "harbor-medical", trade: "Plumbing", status: "none", note: "No quote yet" },
  { id: "h-t6", projectId: "harbor-medical", trade: "Flooring", status: "covered", note: "On the team" },
  { id: "c-t1", projectId: "cedar-court", trade: "Electrical", status: "partial", note: "Rough-in is done. Close-out is open" },
  { id: "c-t2", projectId: "cedar-court", trade: "Plumbing", status: "covered", note: "Tests passed in the sample notes" },
  { id: "c-t3", projectId: "cedar-court", trade: "Drywall", status: "covered", note: "Hung in the common areas" },
  { id: "c-t4", projectId: "cedar-court", trade: "Fire alarm", status: "none", note: "No quote yet" },
  { id: "c-t5", projectId: "cedar-court", trade: "Painting", status: "partial", note: "Unit colors are picked. Start is not set" },
  { id: "c-t6", projectId: "cedar-court", trade: "Flooring", status: "none", note: "No quote yet" },
  { id: "c-t7", projectId: "cedar-court", trade: "Doors", status: "covered", note: "Doors are on hand" },
  { id: "e-t1", projectId: "example-residence", trade: "Framing", status: "covered", note: "Complete in the sample notes" },
  { id: "e-t2", projectId: "example-residence", trade: "Roofing", status: "partial", note: "About half done" },
  { id: "e-t3", projectId: "example-residence", trade: "Electrical", status: "partial", note: "Waiting on an inspection date" },
  { id: "e-t4", projectId: "example-residence", trade: "Plumbing", status: "covered", note: "Rough-in is on hand" },
  { id: "e-t5", projectId: "example-residence", trade: "Tile", status: "none", note: "Client still needs to pick bathroom tile" },
  { id: "e-t6", projectId: "example-residence", trade: "Cabinets", status: "partial", note: "Being built" },
];

export const files: FileRow[] = [
  {
    id: "h-f1",
    projectId: "harbor-medical",
    name: "Landlord plan set",
    kind: "Drawing",
    status: "needs-update",
    note: "Waiting on the latest landlord marks",
  },
  {
    id: "h-f2",
    projectId: "harbor-medical",
    name: "Scope checklist",
    kind: "Checklist",
    status: "missing",
    note: "Not received yet",
  },
  {
    id: "h-f3",
    projectId: "harbor-medical",
    name: "Site photos",
    kind: "Photos",
    status: "ready",
    note: "Sample set is on hand",
  },
  {
    id: "h-f4",
    projectId: "harbor-medical",
    name: "Existing suite plan",
    kind: "Drawing",
    status: "ready",
    note: "On hand",
  },
  {
    id: "c-f1",
    projectId: "cedar-court",
    name: "Electrical close-out form",
    kind: "Form",
    status: "missing",
    note: "Needs a signature",
  },
  {
    id: "c-f2",
    projectId: "cedar-court",
    name: "Fire-stop photos",
    kind: "Photos",
    status: "missing",
    note: "Not in the folder",
  },
  {
    id: "c-f3",
    projectId: "cedar-court",
    name: "Floor plan",
    kind: "Drawing",
    status: "ready",
    note: "Current set is on hand",
  },
  {
    id: "c-f4",
    projectId: "cedar-court",
    name: "Unit finish schedule",
    kind: "Schedule",
    status: "needs-update",
    note: "The light-fixture line is blank",
  },
  {
    id: "c-f5",
    projectId: "cedar-court",
    name: "Inspection log",
    kind: "Log",
    status: "ready",
    note: "The plumbing pass is noted",
  },
  {
    id: "c-f6",
    projectId: "cedar-court",
    name: "Door schedule",
    kind: "Schedule",
    status: "ready",
    note: "Matches the doors on hand",
  },
  {
    id: "e-f1",
    projectId: "example-residence",
    name: "Permit set",
    kind: "Permit",
    status: "ready",
    note: "Approved in the sample notes",
  },
  {
    id: "e-f2",
    projectId: "example-residence",
    name: "Foundation report",
    kind: "Report",
    status: "ready",
    note: "Poured and inspected",
  },
  {
    id: "e-f3",
    projectId: "example-residence",
    name: "Window order",
    kind: "Order",
    status: "ready",
    note: "On hand",
  },
  {
    id: "e-f4",
    projectId: "example-residence",
    name: "Framing lumber note",
    kind: "Note",
    status: "ready",
    note: "On hand",
  },
  {
    id: "e-f5",
    projectId: "example-residence",
    name: "Roof shingle note",
    kind: "Note",
    status: "ready",
    note: "On hand",
  },
  {
    id: "e-f6",
    projectId: "example-residence",
    name: "Kitchen cabinet drawing",
    kind: "Drawing",
    status: "needs-update",
    note: "Still being built",
  },
  {
    id: "e-f7",
    projectId: "example-residence",
    name: "Bathroom tile choice",
    kind: "Selection",
    status: "missing",
    note: "Client choice is needed",
  },
];

export const questions: OpenQuestion[] = [
  {
    id: "h-q1",
    projectId: "harbor-medical",
    question: "Can the crew work after 6 p.m.?",
    status: "open",
    owner: "Riley Chen",
  },
  {
    id: "h-q2",
    projectId: "harbor-medical",
    question: "Where do the dumpsters go?",
    status: "draft",
    owner: "Jordan Hale",
  },
  {
    id: "h-q3",
    projectId: "harbor-medical",
    question: "Is the suite on the second floor?",
    status: "answered",
    owner: "Alex Rivera",
  },
  {
    id: "c-q1",
    projectId: "cedar-court",
    question: "Which day can the inspector walk the building?",
    status: "open",
    owner: "Morgan Ellis",
  },
  {
    id: "c-q2",
    projectId: "cedar-court",
    question: "Are the unit 2 keys at the office?",
    status: "open",
    owner: "Alex Rivera",
  },
  {
    id: "c-q3",
    projectId: "cedar-court",
    question: "Did the plumbing test pass?",
    status: "answered",
    owner: "Jordan Hale",
  },
  {
    id: "e-q1",
    projectId: "example-residence",
    question: "Which bathroom tile do you want?",
    status: "open",
    owner: "Sam Patel",
  },
  {
    id: "e-q2",
    projectId: "example-residence",
    question: "When is the electrical inspection?",
    status: "draft",
    owner: "Jordan Hale",
  },
  {
    id: "e-q3",
    projectId: "example-residence",
    question: "Are the windows the size on the plan?",
    status: "answered",
    owner: "Alex Rivera",
  },
];

export const deadlines: Deadline[] = [
  {
    id: "h-dl1",
    projectId: "harbor-medical",
    label: "Internal planning check",
    whenLabel: "This sample week",
    statusTone: "yellow",
    openItems: "Exact time not set",
  },
  {
    id: "h-dl2",
    projectId: "harbor-medical",
    label: "Landlord scope reply",
    whenLabel: "To be confirmed",
    statusTone: "red",
    openItems: "Still waiting on the letter",
  },
  {
    id: "c-dl1",
    projectId: "cedar-court",
    label: "Electrical close-out",
    whenLabel: "To be confirmed",
    statusTone: "red",
    openItems: "Signature is still missing",
  },
  {
    id: "c-dl2",
    projectId: "cedar-court",
    label: "Internal photo check",
    whenLabel: "This sample week",
    statusTone: "yellow",
    openItems: "Exact time not set",
  },
  {
    id: "e-dl1",
    projectId: "example-residence",
    label: "Tile choice",
    whenLabel: "To be confirmed",
    statusTone: "yellow",
    openItems: "The client has not picked",
  },
  {
    id: "e-dl2",
    projectId: "example-residence",
    label: "Electrical inspection",
    whenLabel: "Exact time not set",
    statusTone: "yellow",
    openItems: "The date is not booked",
  },
];

export const checklist: ChecklistItem[] = [
  {
    id: "check-review",
    projectId: "cedar-court",
    title: "Review what is missing or late on Cedar Court apartments",
    done: false,
  },
  {
    id: "check-call",
    projectId: "cedar-court",
    title: "Call the trades that still owe a quote or a close-out",
    done: false,
  },
  {
    id: "check-dates",
    projectId: "harbor-medical",
    title: "Confirm any date that still says To be confirmed",
    done: false,
  },
  {
    id: "check-update",
    projectId: "harbor-medical",
    title: "Send one plain-English status update",
    done: false,
  },
  {
    id: "check-tile",
    projectId: "example-residence",
    title: "Ask the sample client to pick bathroom tile",
    done: false,
  },
];

export const phases: Phase[] = [
  { id: "h-p1", projectId: "harbor-medical", title: "Walk the site", done: true },
  { id: "h-p2", projectId: "harbor-medical", title: "Collect the existing plans", done: true, doneThisWeek: true },
  { id: "h-p3", projectId: "harbor-medical", title: "Confirm the landlord scope", done: false },
  { id: "h-p4", projectId: "harbor-medical", title: "Get every trade quote in", done: false },
  { id: "h-p5", projectId: "harbor-medical", title: "Lock the plan", done: false },
  { id: "h-p6", projectId: "harbor-medical", title: "Start the build-out", done: false },
  { id: "c-p1", projectId: "cedar-court", title: "Demo", done: true },
  { id: "c-p2", projectId: "cedar-court", title: "Rough-in (pipes and wires inside the walls)", done: true },
  { id: "c-p3", projectId: "cedar-court", title: "Hang drywall", done: true, doneThisWeek: true },
  { id: "c-p4", projectId: "cedar-court", title: "Electrical close-out", done: false },
  { id: "c-p5", projectId: "cedar-court", title: "Pass inspections", done: false },
  { id: "c-p6", projectId: "cedar-court", title: "Finish the punch list (last fixes)", done: false },
  { id: "e-p1", projectId: "example-residence", title: "Permits", done: true },
  { id: "e-p2", projectId: "example-residence", title: "Foundation", done: true },
  { id: "e-p3", projectId: "example-residence", title: "Framing", done: true },
  { id: "e-p4", projectId: "example-residence", title: "Windows in", done: true, doneThisWeek: true },
  { id: "e-p5", projectId: "example-residence", title: "Cabinets in", done: false },
  { id: "e-p6", projectId: "example-residence", title: "Tile and finishes", done: false },
];

export const milestones: Milestone[] = [
  { id: "h-m1", projectId: "harbor-medical", label: "Site walk", whenLabel: "Sample week 1", state: "done" },
  { id: "h-m2", projectId: "harbor-medical", label: "Landlord scope reply", whenLabel: "This sample week", state: "now" },
  { id: "h-m3", projectId: "harbor-medical", label: "Plan locked", whenLabel: "To be confirmed", state: "next" },
  { id: "h-m4", projectId: "harbor-medical", label: "Build-out starts", whenLabel: "To be confirmed", state: "later" },
  { id: "c-m1", projectId: "cedar-court", label: "Rough-in done", whenLabel: "Sample week 2", state: "done" },
  { id: "c-m2", projectId: "cedar-court", label: "Drywall hung", whenLabel: "Sample week 4", state: "done" },
  { id: "c-m3", projectId: "cedar-court", label: "Electrical close-out", whenLabel: "This sample week", state: "now" },
  { id: "c-m4", projectId: "cedar-court", label: "Inspections", whenLabel: "To be confirmed", state: "next" },
  { id: "c-m5", projectId: "cedar-court", label: "Punch list and hand-over", whenLabel: "To be confirmed", state: "later" },
  { id: "e-m1", projectId: "example-residence", label: "Framing done", whenLabel: "Sample week 3", state: "done" },
  { id: "e-m2", projectId: "example-residence", label: "Windows in", whenLabel: "This sample week", state: "done" },
  { id: "e-m3", projectId: "example-residence", label: "Tile picked", whenLabel: "This sample week", state: "now" },
  { id: "e-m4", projectId: "example-residence", label: "Cabinets and tile installed", whenLabel: "To be confirmed", state: "next" },
  { id: "e-m5", projectId: "example-residence", label: "Walk-through with the client", whenLabel: "To be confirmed", state: "later" },
];

export function scheduleLabel(status: ScheduleStatus): string {
  if (status === "on-schedule") return "On track";
  if (status === "at-risk") return "Watch";
  return "Stuck";
}

export function scheduleTone(status: ScheduleStatus): Tone {
  if (status === "on-schedule") return "green";
  if (status === "at-risk") return "yellow";
  return "red";
}

export function milestoneLabel(state: MilestoneState): string {
  if (state === "done") return "Done";
  if (state === "now") return "Happening now";
  if (state === "next") return "Up next";
  return "Later";
}

export function phaseProgress(projectId: string, isDone: PhaseDone) {
  const rows = forProject(phases, projectId);
  const done = rows.filter((row) => isDone(row.id, row.done)).length;
  return { done, total: rows.length, percent: rows.length === 0 ? 0 : Math.round((done / rows.length) * 100) };
}

export function doneThisWeekCount(isDone: PhaseDone): number {
  return phases.filter((row) => (row.done ? row.doneThisWeek === true && isDone(row.id, true) : isDone(row.id, false)))
    .length;
}

export function onSchedulePercent(list: Project[] = projects): number {
  if (list.length === 0) return 0;
  return Math.round((list.filter((project) => project.schedule === "on-schedule").length / list.length) * 100);
}

export const jobStatusOptions: { status: JobStatus; label: string; help: string; emoji: string }[] = [
  { status: "on-track", label: "On track", help: "Work is moving", emoji: "🟢" },
  { status: "watch", label: "Watch", help: "Keep an eye on it", emoji: "🟡" },
  { status: "stuck", label: "Stuck", help: "Something is blocking work", emoji: "🔴" },
];

export function jobStatusFromSchedule(schedule: ScheduleStatus): JobStatus {
  if (schedule === "on-schedule") return "on-track";
  if (schedule === "at-risk") return "watch";
  return "stuck";
}

export function effectiveProject(project: Project, status: JobStatus | undefined): Project {
  if (!status) return project;
  const schedule: ScheduleStatus = status === "on-track" ? "on-schedule" : status === "watch" ? "at-risk" : "behind";
  return { ...project, schedule, tone: scheduleTone(schedule) };
}

export function customItemFacts(project: Project, items: CustomItem[]): Fact[] {
  return items.map((item) => ({
    id: item.id,
    projectId: project.id,
    projectName: project.name,
    title: item.title,
    detail: item.onHand ? "Added by you. Marked on hand." : "Added by you. Still missing.",
    owner: project.ownerName,
    tone: item.onHand ? "green" : "red",
    kind: "custom",
  }));
}

const coverageFilters = ["all", "covered", "partial", "none"] as const;

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function normalizeCoverage(value: string | undefined): CoverageFilter {
  return coverageFilters.includes(value as CoverageFilter) ? (value as CoverageFilter) : "all";
}

export function projectToneLabel(tone: Tone): string {
  if (tone === "red") return "Stuck";
  if (tone === "yellow") return "Watch";
  return "On track";
}

export function tradeLabel(status: TradeStatus): string {
  if (status === "covered") return "Covered";
  if (status === "partial") return "Partial";
  return "No quote";
}

export function fileLabel(status: FileStatus): string {
  if (status === "ready") return "Ready";
  if (status === "needs-update") return "Needs update";
  return "Missing";
}

export function questionLabel(status: QuestionStatus): string {
  if (status === "open") return "Open";
  if (status === "draft") return "Draft";
  return "Answered";
}

export function tradeTone(status: TradeStatus): Tone {
  if (status === "covered") return "green";
  if (status === "partial") return "yellow";
  return "red";
}

export function fileTone(status: FileStatus): Tone {
  if (status === "ready") return "green";
  if (status === "needs-update") return "yellow";
  return "red";
}

export function questionTone(status: QuestionStatus): Tone {
  if (status === "answered") return "green";
  if (status === "draft") return "yellow";
  return "red";
}

export function tradeRank(status: TradeStatus): number {
  if (status === "none") return 0;
  if (status === "partial") return 1;
  return 2;
}

export function fileRank(status: FileStatus): number {
  if (status === "missing") return 0;
  if (status === "needs-update") return 1;
  return 2;
}

function spell(count: number): string {
  return ["None", "One", "Two", "Three", "Four", "Five", "Six"][count] ?? String(count);
}

export function todayBottomLine(list: Project[] = projects): string {
  const late = list.filter((project) => project.tone === "red").length;
  const attention = list.filter((project) => project.tone !== "green").length;
  const jobWord = list.length === 1 ? "sample job" : "sample jobs";
  let line = `${spell(list.length)} ${jobWord}. `;
  if (attention === 0) line += "None need attention today.";
  else if (attention === 1) line += "One needs attention today.";
  else line += `${spell(attention)} need attention today.`;
  if (late === 1) line += " One is stuck.";
  else if (late > 1) line += ` ${spell(late)} are stuck.`;
  return line;
}

export function forProject<T extends { projectId: string }>(rows: T[], projectId: string): T[] {
  return rows.filter((row) => row.projectId === projectId);
}

export function coverageCounts(rows: TradeCoverage[]): Record<TradeStatus, number> {
  return {
    covered: rows.filter((row) => row.status === "covered").length,
    partial: rows.filter((row) => row.status === "partial").length,
    none: rows.filter((row) => row.status === "none").length,
  };
}

function toneOfBlocker(row: Blocker, overrides: ToneOverrides): Tone {
  return overrides.blockerTones[row.id] ?? row.statusTone;
}

function toneOfDecision(row: Decision, overrides: ToneOverrides): Tone {
  return overrides.decisionTones[row.id] ?? row.statusTone;
}

export function collectFacts(overrides: ToneOverrides, projectId?: string): Fact[] {
  const scoped = projectId ? projects.filter((project) => project.id === projectId) : projects;
  const facts: Fact[] = [];

  for (const project of scoped) {
    for (const row of forProject(blockers, project.id)) {
      facts.push({
        id: row.id,
        projectId: project.id,
        projectName: project.name,
        title: row.title,
        detail: row.impact,
        owner: row.owner,
        tone: toneOfBlocker(row, overrides),
        kind: "blocker",
      });
    }
    for (const row of forProject(decisions, project.id)) {
      facts.push({
        id: row.id,
        projectId: project.id,
        projectName: project.name,
        title: row.title,
        detail: row.dueLabel,
        owner: row.owner,
        tone: toneOfDecision(row, overrides),
        kind: "decision",
      });
    }
    for (const row of forProject(trades, project.id)) {
      const tone = tradeTone(row.status);
      facts.push({
        id: row.id,
        projectId: project.id,
        projectName: project.name,
        title:
          tone === "red"
            ? `${row.trade} has no quote yet`
            : tone === "yellow"
              ? `${row.trade} is only partly set`
              : `${row.trade} is covered`,
        detail: row.note,
        owner: project.ownerName,
        tone,
        kind: "trade",
      });
    }
    for (const row of forProject(files, project.id)) {
      const tone = fileTone(row.status);
      facts.push({
        id: row.id,
        projectId: project.id,
        projectName: project.name,
        title:
          tone === "red"
            ? `${row.name} is missing`
            : tone === "yellow"
              ? `${row.name} needs an update`
              : `${row.name} is on hand`,
        detail: row.note,
        owner: project.ownerName,
        tone,
        kind: "file",
      });
    }
    for (const row of forProject(questions, project.id)) {
      facts.push({
        id: row.id,
        projectId: project.id,
        projectName: project.name,
        title: row.question,
        detail: questionLabel(row.status),
        owner: row.owner,
        tone: questionTone(row.status),
        kind: "question",
      });
    }
  }

  return facts;
}

export function countTones(facts: Fact[]): { red: number; yellow: number; green: number; total: number; percent: number } {
  const red = facts.filter((fact) => fact.tone === "red").length;
  const yellow = facts.filter((fact) => fact.tone === "yellow").length;
  const green = facts.filter((fact) => fact.tone === "green").length;
  const total = facts.length;
  return {
    red,
    yellow,
    green,
    total,
    percent: total === 0 ? 0 : Math.round((green / total) * 100),
  };
}

export function needsAttention(facts: Fact[], limit = 5): Fact[] {
  const ranked = facts
    .filter((fact) => fact.tone !== "green")
    .sort((a, b) => {
      if (a.tone !== b.tone) return a.tone === "red" ? -1 : 1;
      return a.title.localeCompare(b.title);
    });
  const picked: Fact[] = [];
  const seen = new Set<string>();
  for (const fact of ranked) {
    if (seen.has(fact.projectId)) continue;
    picked.push(fact);
    seen.add(fact.projectId);
    if (picked.length === limit) return picked;
  }
  for (const fact of ranked) {
    if (picked.some((item) => item.id === fact.id)) continue;
    picked.push(fact);
    if (picked.length === limit) break;
  }
  return picked;
}

export function scriptedProjectAnswer(
  project: Project,
  openBlockers: { title: string; owner: string }[],
  question: string,
): string {
  const asked = question.trim().slice(0, 280);
  const blockerText = openBlockers.length
    ? openBlockers.map((row) => `${row.title} (${row.owner})`).join("; ")
    : "none. Every blocker on this sample job is marked on hand";
  return `On ${project.name}, the sample blockers still open are: ${blockerText}. You asked: “${asked}”. A live assistant would read the job files. This demo cannot.`;
}
