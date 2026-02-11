"use client";

import { useRouter } from "next/navigation";

import Icon from "@/components/icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download01Icon } from "@hugeicons/core-free-icons";
import { MockUp } from "@/zod/schema";
import { useMockUp } from "@/store/mockup";
import { useTools } from "@/store/tools";
import { useResource } from "@/store/resource";
import { AppCarousel } from "@/components/app-carousel";

export default function PreviewCard({ mockup }: { mockup: MockUp }) {
  const { addUserMockUp } = useMockUp();
  const { setActiveTool } = useTools();
  const { setSelectedResource, clearSelectedResource } = useResource();

  const router = useRouter();

  const handleEdit = () => {
    // Generate unique ID
    const uniqueId = crypto.randomUUID();

    // Create mockup with the unique ID, preserving component references and names
    const mockupWithId: MockUp = {
      ...mockup,
      id: uniqueId,
    };

    // Add to store
    addUserMockUp(mockupWithId);

    // Set Active Tool to Background by default
    setActiveTool("background");

    // Check if mockup has resources and set defaults, otherwise clear all resources
    if (mockup.resources) {
      // Set default resources based on mockup's resources
      setSelectedResource("background", "background-0");
      setSelectedResource("font", "font-0");
      setSelectedResource("border", "border-0");
      setSelectedResource("shadow", "shadow-0");
    } else {
      // Clear all resources if mockup has no resources
      clearSelectedResource("background");
      clearSelectedResource("font");
      clearSelectedResource("border");
      clearSelectedResource("shadow");
    }

    // Redirect to sandbox page
    router.push(`/sandbox/${uniqueId}`);
  };

  return (
    <Card className="p-0 gap-3 bg-sidebar">
      <CardHeader className="pt-3 flex items-center justify-between">
        <CardTitle>{mockup.name}</CardTitle>
        <CardAction className="flex gap-1">
          <Button onClick={handleEdit}>Edit</Button>

          <Button size="icon" variant={"ghost"}>
            <Icon icon={Download01Icon} />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="bg-background h-80 p-3">
        <AppCarousel slides={mockup.slides} />
      </CardContent>
    </Card>
  );
}
