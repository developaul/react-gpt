import { useState } from "react";

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { prosConsUseStreamCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsStreamPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const reader = await prosConsUseStreamCase(text);

    setIsLoading(false);

    if (!reader) {
      return alert("No se pudo generar el reader");
    }

    // Generate last message
    const decoder = new TextDecoder();

    let message = "";

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isGpt: true,
      },
    ]);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });

      message += decodedChunk;

      setMessages((prev) => {
        const newMessages = [...prev];

        newMessages[newMessages.length - 1].text = message;

        return newMessages;
      });
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Que deseas comparar hoy?" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptMessage key={index} text={message.text} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          )}

          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePostMessage}
        placeholder="Escribe aqui lo que deseas"
        disabledCorrections
      />
    </div>
  );
};
