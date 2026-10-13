import fs from 'fs';
const out = JSON.parse(fs.readFileSync('axe-results.json','utf8'));
const agg = {};
for (const p of out) for (const v of p.violations) {
  const a = agg[v.id] ||= { id: v.id, impact: v.impact, help: v.help, tags: v.tags, pages: 0, nodes: 0, samples: [] };
  a.pages++; a.nodes += v.nodes;
  if (a.samples.length < 4) a.samples.push({page: p.name, ...v.sample[0]});
}
console.log('=== AXE VIOLATIONS AGGREGATED (16 template pages) ===\n');
Object.values(agg).sort((a,b)=>b.nodes-a.nodes).forEach(a=>{
  console.log(`## ${a.id}  [${a.impact}]  pages:${a.pages}/16  nodes:${a.nodes}`);
  console.log(`   ${a.help}`);
  console.log(`   tags: ${a.tags.join(', ')}`);
  a.samples.forEach(s=>console.log(`   - (${s.page}) ${s.target}\n     ${s.html}\n     => ${s.msg}`));
  console.log();
});
console.log('=== INCOMPLETE (needs manual review) ===');
const inc = {};
for (const p of out) for (const v of p.incomplete) { const a = inc[v.id] ||= {nodes:0,pages:0,help:v.help}; a.nodes+=v.nodes; a.pages++; }
Object.entries(inc).sort((a,b)=>b[1].nodes-a[1].nodes).forEach(([k,v])=>console.log(k.padEnd(28), 'pages:', v.pages, 'nodes:', v.nodes, '|', v.help));
console.log('\n=== PER PAGE ===');
out.forEach(p=>{
  console.log(`\n${p.name} (${p.url})  passes:${p.passes}`);
  p.violations.forEach(v=>console.log('   ', v.id.padEnd(30), String(v.nodes).padStart(4), v.impact));
});
