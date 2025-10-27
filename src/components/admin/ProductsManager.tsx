import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Edit } from "lucide-react";
import { ImageUpload } from "../ui/image-upload";

export const ProductsManager = () => {
  const [form, setForm] = useState({ title: "", description: "", price: "", category: "taideteokset", image_url: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase.from("products").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: "Tuote lisätty!" });
      setForm({ title: "", description: "", price: "", category: "taideteokset", image_url: "" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast({ title: "Tuote poistettu!" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate({ ...form, price: parseFloat(form.price) });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg">
        <h3 className="font-semibold text-lg">Lisää uusi tuote</h3>
        <div><Label>Otsikko</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div><Label>Kuvaus</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div><Label>Hinta (€)</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
        <div><Label>Kategoria</Label><Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="taideteokset">Taideteokset</SelectItem><SelectItem value="tatuoinnit">Tatuoinnit</SelectItem><SelectItem value="muu">Muu</SelectItem></SelectContent></Select></div>
        <div><Label>Kuva</Label><ImageUpload currentImage={form.image_url} onImageUploaded={(url) => setForm({ ...form, image_url: url })} /></div>
        <Button type="submit">Lisää tuote</Button>
      </form>
      
      <div className="space-y-2">
        {products?.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 border rounded">
            <div><h4 className="font-semibold">{p.title}</h4><p className="text-sm text-muted-foreground">{p.price} €</p></div>
            <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(p.id)}><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};