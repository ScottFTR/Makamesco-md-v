const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "MAKAMESCO-MD<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEhYWVlLRFVWbG9tdlhGN1A2RmhCbVRxOGQ3T1lDRU90cjZWYlB2L1Izdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTnBOSTdqVnYxS1VnVllXTThMaEpuQ2h0WXArYWNvYi9FeDUvMzVQK1NuUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQkxCekFydWxvMGhSTzlmRURTSGxKMkEzNWNQclRiRGd4UThldjdMQkZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTY1VsbkNIemJyc2N5RE9JR0l1Y3hDN05oK1Mrc1htcGQveVMrVXFnRTJZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjRPTW1xdlJHSyszNTZIZkp5dmRLaXF3Ync3WVF1MTRBUllIS09UVGNmR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFrb3BqcXZFdXArTFZtMVZrVlFsajRqZmZhd0xvNlRBei9tY1FCY1ZHekk9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMlA1V3RLRVRVaEFDaXlWQ3dpTFlyS0Mrand1Q05iOHF3eXlycG9ZaDgxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaVdpRWZqZEw5U2s3cGZUcW9PbVl5eGhEL0l0cVN5SnArZm95U015NDNWWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklFcjVSWXpaT1J1NGxrbGJWdFpZanBYbEkvbHZHbG9GZWxaUWVEdnpOeHlDRS9HU2x1RDFpZU1iSEFTcEtRZ2RVa1JLSkRtcHV0WEZxMG04dmZmVmh3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE4LCJhZHZTZWNyZXRLZXkiOiJ3Y1hnNXdMY2x6NHZsT1RvWFhGaC80RlNHMlZwMnExNEc1RXdEc1ZhZTl3PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTYyOTMwODE1NEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMkEwQkNEOTI4QThBMjZCODRGMzdEMThCMTE4MEU2RCJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxMzk2NzUxfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2MjkzMDgxNTRAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNjJCMTA5RDQ3ODk0MzE0Qzc2QjdFMDk2ODhCNzkyMkIifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTM5Njc1Mn1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiOF9mSV9iU19SbDI0MVR4S19BTWlOQSIsInBob25lSWQiOiIxYWQ1YjkzMi00NDdmLTQyNmEtYTFkMi04OWY4NzI0MGM3ZGUiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVDZUWmRvTmdUOUMwNXAvakt2bHlXY2FPbmlJPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9MS1A2SFY4L1picUJENnpWY2dFYzAzN25wcz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJGUkVERVpSQSIsIm1lIjp7ImlkIjoiMjU1NjI5MzA4MTU0OjExQHMud2hhdHNhcHAubmV0IiwibGlkIjoiMTI2MDM2NDUyODk2ODY0OjExQGxpZCIsIm5hbWUiOiJBbGx5IFNjb3R0IDMifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tIZThyc0NFUGZpa01NR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFmTTc3OEd3U1BPVWxFWnZnelZFVDRaS3dUVFRVRGtJUmltWkZzVWdJajg9IiwiYWNjb3VudFNpZ25hdHVyZSI6Im1yM3ZvSnJkK2RRT3c0M2pLTDQrd2NRZXhqUHM0NnRGWitOWWxESkpOa2J0b0UxbnlMbXM0Z3NuT1R5SXdWLzlGTGdkWllBVFI4alYxenFsS3c2TEJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ2KzUydjduclpIQlEyUzFqcjhZVEw1bXQ2R2c3dWNkdklSc3JaQWJFcFdISWtkNjJITm9DR3ZFdlFDd08xdWhaTzhMYzVZSTFxSW9RVURrMUxjMEJoZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTYyOTMwODE1NDoxMUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhbnpPKy9Cc0VqemxKUkdiNE0xUkUrR1NzRTAwMUE1Q0VZcG1SYkZJQ0kvIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJRFE9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NTEzOTY3NDIsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT1FSIn0=",
  PREFIX: process.env.PREFIX || ".",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === "true" : true,
  AUTO_LIKE: process.env.AUTO_LIKE !== undefined ? process.env.AUTO_LIKE === "true" : true,
  AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY !== undefined ? process.env.AUTO_STATUS_REPLY === "true" : false,
  STATUS_READ_MSG: process.env.STATUS_READ_MSG || "",
  ANTI_DELETE: process.env.ANTI_DELETE !== undefined ? process.env.ANTI_DELETE === "true" : false,
  ANTI_DELETE_PATH: process.env.ANTI_DELETE_PATH || "inbox",
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === "true" : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === "true" : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === "true" : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === "true" : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === "true" : true,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === "true" : false,
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === "true" : false,
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === "true" : false,
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === "true" : false,
  MODE: process.env.MODE || "public",
  BOT_NAME: process.env.BOT_NAME || "Makamesco-MD",
  MENU_IMAGE: process.env.MENU_IMAGE || "https://files.catbox.moe/sigghy.jpg'/",
  DESCRIPTION: process.env.DESCRIPTION || "Savage WhatsApp Bot by Toxic-Master",
  OWNER_NAME: process.env.OWNER_NAME || "Marcas",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "254769995625",
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
  GEMINI_KEY: process.env.GEMINI_KEY || "AIzaSyCUPaxfIdZawsKZKqCqJcC-GWiQPCXKTDc",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === "true" : false,
};

module.exports = config;
