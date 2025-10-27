import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Trash2 } from "lucide-react";

export const MessagesManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast({ title: "Merkitty luetuksi!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("contact_messages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast({ title: "Viesti poistettu!" });
    },
  });

  return (
    <div className="space-y-4">
      {messages?.map((m) => (
        <div key={m.id} className={`p-4 border rounded ${!m.is_read ? 'bg-muted/50' : ''}`}>
          <div className="flex items-start justify-between mb-2">
            <div><h4 className="font-semibold">{m.name}</h4><p className="text-sm text-muted-foreground">{m.email}</p></div>
            <div className="flex gap-2">{!m.is_read && <Button size="sm" variant="outline" onClick={() => markReadMutation.mutate(m.id)}><Mail size={16} /></Button>}<Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(m.id)}><Trash2 size={16} /></Button></div>
          </div>
          <h5 className="font-medium mb-1">{m.subject}</h5>
          <p className="text-sm">{m.message}</p>
        </div>
      ))}
    </div>
  );
};