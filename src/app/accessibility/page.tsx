import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import PolicyPage from "@/components/PolicyPage";
import { policies } from "@/data/policies";

const policy = policies.accessibility;

export const metadata: Metadata = pageMetadata({
  title: policy.title,
  description: policy.blurb,
  path: "/accessibility",
});

export default function Page() {
  return <PolicyPage policy={policy} />;
}
