import sql from "../../../connect/connection";
import {
  MessageBase,
  MessageDto,
  UpdateMessageDto,
  MessageIdDtoBase,
  MessageResponse,
} from "../../types/MessagesTypes";

export const messageRepository = {
  async getMessages({ userId, contactId }: MessageBase) {
    const response: MessageResponse[] = await sql`
    SELECT *
    FROM messages
    WHERE (sender_id = ${userId} AND receiver_id = ${contactId})
       OR (sender_id = ${contactId} AND receiver_id = ${userId})
    ORDER BY sent_at;

  `;

    return response;
  },
  async getOneMessage({ userId, contactId }: MessageBase) {
    const response: MessageResponse[] = await sql`
    SELECT *
    FROM messages
    WHERE (sender_id = ${userId} AND receiver_id = ${contactId})
       OR (sender_id = ${contactId} AND receiver_id = ${userId})
    ORDER BY sent_at DESC
    LIMIT 1;
  `;

    return response[0];
  },

  async findOneMessage({ userId, contactId, messageId }: MessageIdDtoBase) {
    const response = await sql`
    SELECT *
    FROM messages
    WHERE id = ${messageId}  AND sender_id = ${userId} AND receiver_id = ${contactId}
  `;

    return response[0];
  },

  async findMessages({ userId, contactId }: MessageBase) {
    const response = await sql`
    SELECT *
    FROM messages
    WHERE sender_id = ${userId} AND receiver_id = ${contactId}
  `;

    return response;
  },

  async sendMessages({ userId, contactId, contentType, content }: MessageDto) {
    const response =
      await sql`INSERT INTO  messages (sender_id,receiver_id,content_type,content) VALUES (${userId}, ${contactId}, ${contentType}, ${content}) RETURNING *
      `;

    return response[0];
  },
  async deleteMessages({ userId, contactId, messageId }: MessageIdDtoBase) {
    const response =
      await sql`DELETE FROM messages WHERE id = ${messageId} AND sender_id = ${userId} AND receiver_id = ${contactId}`;

    return response;
  },
  async deleteAllMessages({ userId, contactId }: MessageBase) {
    const response = await sql`
    DELETE FROM messages 
    WHERE 
      (sender_id = ${userId} AND receiver_id = ${contactId}) 
      OR 
      (sender_id = ${contactId} AND receiver_id = ${userId})
  `;

    return response;
  },
  async updateMessages({
    userId,
    contactId,
    messageId,
    content,
    contentType,
  }: UpdateMessageDto) {
    const response =
      await sql`UPDATE messages   SET content = ${content}, content_type = ${contentType}  WHERE id = ${messageId} AND sender_id = ${userId} AND receiver_id = ${contactId}
      RETURNING *`;

    return response;
  },
  async sendImage({ userId, contactId, contentType, content }: MessageDto) {
    const response =
      await sql`INSERT INTO  messages (sender_id,receiver_id,content_type,content) VALUES (${userId}, ${contactId}, ${contentType}, ${content}) RETURNING *
    `;

    return response[0];
  },
  async sendVoice({ userId, contactId, contentType, content }: MessageDto) {
    const response =
      await sql`INSERT INTO  messages (sender_id,receiver_id,content_type,content) VALUES (${userId}, ${contactId}, ${contentType}, ${content}) RETURNING *
    `;

    return response[0];
  },
};
