"use client";

import React, {
  ChangeEvent,
  ComponentPropsWithoutRef,
  ForwardedRef,
  useEffect,
  useRef,
  useState,
} from "react";
import clsx from "clsx";
import s from "./inputAdditionalFile.module.scss";
import LoadIcon from "@/svg/loadIcon.svg";
import { AttachedFile } from "../attachedFile/attachedFile";
import { Label } from "../label/label";
import { useCombinedRef } from "@/common/customHooks";

export type InputAdditionalFileProps = {
  label: string;
  containerProps?: ComponentPropsWithoutRef<"div">;
  onFilesChange?: (files: File[]) => void;
} & ComponentPropsWithoutRef<"input">;

export const InputAdditionalFile = React.forwardRef(
  (
    props: InputAdditionalFileProps,
    ref: ForwardedRef<HTMLInputElement | null>,
  ) => {
    const { label, containerProps, className, onFilesChange, ...restProps } =
      props;
    const classNames = clsx(s.inputContainer, className);
    const [files, setFiles] = useState<File[]>([]);
    const inputFileRef = useRef<HTMLInputElement>(null);

    const updateInputFiles = (updatedFiles: File[]) => {
      const dataTransfer = new DataTransfer();
      updatedFiles.forEach((file) => dataTransfer.items.add(file));
      if (inputFileRef.current) {
        inputFileRef.current.files = dataTransfer.files;
      }
    };

    const handleDelete = (fileName: string) => {
      const updatedFiles = files.filter((file) => file.name !== fileName);
      setFiles(updatedFiles);
      updateInputFiles(updatedFiles);
      if (onFilesChange) {
        onFilesChange(updatedFiles);
      }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const filesFromInput = event.target.files;
      if (filesFromInput) {
        const newFiles = [...files, ...Array.from(filesFromInput)];
        setFiles(newFiles);
        updateInputFiles(newFiles);
        if (onFilesChange) {
          onFilesChange(newFiles);
        }
      }
    };

    const handleReset = () => {
      setFiles([]);
      updateInputFiles([]);
    };

    useEffect(() => {
      window.addEventListener("reset", handleReset);
      return () => window.removeEventListener("reset", handleReset);
    }, []);

    const attachedFiles = files.map((file) => (
      <AttachedFile
        fileName={file.name}
        onDeleteClick={() => handleDelete(file.name)}
        key={file.name}
      />
    ));

    const finalInputFileRef = useCombinedRef(inputFileRef, ref);

    return (
      <div className={classNames} {...containerProps}>
        <Label text={label} isRequiredField={false} htmlFor={restProps?.name} />
        {attachedFiles.length > 0 && (
          <div className={s.attachedFiles}>{attachedFiles}</div>
        )}
        <label className={s.inputAdditionalFile}>
          <input
            type="file"
            multiple
            id={restProps?.name}
            name={restProps?.name}
            className={s.inputFile}
            {...restProps}
            ref={finalInputFileRef}
            onChange={handleChange}
          />
          <LoadIcon />
          Загрузить
        </label>
      </div>
    );
  },
);

InputAdditionalFile.displayName = "InputAdditionalFile";
