import { DashboardFrame } from "../../../components/dashboard-frame";
import { requireRole } from "../../../lib/auth/role-guard";

export default async function AdminDashboardPage() {
  await requireRole("ADMIN");
  return <DashboardFrame role="ADMIN" />;
}
