import {describe,it,expect} from 'vitest';
import {parseRecords,safeLink,pairs} from './analysis';
describe('imports and evidence safeguards',()=>{
 it('reads nested Reddit listings and discards author data',()=>{const p=parseRecords(JSON.stringify([{kind:'Listing',data:{children:[{kind:'t1',data:{id:'a',body:'A sentence with several unique words',created_utc:1700000000,author:'private'}}]}}]),'x.json');expect(p.records).toHaveLength(1);expect(p.records[0]).not.toHaveProperty('author');});
 it('handles quoted multiline CSV and skips invalid dates and duplicate IDs',()=>{const p=parseRecords('id,text,date\na,"hello, world\nnext line",2026-10-20\na,duplicate,2026-10-20\nb,bad,invalid','x.csv');expect(p.records[0].text).toContain('\n');expect(p.skipped).toBe(2);});
 it('rejects unsafe links',()=>{expect(safeLink('javascript:alert(1)')).toBe('');expect(safeLink('https://reddit.com.evil.test/x')).toBe('');expect(safeLink('//evil.test/x')).toBe('');expect(safeLink('/r/test/comments/abc')).toContain('https://www.reddit.com/r/');});
 it('does not equate short slogans with meaningful overlap',()=>{const {records}=parseRecords(JSON.stringify([{id:'a',text:'yes yes',date:'2026-10-20'},{id:'b',text:'yes yes',date:'2026-10-20'}]),'x.json');expect(pairs(records,.3)).toHaveLength(0);});
 it('finds repetition and excludes unrelated material',()=>{const {records}=parseRecords(JSON.stringify(['A library should open every weekend','A library should open every weekend!','Gardens need water during summer months'].map((text,i)=>({id:String(i),text,date:'2026-10-20'}))),'x.json');const found=pairs(records,.65);expect(found).toHaveLength(1);expect(found[0].score).toBe(1);});
 it('rejects empty, malformed and oversized record sets',()=>{expect(()=>parseRecords('[]','x.json')).toThrow();expect(()=>parseRecords('{','x.json')).toThrow();expect(()=>parseRecords(JSON.stringify(Array(2001).fill({})),'x.json')).toThrow('2,000');});
});
