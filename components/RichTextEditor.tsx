"use client"
import { Editor } from "@tinymce/tinymce-react"

interface RichTextEditorProps {
  value: string
  onChange: (content: string) => void
  readonly?: boolean
}

export function RichTextEditor({ value, onChange, readonly = false }: RichTextEditorProps) {
  return (
    <Editor
      apiKey="bxe7kzaxlaldy3smjap1sb66fat3j9wovfwfxv9i66ou92ol"
      value={value}
      onEditorChange={onChange}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | removeformat | help",
      }}
      disabled={readonly} // Add this as an additional safeguard
    />
  )
}

