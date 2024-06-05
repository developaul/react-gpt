import { useState } from "react";

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";

import { prosConsUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const { ok, content } = await prosConsUseCase(text);

    setIsLoading(false);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo dar un punto de vista", isGpt: true },
      ]);

      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        text: content,
        isGpt: true,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Puedes escribir lo que sea que quieras que compare y te de mis puntos de vista" />

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
