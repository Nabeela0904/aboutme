"use client";

import { useBookings } from "@/hooks/use-bookings";
import { formatPrice } from "@/lib/mentors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  pending: "secondary",
  confirmed: "default",
  completed: "outline",
  cancelled: "destructive",
};

export function BookingsTable() {
  const { bookings, updateStatus } = useBookings();

  return (
    <Card id="bookings">
      <CardHeader>
        <CardTitle>Recent bookings</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentee</TableHead>
              <TableHead>Mentor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.menteeName}</p>
                    <p className="text-xs text-muted-foreground">{booking.menteeEmail}</p>
                  </div>
                </TableCell>
                <TableCell>{booking.mentorName}</TableCell>
                <TableCell>
                  {new Date(booking.date + "T12:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                  <br />
                  <span className="text-xs text-muted-foreground">
                    {booking.startTime} – {booking.endTime}
                  </span>
                </TableCell>
                <TableCell className="max-w-[150px] truncate">{booking.topic}</TableCell>
                <TableCell>{formatPrice(booking.totalPrice, booking.currency)}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[booking.status]}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {booking.status === "pending" && (
                    <div className="flex justify-end gap-1">
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => updateStatus(booking.id, "confirmed")}
                      >
                        Confirm
                      </Button>
                      <Button
                        size="xs"
                        variant="destructive"
                        onClick={() => updateStatus(booking.id, "cancelled")}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                  {booking.status === "confirmed" && (
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={() => updateStatus(booking.id, "completed")}
                    >
                      Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
