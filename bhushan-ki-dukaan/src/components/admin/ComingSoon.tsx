import { Card, PageTitle } from "./ui";

/** Placeholder for admin sections that are planned but not built yet. */
export default function ComingSoon({ title, subtitle, items }: { title: string; subtitle: string; items: string[] }) {
  return (
    <>
      <PageTitle title={title} subtitle={subtitle} />
      <Card title="Coming next">
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink/80">
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </Card>
    </>
  );
}
