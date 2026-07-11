import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const STORE_PATH = path.join(__dirname, 'findings.json');
const HTTP_PORT = 4478;

function readFindings() {
  if (!fs.existsSync(STORE_PATH)) return [];
  try {
    return JSON.parse(fs.readFileSync(STORE_PATH, 'utf-8'));
  } catch {
    return [];
  }
}

function writeFindings(findings) {
  fs.writeFileSync(STORE_PATH, JSON.stringify(findings, null, 2));
}

// --- HTTP receiver: the browser toolbar POSTs findings here ---
const httpServer = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/findings') {
    let body = '';
    req.on('data', (chunk) => (body += chunk));
    req.on('end', () => {
      try {
        const incoming = JSON.parse(body);
        const existing = readFindings();
        const withIds = incoming.map((f, i) => ({
          id: existing.length + i + 1,
          status: 'open',
          ...f,
        }));
        writeFindings([...existing, ...withIds]);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true, count: withIds.length }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: String(err) }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end();
});

httpServer.listen(HTTP_PORT, () => {
  console.error(`overlookly-mcp: listening for browser findings on http://localhost:${HTTP_PORT}/findings`);
});

// --- MCP server: agents talk to this over stdio ---
const server = new Server(
  { name: 'overlookly-a11y', version: '0.1.0' },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'list_findings',
      description: 'List all accessibility findings collected from the browser toolbar, optionally filtered by status.',
      inputSchema: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['open', 'resolved', 'wont_fix'], description: 'Filter by status. Omit to list all.' },
        },
      },
    },
    {
      name: 'resolve_finding',
      description: 'Mark a finding as resolved or wont_fix, with an optional rationale note.',
      inputSchema: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'The finding id from list_findings.' },
          status: { type: 'string', enum: ['resolved', 'wont_fix'] },
          note: { type: 'string', description: 'Optional rationale, e.g. why something is wont_fix.' },
        },
        required: ['id', 'status'],
      },
    },
    {
      name: 'clear_findings',
      description: 'Delete all findings with a given status.',
      inputSchema: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['open', 'resolved', 'wont_fix'] },
        },
        required: ['status'],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const findings = readFindings();

  if (name === 'list_findings') {
    const filtered = args?.status ? findings.filter((f) => f.status === args.status) : findings;
    return { content: [{ type: 'text', text: JSON.stringify(filtered, null, 2) }] };
  }

  if (name === 'resolve_finding') {
    const idx = findings.findIndex((f) => f.id === args.id);
    if (idx === -1) {
      return { content: [{ type: 'text', text: `No finding with id ${args.id}` }], isError: true };
    }
    findings[idx].status = args.status;
    if (args.note) findings[idx].note = args.note;
    writeFindings(findings);
    return { content: [{ type: 'text', text: `Finding ${args.id} marked ${args.status}.` }] };
  }

  if (name === 'clear_findings') {
    const remaining = findings.filter((f) => f.status !== args.status);
    writeFindings(remaining);
    return { content: [{ type: 'text', text: `Cleared ${findings.length - remaining.length} finding(s) with status "${args.status}".` }] };
  }

  return { content: [{ type: 'text', text: `Unknown tool: ${name}` }], isError: true };
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error('overlookly-mcp: MCP server ready on stdio');
