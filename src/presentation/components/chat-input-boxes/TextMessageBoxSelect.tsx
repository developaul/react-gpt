import { FC, FormEvent, useState } from "react"

interface Props {
  onSendMessage: (message: string) => void
  placeholder?: string
  disabledCorrections?: boolean
  options: Option[]
}

interface Option {
  id: string
  text: string
}

export const TextMessageBoxSelect: FC<Props> = ({ onSendMessage, placeholder, disabledCorrections = false, options }) => {
  const [message, setMessage] = useState<string>("")
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value)
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
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            autoFocus
            name="message"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300  pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disabledCorrections ? "on" : "off"}
            autoCorrect={disabledCorrections ? "on" : "off"}
            spellCheck={disabledCorrections ? "true" : "false"}
            onChange={handleChange}
            value={message}
          />

          <select
            value={selectedOption}
            onChange={handleSelect}
            name="select"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
          >
            <option value="" disabled>
              Seleccione
            </option>
            {
              options.map(({ id, text }) => (
                <option key={id} value={id}>
                  {text}
                </option>
              ))
            }
          </select>

        </div>
      </div>
      <div className="ml-4">
        <button
          type="submit"
          className="btn-primary"
        >
          <span className="mr-2">Enviar</span>
          <i className="fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  )
}
