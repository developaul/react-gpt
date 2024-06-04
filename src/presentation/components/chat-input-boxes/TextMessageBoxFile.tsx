import { FC, FormEvent, useRef, useState } from "react"

interface Props {
  onSendMessage: (message: string) => void
  placeholder?: string
  disabledCorrections?: boolean
  accept?: string
}

export const TextMessageBoxFile: FC<Props> = ({ onSendMessage, placeholder, disabledCorrections = false, accept }) => {
  const [message, setMessage] = useState<string>("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const inputFileRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (!file) return

    setSelectedFile(file)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (message.trim().length === 0) return

    onSendMessage(message)
    setMessage("")
  }

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          onClick={() => inputFileRef.current?.click()}
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
        >
          <i className="fa-solid fa-paperclip text-xl" />
        </button>

        <input ref={inputFileRef} type="file" className="hidden" accept={accept} onChange={handleFileChange} />
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300  pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disabledCorrections ? "on" : "off"}
            autoCorrect={disabledCorrections ? "on" : "off"}
            spellCheck={disabledCorrections ? "true" : "false"}
            onChange={handleChange}
            value={message}
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          type="submit"
          disabled={!selectedFile}
          className="btn-primary"
        >
          {!selectedFile ? <span className="mr-2">Enviar</span> : <span className="mr-2">Enviar {selectedFile.name.substring(0, 10) + "..."}</span>}
          <i className="fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  )
}
