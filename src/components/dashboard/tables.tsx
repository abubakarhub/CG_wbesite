"use client";

import { useState } from "react";
import {
  emptyListHelp,
  fileHelp,
  fileLabel,
  fileRank,
  fileTone,
  questionHelp,
  questionLabel,
  questionTone,
  tradeHelp,
  tradeLabel,
  tradeRank,
  tradeTone,
  type CoverageFilter,
  type FileFilter,
  type FileRow,
  type OpenQuestion,
  type QuestionFilter,
  type TradeCoverage,
} from "@/content/dashboard-data";
import { cn } from "@/lib/utils";
import { FilterGroup, StatusPill } from "./ui";

type Dir = "asc" | "desc";

function useSort<K extends string>(initial: K) {
  const [key, setKey] = useState<K>(initial);
  const [dir, setDir] = useState<Dir>("asc");
  function toggle(next: K) {
    if (next === key) setDir((current) => (current === "asc" ? "desc" : "asc"));
    else {
      setKey(next);
      setDir("asc");
    }
  }
  return { key, dir, toggle };
}

function directionWords(active: boolean, dir: Dir, status: boolean) {
  if (!active) return "not sorted";
  if (status) return dir === "asc" ? "sorted missing first" : "sorted on hand first";
  return dir === "asc" ? "sorted A to Z" : "sorted Z to A";
}

function directionLabel(active: boolean, dir: Dir, status: boolean) {
  if (!active) return "";
  if (status) return dir === "asc" ? "Missing first" : "On hand first";
  return dir === "asc" ? "A to Z" : "Z to A";
}

function SortButtons<K extends string>({
  columns,
  sortKey,
  dir,
  onSort,
}: {
  columns: { key: K; label: string; status?: boolean }[];
  sortKey: K;
  dir: Dir;
  onSort: (key: K) => void;
}) {
  return (
    <div className="mb-3 flex flex-wrap gap-2 md:hidden" role="group" aria-label="Sort">
      {columns.map((column) => {
        const active = sortKey === column.key;
        return (
          <button
            key={column.key}
            type="button"
            onClick={() => onSort(column.key)}
            className={cn(
              "tap inline-flex items-center gap-2 rounded-full border px-3.5 font-semibold",
              active ? "border-ink bg-ink text-bone" : "border-control bg-bone",
            )}
          >
            {column.label}
            <span className="sr-only">{`, ${directionWords(active, dir, Boolean(column.status))}`}</span>
            {active ? <span aria-hidden>{directionLabel(active, dir, Boolean(column.status))}</span> : null}
          </button>
        );
      })}
    </div>
  );
}

function SortHeader<K extends string>({
  label,
  column,
  sortKey,
  dir,
  status,
  onSort,
}: {
  label: string;
  column: K;
  sortKey: K;
  dir: Dir;
  status?: boolean;
  onSort: (key: K) => void;
}) {
  const active = sortKey === column;
  return (
    <th scope="col" aria-sort={active ? (dir === "asc" ? "ascending" : "descending") : "none"} className="p-2 text-left">
      <button type="button" onClick={() => onSort(column)} className="tap inline-flex items-center gap-2 font-semibold">
        {label}
        <span className="sr-only">{`, ${directionWords(active, dir, Boolean(status))}`}</span>
        {active ? <span aria-hidden>{directionLabel(active, dir, Boolean(status))}</span> : null}
      </button>
    </th>
  );
}

function ShowMore({ count, open, onToggle }: { count: number; open: boolean; onToggle: () => void }) {
  if (count <= 5) return null;
  return (
    <button type="button" className="tap mt-3 rounded-full border border-ink px-4 font-semibold" aria-expanded={open} onClick={onToggle}>
      {open ? "Show fewer" : `Show all (${count})`}
    </button>
  );
}

export function TradeTable({
  rows,
  filter,
  onFilter,
}: {
  rows: TradeCoverage[];
  filter: CoverageFilter;
  onFilter: (filter: CoverageFilter) => void;
}) {
  const sort = useSort<"trade" | "status">("trade");
  const [open, setOpen] = useState(false);
  const filtered = rows.filter((row) => filter === "all" || row.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    const delta =
      sort.key === "trade" ? a.trade.localeCompare(b.trade) : tradeRank(a.status) - tradeRank(b.status);
    return sort.dir === "asc" ? delta : -delta;
  });
  const visible = open ? sorted : sorted.slice(0, 5);

  return (
    <div className="grid gap-3">
      <p>{tradeHelp}</p>
      <FilterGroup
        label="Filter trades"
        value={filter}
        onChange={onFilter}
        options={[
          { value: "all", label: "All" },
          { value: "covered", label: "Covered" },
          { value: "partial", label: "Partial" },
          { value: "none", label: "No quote" },
        ]}
      />
      {sorted.length === 0 ? (
        <p>{emptyListHelp}</p>
      ) : (
        <>
          <SortButtons
            columns={[
              { key: "trade", label: "Trade" },
              { key: "status", label: "Status", status: true },
            ]}
            sortKey={sort.key}
            dir={sort.dir}
            onSort={sort.toggle}
          />
          <ul className="grid gap-3 md:hidden">
            {visible.map((row) => (
              <li key={row.id} className="rounded-2xl border border-border bg-bone p-4">
                <p>
                  <span className="font-semibold">Trade: </span>
                  {row.trade}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <StatusPill tone={tradeTone(row.status)} label={tradeLabel(row.status)} />
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Note: </span>
                  {row.note}
                </p>
              </li>
            ))}
          </ul>
          <table className="hidden w-full border-collapse md:table">
            <caption className="sr-only">Trade coverage</caption>
            <thead>
              <tr className="border-b border-ink/30">
                <SortHeader label="Trade" column="trade" sortKey={sort.key} dir={sort.dir} onSort={sort.toggle} />
                <SortHeader label="Status" column="status" status sortKey={sort.key} dir={sort.dir} onSort={sort.toggle} />
                <th scope="col" className="p-2 text-left font-semibold">
                  Short note
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-b border-border">
                  <td className="p-3 font-semibold">{row.trade}</td>
                  <td className="p-3">
                    <StatusPill tone={tradeTone(row.status)} label={tradeLabel(row.status)} />
                  </td>
                  <td className="p-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ShowMore count={sorted.length} open={open} onToggle={() => setOpen((current) => !current)} />
        </>
      )}
    </div>
  );
}

export function FileTable({ rows }: { rows: FileRow[] }) {
  const [filter, setFilter] = useState<FileFilter>("all");
  const sort = useSort<"name" | "kind" | "status">("name");
  const [open, setOpen] = useState(false);
  const filtered = rows.filter((row) => filter === "all" || row.status === filter);
  const sorted = [...filtered].sort((a, b) => {
    const delta =
      sort.key === "name"
        ? a.name.localeCompare(b.name)
        : sort.key === "kind"
          ? a.kind.localeCompare(b.kind)
          : fileRank(a.status) - fileRank(b.status);
    return sort.dir === "asc" ? delta : -delta;
  });
  const visible = open ? sorted : sorted.slice(0, 5);
  const options: { value: FileFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "ready", label: "Ready" },
    { value: "needs-update", label: "Needs update" },
    { value: "missing", label: "Missing" },
  ];

  return (
    <div className="grid gap-3">
      <p>{fileHelp}</p>
      <FilterGroup label="Filter files" value={filter} onChange={setFilter} options={options} />
      {sorted.length === 0 ? (
        <p>{emptyListHelp}</p>
      ) : (
        <>
          <SortButtons
            columns={[
              { key: "name", label: "Name" },
              { key: "kind", label: "What it is" },
              { key: "status", label: "Status", status: true },
            ]}
            sortKey={sort.key}
            dir={sort.dir}
            onSort={sort.toggle}
          />
          <ul className="grid gap-3 md:hidden">
            {visible.map((row) => (
              <li key={row.id} className="rounded-2xl border border-border bg-bone p-4">
                <p>
                  <span className="font-semibold">Name: </span>
                  {row.name}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">What it is: </span>
                  {row.kind}
                </p>
                <p className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="font-semibold">Status:</span>
                  <StatusPill tone={fileTone(row.status)} label={fileLabel(row.status)} />
                </p>
                <p className="mt-2">
                  <span className="font-semibold">What is needed: </span>
                  {row.note}
                </p>
              </li>
            ))}
          </ul>
          <table className="hidden w-full border-collapse md:table">
            <caption className="sr-only">Files and drawings</caption>
            <thead>
              <tr className="border-b border-ink/30">
                <SortHeader label="Name" column="name" sortKey={sort.key} dir={sort.dir} onSort={sort.toggle} />
                <SortHeader label="What it is" column="kind" sortKey={sort.key} dir={sort.dir} onSort={sort.toggle} />
                <SortHeader label="Status" column="status" status sortKey={sort.key} dir={sort.dir} onSort={sort.toggle} />
                <th scope="col" className="p-2 text-left font-semibold">
                  What is needed
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className="border-b border-border">
                  <td className="p-3 font-semibold">{row.name}</td>
                  <td className="p-3">{row.kind}</td>
                  <td className="p-3">
                    <StatusPill tone={fileTone(row.status)} label={fileLabel(row.status)} />
                  </td>
                  <td className="p-3">{row.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ShowMore count={sorted.length} open={open} onToggle={() => setOpen((current) => !current)} />
        </>
      )}
    </div>
  );
}

export function QuestionList({ rows }: { rows: OpenQuestion[] }) {
  const [filter, setFilter] = useState<QuestionFilter>("all");
  const options: { value: QuestionFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "open", label: "Open" },
    { value: "draft", label: "Draft" },
    { value: "answered", label: "Answered" },
  ];
  const shown = rows.filter((row) => filter === "all" || row.status === filter);

  return (
    <div className="grid gap-3">
      <p>{questionHelp}</p>
      <FilterGroup label="Filter questions" value={filter} onChange={setFilter} options={options} />
      {shown.length === 0 ? (
        <p>{emptyListHelp}</p>
      ) : (
        <ul className="grid gap-3">
          {shown.map((row) => (
            <li key={row.id} className="rounded-2xl border border-border bg-bone p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3>{row.question}</h3>
                  <p className="mt-1">Who owns this: {row.owner}</p>
                </div>
                <StatusPill tone={questionTone(row.status)} label={questionLabel(row.status)} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
