"use client";

import React, { ChangeEvent, Ref, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import s from "./inputWithCounter.module.scss";
import commonStyles from "../textField.module.scss";
import { InputFile, InputFileProps } from "../../inputFile/inputFile";
import { AttachedFile } from "../../attachedFile/attachedFile";
import TextareaAutosize from "react-textarea-autosize";
import { Label } from "../../label/label";
import { useCombinedRef } from "@/common/customHooks";
import { TextAreaProps } from "@/components/ui/textField/textarea";

type InputWithCounterProps = Omit<TextAreaProps, "errorMessage"> & {
  fileProps?: InputFileProps;
  errorMessage?: (string | undefined)[];
  onDeleteFile?: () => void;
};

export const InputWithCounter = React.forwardRef(
  (props: InputWithCounterProps, ref: Ref<HTMLTextAreaElement>) => {
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const inputFileRef = useRef<HTMLInputElement>(null);
    const {
      label,
      isRequiredField,
      containerProps,
      errorMessage,
      fileProps,
      className,
      onDeleteFile,
      ...restProps
    } = props;
    const isError =
      errorMessage && errorMessage.filter((error) => !!error).length > 0;
    const classNames = className;

    const handleDeleteFile = () => {
      setFile(undefined);
      if (inputFileRef.current) {
        inputFileRef.current.value = "";
      }
      onDeleteFile?.();
    };

    useEffect(() => {
      window.addEventListener("reset", handleDeleteFile);
      return () => window.removeEventListener("reset", handleDeleteFile);
    }, []);

    const errorText = errorMessage?.filter((message) => message).join(". ");
    const underlineMessage = file ? (
      <AttachedFile fileName={file.name} onDeleteClick={handleDeleteFile} />
    ) : (
      "Размер файла не более 5mb"
    );

    const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
      const newContent = event.target.value;
      setContent(newContent);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      const filesFromInput = event.target.files;
      if (filesFromInput) {
        setFile(Array.from(filesFromInput)[0]);
      }
    };

    const finalInputFileRef = useCombinedRef(inputFileRef, fileProps?.ref);

    return (
      <div className={classNames} {...containerProps}>
        <div
          className={clsx(
            commonStyles.inputContainer,
            isError && commonStyles.error,
          )}
        >
          {label && (
            <Label
              text={label}
              isRequiredField={isRequiredField ? isRequiredField : false}
              htmlFor={restProps?.name}
              className={commonStyles.mainLabel}
            />
          )}
          <div className={commonStyles.position}>
            <TextareaAutosize
              ref={ref}
              className={commonStyles.textField}
              id={restProps?.name}
              {...restProps}
              onInput={(event: ChangeEvent<HTMLTextAreaElement>) => {
                handleInput(event);
              }}
            />
            <InputFile
              {...fileProps}
              error={isError}
              onChange={handleChange}
              ref={finalInputFileRef}
            />
          </div>
        </div>
        <div className={clsx(s.underText, isError && s.error)}>
          <div className={s.staticText}>
            <span className={s.contentLength}>{content.length}/500</span>
            <span className={clsx(s.underlineMessage, file && s.hasFile)}>
              {underlineMessage}
            </span>
          </div>
          <div className={s.errorText}>{errorText}</div>
        </div>
      </div>
    );
  },
);

InputWithCounter.displayName = "InputWithCounter";
