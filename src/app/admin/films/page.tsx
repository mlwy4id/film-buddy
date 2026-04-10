"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const FilmsAdminPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Films Management</h1>
            <p className="text-muted-foreground">
              Add new films to the database
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/admin" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Add New Film</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-center py-8">
              Film form coming soon...
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default FilmsAdminPage;
