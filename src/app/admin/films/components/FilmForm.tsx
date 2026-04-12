"use client";

import { useForm } from "react-hook-form";
import { useCreateFilmMutation } from "@/app/admin/films/hooks/useCreateFilmMutation";
import { useQuery } from "@tanstack/react-query";
import { getGenres } from "@/lib/api/film.api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useState, useRef } from "react";

export const FilmForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      synopsis: "",
      airing_status: "airing",
      total_episodes: 1,
      release_date: "",
    },
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const { mutate: createFilm, isPending } = useCreateFilmMutation(reset);
  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const genres = genresData?.data || [];

  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleGenre = (id: string) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("synopsis", data.synopsis);
    formData.append("airing_status", data.airing_status);
    formData.append("total_episodes", String(parseInt(data.total_episodes)));
    formData.append(
      "release_date",
      data.release_date.replace("T", " ") + ":00",
    );

    if (selectedGenres.length > 0) {
      formData.append("genres", selectedGenres.join(","));
    }

    images.forEach((img) => formData.append("images", img));

    createFilm(formData);
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Add New Film</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Film Title *</Label>
            <Input
              id="title"
              placeholder="Enter film title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>
          {/* Synopsis */}
          <div className="space-y-2">
            <Label htmlFor="synopsis">Synopsis *</Label>
            <textarea
              id="synopsis"
              placeholder="Enter film synopsis"
              {...register("synopsis", { required: "Synopsis is required" })}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
            />
            {errors.synopsis && (
              <p className="text-xs text-destructive">
                {errors.synopsis.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Release Date */}
            <div className="space-y-2">
              <Label htmlFor="release_date">Release Date & Time *</Label>
              <Input
                id="release_date"
                type="datetime-local"
                {...register("release_date", {
                  required: "Release date is required",
                })}
              />
              {errors.release_date && (
                <p className="text-xs text-destructive">
                  {errors.release_date.message}
                </p>
              )}
            </div>

            {/* Total Episodes */}
            <div className="space-y-2">
              <Label htmlFor="total_episodes">Total Episodes *</Label>
              <Input
                id="total_episodes"
                type="number"
                min="1"
                {...register("total_episodes", {
                  required: "Total episodes is required",
                })}
              />
              {errors.total_episodes && (
                <p className="text-xs text-destructive">
                  {errors.total_episodes.message}
                </p>
              )}
            </div>
          </div>
          {/* Airing Status */}
          <div className="space-y-2">
            <Label htmlFor="airing_status">Airing Status *</Label>
            <select
              id="airing_status"
              {...register("airing_status")}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="airing">Currently Airing</option>
              <option value="finished_airing">Finished Airing</option>
            </select>
          </div>
          {/* Genres — multi-select via toggle buttons */}
          <div className="space-y-2">
            <Label>Genre</Label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre: any) => {
                const selected = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => toggleGenre(genre.id)}
                    className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-foreground border-input hover:border-primary"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
            {selectedGenres.length === 0 && (
              <p className="text-xs text-muted-foreground">No genre selected</p>
            )}
          </div>
          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="images">Film Image</Label>
            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded"
                  >
                    <span>{img.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="text-destructive"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Film"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
