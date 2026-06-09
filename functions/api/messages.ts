type KVNamespace = {
  get: (key: string, type?: 'json') => Promise<string | null | unknown>;
  put: (key: string, value: string) => Promise<void>;
};

interface Env {
  MESSAGES: KVNamespace;
}

interface Message {
  id: string;
  text: string;
  emoji: string;
  color: string;
  timestamp: number;
}

const HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export const onRequestOptions: PagesFunction<Env> = async () => {
  return new Response(null, { headers: HEADERS, status: 204 });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const data = await context.env.MESSAGES.get('messages', 'json');
    const messages: Message[] = (data as Message[]) || [];
    return new Response(JSON.stringify(messages), { headers: HEADERS });
  } catch {
    return new Response(JSON.stringify([]), { headers: HEADERS });
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const message = (await context.request.json()) as Message;

    if (!message || !message.text || !message.id) {
      return new Response(JSON.stringify({ error: 'Invalid message' }), {
        status: 400,
        headers: HEADERS,
      });
    }

    if (message.text.length > 200) {
      return new Response(JSON.stringify({ error: 'Message too long' }), {
        status: 400,
        headers: HEADERS,
      });
    }

    const data = await context.env.MESSAGES.get('messages', 'json');
    const messages: Message[] = (data as Message[]) || [];
    messages.unshift(message);

    if (messages.length > 500) {
      messages.length = 500;
    }

    await context.env.MESSAGES.put('messages', JSON.stringify(messages));

    return new Response(JSON.stringify({ success: true }), { headers: HEADERS });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: HEADERS,
    });
  }
};

export const onRequestDelete: PagesFunction<Env> = async (context) => {
  try {
    const { id } = (await context.request.json()) as { id: string };

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing id' }), {
        status: 400,
        headers: HEADERS,
      });
    }

    const data = await context.env.MESSAGES.get('messages', 'json');
    const messages: Message[] = (data as Message[]) || [];
    const updated = messages.filter((m) => m.id !== id);

    await context.env.MESSAGES.put('messages', JSON.stringify(updated));

    return new Response(JSON.stringify({ success: true }), { headers: HEADERS });
  } catch {
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: HEADERS,
    });
  }
};
