import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { Check, X } from "lucide-react";

export const ReviewsManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: reviews } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").update({ is_approved: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast({ title: "Arvostelu hyväksytty!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast({ title: "Arvostelu poistettu!" });
    },
  });

  return (
    <div className="space-y-4">
      {reviews?.map((r) => (
        <div key={r.id} className="p-4 border rounded space-y-2">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {r.image_url && (
                <img src={r.image_url} alt="Arvostelu" className="w-full h-48 object-cover rounded mb-2" />
              )}
              <h4 className="font-semibold">{r.author_name}</h4>
              <p className="text-sm">{r.content}</p>
              <p className="text-xs text-muted-foreground">⭐ {r.rating}/5</p>
            </div>
            <div className="flex gap-2 flex-shrink-0">{!r.is_approved && <Button size="sm" onClick={() => approveMutation.mutate(r.id)}><Check size={16} /></Button>}<Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(r.id)}><X size={16} /></Button></div>
          </div>
        </div>
      ))}
    </div>
  );
};