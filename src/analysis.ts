import Papa from 'papaparse';
export type RecordItem = { id: string; text: string; subreddit: string; date: string; permalink: string; row: number };
export type Dataset = { records: RecordItem[]; filename: string; sha256: string; importedAt: string; source: string; skipped: number };
export function safeLink(value: unknown): string {
  if (typeof value !== 'string' || !value || value.startsWith('//')) return '';
  try { const u = new URL(value.startsWith('/') ? 'https://www.reddit.com' + value : value);
    return u.protocol === 'https:' && ['reddit.com','www.reddit.com','old.reddit.com'].includes(u.hostname) && !u.username && !u.password ? u.href : '';
  } catch { return ''; }
}
function flatten(value: unknown): unknown[] {
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (!value || typeof value !== 'object') return [];
  const v = value as Record<string, unknown>;
  if (v.kind === 'Listing') return flatten((v.data as {children?: unknown})?.children);
  if (v.data && typeof v.data === 'object') return flatten(v.data);
  return [v];
}
export function parseRecords(raw: string, filename: string): {records: RecordItem[]; skipped: number} {
  let rows: unknown[];
  if (/\.csv$/i.test(filename)) {
    const parsed = Papa.parse(raw, {header:true, skipEmptyLines:'greedy'});
    if (parsed.errors.length) throw new Error('CSV could not be read: ' + parsed.errors[0].message);
    rows = parsed.data;
  } else rows = flatten(JSON.parse(raw));
  if (rows.length > 2000) throw new Error('Limit: 2,000 input records. Split the file locally.');
  const records: RecordItem[] = []; const seen = new Set<string>(); let skipped = 0;
  rows.forEach((input, i) => {
    if (!input || typeof input !== 'object') { skipped++; return; }
    const v = input as Record<string, unknown>;
    const text = [v.title, v.selftext ?? v.body ?? v.text].filter(x => typeof x === 'string' && x.trim()).join('\n');
    const time = v.created_utc ?? v.date ?? v.created_at;
    const d = typeof time === 'number' || (typeof time === 'string' && /^\d+(\.\d+)?$/.test(time)) ? new Date(Number(time)*1000) : new Date(String(time ?? ''));
    const id = String(v.name ?? v.id ?? `row-${i+1}`);
    if (!text.trim() || ['[deleted]','[removed]'].includes(text.trim()) || !Number.isFinite(d.getTime()) || seen.has(id)) { skipped++; return; }
    seen.add(id); records.push({id,text:text.slice(0,20000),subreddit:String(v.subreddit ?? 'unknown').slice(0,200),date:d.toISOString(),permalink:safeLink(v.permalink),row:i+1});
  });
  if (!records.length) throw new Error('No usable records. Each row needs text and a valid date / created_utc.');
  return {records,skipped};
}
export const tokens = (s: string) => new Set((s.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).filter(t=>t.length>2));
export function similarity(a: Set<string>, b: Set<string>): number {
  const intersection = [...a].filter(t=>b.has(t)).length;
  return intersection / (a.size+b.size-intersection || 1);
}
export function pairs(records: RecordItem[], threshold: number) {
  const sets=records.map(r=>tokens(r.text)); const result: {a:RecordItem;b:RecordItem;score:number}[]=[];
  for(let i=0;i<records.length;i++) for(let j=i+1;j<records.length;j++) {
    if(sets[i].size<4 || sets[j].size<4) continue;
    const score=similarity(sets[i],sets[j]); if(score>=threshold) result.push({a:records[i],b:records[j],score});
  }
  return result.sort((a,b)=>b.score-a.score);
}
export async function digest(raw: ArrayBuffer) {
  return [...new Uint8Array(await crypto.subtle.digest('SHA-256',raw))].map(x=>x.toString(16).padStart(2,'0')).join('');
}
