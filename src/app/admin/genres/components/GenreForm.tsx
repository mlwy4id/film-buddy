import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createGenre, updateGenre, deleteGenre } from "@/lib/api/film.api";
import { useToastStore } from "@/store/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { X } from "lucide-react";

interface GenreFormProps {
  onClose: () => void;
  onSuccess?: () => void;
  genreId?: string;
  initialName?: string;
}

export const GenreForm = ({
  onClose,
  onSuccess,
  genreId,
  initialName = "",
}: GenreFormProps) => {
  const { addToast } = useToastStore();
  const queryClient = useQueryClient();
  const [name, setName] = useState(initialName);
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: handleSubmit } = useMutation({
    mutationFn: async () => {
      if (!name.trim()) {
        throw new Error("Genre name is required");
      }

      if (genreId) {
        await updateGenre(genreId, { name });
      } else {
        await createGenre({ name });
      }
    },
    onSuccess: () => {
      addToast(`Genre ${genreId ? "updated" : "created"} successfully!`, "success");
      queryClient.invalidateQueries({ queryKey: ["genres-admin"] });
      onSuccess?.();
      onClose();
    },
    onError: (error: any) => {
      addToast(
        error.response?.data?.message || `Failed to ${genreId ? "update" : "create"} genre`,
        "error"
      );
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <h3 className="font-semibold text-lg">{genreId ? "Edit Genre" : "Add Genre"}</h3>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="genre-name">Genre Name</Label>
            <Input
              id="genre-name"
              placeholder="e.g., Action, Drama, Comedy"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>

          <div className="flex gap-2 justify-end pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={() => handleSubmit()}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : genreId ? "Update" : "Create"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
