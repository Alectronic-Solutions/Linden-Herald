import type { Metadata } from "next";
import PolicyPage from "@/components/PolicyPage";
import { policies } from "@/data/policies";

const policy = policies.privacy;

export const metadata: Metadata = {
  title: policy.title,
  description: policy.blurb,
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <PolicyPage policy={policy} />;
}
