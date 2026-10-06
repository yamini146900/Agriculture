import { DashboardFrame } from "../../../components/dashboard-frame";
import { requireRole } from "../../../lib/auth/role-guard";

export default async function OwnerDashboardPage() {
  await requireRole("OWNER");
  return <DashboardFrame role="OWNER" />;
}
