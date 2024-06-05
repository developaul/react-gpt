import { useState } from "react";

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptOrthographyMessage,
} from "../../components";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const handlePostMessage = async (text: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false }]);

    const { ok, errors, message, userScore } = await orthographyUseCase(text);

    setIsLoading(false);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la corrección", isGpt: false },
      ]);

      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        text: message,
        isGpt: true,
        info: {
          userScore,
          errors,
          message,
        },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text="Hola, puedes escribir tu texto en español, y te ayudo con las correcciones" />

          {messages.map((message, index) =>
            message.isGpt ? (
              <GptOrthographyMessage key={index} {...message.info!} />
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

      {/* <TextMessageBoxFile
        onSendMessage={handlePostMessage}
        placeholder="Escribe aqui lo que deseas"
        disabledCorrections
      /> */}

      {/* <TextMessageBoxSelect
        onSendMessage={handlePostMessage}
        placeholder="Escribe aqui lo que deseas"
        options={[{ id: '1', text: "Option 1" }, { id: '2', text: "Option 2" }]}
        disabledCorrections
      /> */}
    </div>
  );
};
