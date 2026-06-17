import type { Mentor } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AvailabilityGridProps {
  availability: Mentor["availability"];
}

export function AvailabilityGrid({ availability }: AvailabilityGridProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Weekly availability</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {availability.map((slot) => (
          <div
            key={`${slot.day}-${slot.startTime}`}
            className="flex items-center justify-between rounded-lg border px-4 py-3"
          >
            <span className="font-medium">{slot.day}</span>
            <Badge variant="outline">
              {slot.startTime} – {slot.endTime}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
