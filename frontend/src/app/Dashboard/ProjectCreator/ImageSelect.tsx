import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Upload } from "lucide-react";

const ImageSelect = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <ImageIcon size={64} />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Image select</DialogTitle>
          </DialogHeader>
          <button className="flex flex-col justify-center items-center gap-4 py-32 outline-black outline rounded-md ">
            <Upload size={32} />
            <Label>Upload image</Label>
          </button>
          <DialogFooter>Maximum size of file is 32KB</DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageSelect;
