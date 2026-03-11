"use client";

import PreviewHeader from "./preview-header";

import Footer from "../../../components/footer";
import PreviewMockUp from "@/features/preview/components/preview-mockup";
import { useMUp } from "@/store/mUp";

export default function PreviewView() {
  const { tempMockUp } = useMUp();

  return (
    <div className="flex flex-col h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <PreviewHeader />

      <div className="flex-1 p-2">
        <PreviewMockUp mockup={tempMockUp} />
      </div>

      <Footer />
    </div>
  );
}
