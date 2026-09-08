import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PolicyPage from "@/components/PolicyPage";
import { policies } from "@/data/policies";

const policy = policies.terms;

export const metadata: Metadata = pageMetadata({
  title: policy.title,
  description: policy.blurb,
  path: "/terms",
});

export default function Page() {
  return <PolicyPage policy={policy} />;
}
