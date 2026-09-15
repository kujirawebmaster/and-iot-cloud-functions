// 認証系ヘッダーをログに出さないためのマスク
const SENSITIVE_HEADER_NAMES = [
  'authorization',
  'ocp-apim-subscription-key',
  'x-assume-merchant',
  'apikey',
  'api-key',
  'x-api-key',
  'sign',
  'cookie',
  'x-auth-token',
];

export const maskHeadersForLog = (headers: Record<string, any>) => {
  const masked: Record<string, any> = {};
  for (const [key, value] of Object.entries(headers ?? {})) {
    masked[key] = SENSITIVE_HEADER_NAMES.includes(key.toLowerCase()) ? '***MASKED***' : value;
  }
  return masked;
};

// axiosエラーのtoJSON()はconfig.headers(認証ヘッダー含む)を丸ごと含むため使用禁止
export const formatErrorForLog = (e: any) => JSON.stringify({
  message: e.message,
  code: e.code,
  status: e.response?.status,
  method: e.config?.method,
  url: e.config?.url,
});

// リクエストbodyには暗証番号(keyvox)や決済情報(payPay)が含まれるため、値は出さずトップレベルのキー名のみ出す
export const summarizeBodyForLog = (body: any) => {
  if (body === null || body === undefined) return String(body);
  if (Array.isArray(body)) return `<array(${body.length})>`;
  if (typeof body !== 'object') return `<${typeof body}>`;
  return JSON.stringify(Object.keys(body));
};
