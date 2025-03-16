"use client"; // Next.js 13+ (If using an older version, use dynamic imports in the main file)

import React, { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import Froala Editor to avoid SSR issues
const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

// Import Froala Editor styles
import "froala-editor/js/froala_editor.pkgd.min.js";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/themes/gray.min.css"; // Optional theme

const FroalaEditor = ({ onChange, value }) => {
  return (
    <FroalaEditorComponent
      tag="textarea"
      model={value}
      onModelChange={onChange}
      config={{
        placeholderText: "Edit your profile details...",
        charCounterCount: true,
        toolbarButtons: [
          "bold",
          "italic",
          "underline",
          "formatOL",
          "formatUL",
          "insertLink",
        ],
        theme: "gray", // Optional
      }}
    />
  );
};

export default FroalaEditor;
