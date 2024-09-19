"use client";

import React from "react";
import { Button } from "@mui/material";
import { FaCloudUploadAlt } from "react-icons/fa";
import Api from "@/services/config/api";
import { toast } from "react-toastify";

export const UploadFile = () => {
  const [loading, setLoading] = React.useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setLoading(true);
        const response = await Api.post("/transactions", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        toast.success(response.data.message);
      } catch (error) {
        console.error(error)
        toast.error("Erro ao enviar o arquivo");
      } finally {
        setLoading(false);
      }
    }

    e.target.value = "";
  }


  return (
    <Button
      component="label"
      variant="contained"
      tabIndex={-1}
      startIcon={<FaCloudUploadAlt />}
    >
      {loading ? "Processando..." : "Enviar arquivo"}
      <input
        type="file"
        onChange={handleUpload}
        className="hidden"
      />
    </Button>
  );
};
