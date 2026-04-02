import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminInquiries = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: inquiries, isLoading } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("inquiries").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] }),
  });

  const deleteInquiry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("inquiries").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inquiries"] });
      toast({ title: "Inquiry deleted" });
    },
  });

  const unreadCount = inquiries?.filter((i) => !i.is_read).length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Inquiries
          {unreadCount > 0 && <Badge variant="destructive">{unreadCount} new</Badge>}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Status</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Interest</TableHead>
                  <TableHead>Message</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {inquiries?.map((inq) => (
                  <TableRow key={inq.id} className={!inq.is_read ? "bg-accent/5" : ""}>
                    <TableCell>
                      <Badge variant={inq.is_read ? "secondary" : "default"}>
                        {inq.is_read ? "Read" : "New"}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{inq.name}</TableCell>
                    <TableCell>{inq.organization}</TableCell>
                    <TableCell>{inq.email}</TableCell>
                    <TableCell>{inq.phone}</TableCell>
                    <TableCell>{inq.interest}</TableCell>
                    <TableCell className="max-w-xs truncate">{inq.message}</TableCell>
                    <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                      {inq.created_at ? new Date(inq.created_at).toLocaleDateString() : ""}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {!inq.is_read && (
                          <Button variant="ghost" size="sm" onClick={() => markRead.mutate(inq.id)}>
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="sm" onClick={() => deleteInquiry.mutate(inq.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {!inquiries?.length && (
                  <TableRow><TableCell colSpan={9} className="text-center text-muted-foreground py-8">No inquiries yet</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdminInquiries;
