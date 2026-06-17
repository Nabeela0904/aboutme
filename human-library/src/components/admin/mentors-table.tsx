import Image from "next/image";
import { Star } from "lucide-react";
import { getAllMentors, getMentorAvatarUrl, formatPrice } from "@/lib/mentors";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MentorsTable() {
  const mentors = getAllMentors();

  return (
    <Card id="mentors">
      <CardHeader>
        <CardTitle>Mentor directory</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mentor</TableHead>
              <TableHead>Categories</TableHead>
              <TableHead>Rate</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Sessions</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mentors.map((mentor) => (
              <TableRow key={mentor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Image
                      src={getMentorAvatarUrl(mentor.avatarSeed)}
                      alt={mentor.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium">{mentor.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {mentor.title} at {mentor.company}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {mentor.categories.slice(0, 2).map((cat) => (
                      <Badge key={cat} variant="outline" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{formatPrice(mentor.hourlyRate, mentor.currency)}/hr</TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                    {mentor.rating}
                  </span>
                </TableCell>
                <TableCell>{mentor.sessionCount}</TableCell>
                <TableCell>
                  {mentor.featured ? (
                    <Badge>Featured</Badge>
                  ) : (
                    <Badge variant="secondary">Active</Badge>
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
