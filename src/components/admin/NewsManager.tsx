import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

export const NewsManager = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: news, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("news").insert({ 
        title, 
        content,
        image_url: imageUrl || null,
        is_published: false 
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      setTitle("");
      setContent("");
      setImageUrl("");
      toast({ title: "Uutinen lisätty!" });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, is_published }: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from("news")
        .update({ is_published: !is_published })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "Uutisen tila päivitetty!" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["news"] });
      toast({ title: "Uutinen poistettu!" });
    },
  });

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Lisää uusi uutinen</h3>
        <div className="space-y-4">
          <Input
            placeholder="Otsikko"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Sisältö"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
          />
          <div>
            <Label>Kuva (valinnainen)</Label>
            <ImageUpload
              currentImage={imageUrl}
              onImageUploaded={(url) => setImageUrl(url)}
            />
          </div>
          <Button 
            onClick={() => addMutation.mutate()}
            disabled={!title || !content}
          >
            Lisää uutinen
          </Button>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Olemassa olevat uutiset</h3>
        {isLoading ? (
          <p>Ladataan...</p>
        ) : !news || news.length === 0 ? (
          <p className="text-muted-foreground">Ei uutisia.</p>
        ) : (
          news.map((item: any) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {item.image_url && (
                    <img src={item.image_url} alt={item.title} className="w-full h-48 object-cover rounded mb-3" />
                  )}
                  <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                  <p className="text-muted-foreground mb-3">{item.content}</p>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={item.is_published}
                      onCheckedChange={() => togglePublishMutation.mutate({ id: item.id, is_published: item.is_published })}
                    />
                    <Label className="text-sm">
                      {item.is_published ? "Julkaistu" : "Luonnos"}
                    </Label>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => deleteMutation.mutate(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
