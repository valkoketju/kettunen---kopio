import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { ImageUpload } from "../ui/image-upload";

export const PortfolioManager = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "taideteokset" as const,
    image_url: "",
  });

  const { data: portfolioItems } = useQuery({
    queryKey: ["portfolio-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (item: typeof newItem) => {
      const { error } = await supabase.from("portfolio_items").insert([item]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-items"] });
      toast({ title: "Portfolio-kohde lisätty!" });
      setNewItem({ title: "", description: "", category: "taideteokset", image_url: "" });
    },
    onError: (error) => {
      toast({ 
        title: "Virhe", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio-items"] });
      toast({ title: "Portfolio-kohde poistettu!" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(newItem);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4 p-6 border rounded-lg bg-card">
        <h3 className="text-xl font-semibold mb-4">Lisää portfolio-kohde</h3>
        
        <div>
          <Label htmlFor="title">Otsikko</Label>
          <Input
            id="title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Kuvaus</Label>
          <Textarea
            id="description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="category">Kategoria</Label>
          <Select
            value={newItem.category}
            onValueChange={(value: any) => setNewItem({ ...newItem, category: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="taideteokset">Taideteokset</SelectItem>
              <SelectItem value="tatuoinnit">Tatuoinnit</SelectItem>
              <SelectItem value="muu">Muu</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="image_url">Kuva</Label>
          <ImageUpload
            currentImage={newItem.image_url}
            onImageUploaded={(url) => setNewItem({ ...newItem, image_url: url })}
          />
        </div>

        <Button type="submit" className="w-full">
          Lisää portfolio-kohde
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Portfolio-kohteet ({portfolioItems?.length || 0})</h3>
        {portfolioItems?.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg bg-card flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-semibold text-lg">{item.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
              <p className="text-xs text-muted-foreground">
                Kategoria: {item.category === "taideteokset" ? "Taideteokset" : item.category === "tatuoinnit" ? "Tatuoinnit" : "Muu"}
              </p>
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="mt-2 w-32 h-32 object-cover rounded" />
              )}
            </div>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(item.id)}
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};