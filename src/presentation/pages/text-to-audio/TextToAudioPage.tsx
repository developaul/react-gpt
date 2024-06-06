import { useState } from "react";

import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  GptMessageAudio,
} from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const displaimer = `## Que audio quieres generar hoy?
  * Todo el audio generado por AI
`;

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: "audio";
}

type MessageType = TextMessage | AudioMessage;

const voices = [
  { id: "nova", text: "Nova" },
  { id: "alloy", text: "Alloy" },
  { id: "echo", text: "Echo" },
  { id: "fable", text: "Fable" },
  { id: "onyx", text: "Onyx" },
  { id: "shimmer", text: "Shimmer" },
];

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<MessageType[]>([]);

  const handlePostMessage = async (text: string, selectedVoice: string) => {
    setIsLoading(true);

    setMessages((prev) => [...prev, { text, isGpt: false, type: "text" }]);

    const { ok, message, audioUrl } = await textToAudioUseCase(
      text,
      selectedVoice
    );

    console.log("🚀 ~ handlePostMessage ~ audioUrl:", audioUrl);

    setIsLoading(false);

    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: message, isGpt: true, type: "text" },
      ]);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        text: `${selectedVoice} - ${message}`,
        isGpt: true,
        type: "audio",
        audio: audioUrl!,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          {/* Bienvenida */}
          <GptMessage text={displaimer} />

          {messages.map((message, index) =>
            message.isGpt ? (
              message.type === "audio" ? (
                <GptMessageAudio
                  key={index}
                  text={message.text}
                  audio={message.audio}
                />
              ) : (
                <GptMessage key={index} text={message.text} />
              )
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

      <TextMessageBoxSelect
        options={voices}
        onSendMessage={handlePostMessage}
        placeholder="Escribe aqui lo que deseas"
      />
    </div>
  );
};
