"use client";

import { AdminLayout } from "@/components/AdminLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { GenresTable } from "./components/GenresTable";

export default function GenresAdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <Button asChild variant="outline">
          <Link href="/admin" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Genres Management</h1>
            <p className="text-muted-foreground">
              Add, edit, or delete film genres
            </p>
          </div>
        </div>
        <GenresTable />
      </div>
    </AdminLayout>
  );
}
