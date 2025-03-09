import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/adminUtils";

export function StatusBadge({ status }) {
  return <Badge className={getStatusColor(status)}>{status}</Badge>;
}
