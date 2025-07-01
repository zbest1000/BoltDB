"use strict";(()=>{var e={};e.id=136,e.ids=[136],e.modules={30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},57147:e=>{e.exports=require("fs")},13685:e=>{e.exports=require("http")},95687:e=>{e.exports=require("https")},87561:e=>{e.exports=require("node:fs")},84492:e=>{e.exports=require("node:stream")},72477:e=>{e.exports=require("node:stream/web")},71017:e=>{e.exports=require("path")},85477:e=>{e.exports=require("punycode")},12781:e=>{e.exports=require("stream")},57310:e=>{e.exports=require("url")},73837:e=>{e.exports=require("util")},71267:e=>{e.exports=require("worker_threads")},59796:e=>{e.exports=require("zlib")},26334:(e,t,r)=>{r.r(t),r.d(t,{headerHooks:()=>f,originalPathname:()=>y,patchFetch:()=>v,requestAsyncStorage:()=>m,routeModule:()=>u,serverHooks:()=>g,staticGenerationAsyncStorage:()=>d,staticGenerationBailout:()=>h});var n={};r.r(n),r.d(n,{POST:()=>l});var o=r(95419),a=r(69108),s=r(99678),i=r(78070),c=r(10339),p=r(19631);async function l(e){try{let{requirements:t,application:r,constraints:n,budget:o}=await e.json();if(!t||"string"!=typeof t)return i.Z.json({error:"Requirements are required"},{status:400});let a=await (0,c.HA)({requirements:t,application:r,constraints:n,budget:o}),s=[];for(let e of a.recommendations){let t=await p._.component.findMany({where:{AND:[{OR:[{name:{contains:e.type,mode:"insensitive"}},{category:{contains:e.type,mode:"insensitive"}},{description:{contains:e.type,mode:"insensitive"}}]},e.material?{material:{contains:e.material,mode:"insensitive"}}:{},e.standard?{standard:{contains:e.standard,mode:"insensitive"}}:{},{availability:!0}]},include:{specifications:!0,cadFiles:{select:{id:!0,filename:!0,fileType:!0,format:!0}},images:{where:{isPrimary:!0},select:{id:!0,filename:!0,alt:!0}}},take:3});s.push({recommendation:e,components:t})}return await p._.aiInteraction.create({data:{type:"COMPONENT_RECOMMENDATION",input:JSON.stringify({requirements:t,application:r,constraints:n,budget:o}),output:JSON.stringify(a),model:"gpt-4"}}),i.Z.json({aiRecommendations:a,matchingComponents:s,alternativeOptions:a.alternativeOptions})}catch(e){return console.error("AI Recommendations API error:",e),i.Z.json({error:"Internal server error"},{status:500})}}let u=new o.AppRouteRouteModule({definition:{kind:a.x.APP_ROUTE,page:"/api/ai/recommendations/route",pathname:"/api/ai/recommendations",filename:"route",bundlePath:"app/api/ai/recommendations/route"},resolvedPagePath:"/workspace/src/app/api/ai/recommendations/route.ts",nextConfigOutput:"",userland:n}),{requestAsyncStorage:m,staticGenerationAsyncStorage:d,serverHooks:g,headerHooks:f,staticGenerationBailout:h}=u,y="/api/ai/recommendations/route";function v(){return(0,s.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:d})}},10339:(e,t,r)=>{r.d(t,{HA:()=>i,Z3:()=>s});var n=r(36168);let o=null;function a(){if(!o)throw Error("OpenAI API key not configured. Please set OPENAI_API_KEY environment variable.");return o}process.env.OPENAI_API_KEY&&(o=new n.ZP({apiKey:process.env.OPENAI_API_KEY}));let s=async e=>{let t=`
You are an expert in mechanical engineering and fasteners. 
Enhance this search query for a fastener/component database:

Original Query: "${e.query}"
${e.context?`Context: ${e.context}`:""}
${e.userProfile?.role?`User Role: ${e.userProfile.role}`:""}

Please provide:
1. An enhanced search query that captures the user's intent
2. 3-5 specific search suggestions
3. Relevant filters (material, type, standard, size range, etc.)

Respond in JSON format:
{
  "enhancedQuery": "improved query",
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"],
  "filters": {
    "material": ["steel", "stainless"],
    "type": ["bolt", "screw"],
    "standard": ["ISO", "DIN"]
  }
}
`;try{let e=await a().chat.completions.create({model:"gpt-4",messages:[{role:"user",content:t}],temperature:.3,max_tokens:500}),r=e.choices[0]?.message?.content;if(!r)throw Error("No response from OpenAI");return JSON.parse(r)}catch(t){return console.error("Error enhancing search:",t),{enhancedQuery:e.query,suggestions:[],filters:{}}}},i=async e=>{let t=`
You are an expert mechanical engineer specializing in fasteners and components.
Provide component recommendations based on these requirements:

Requirements: "${e.requirements}"
${e.application?`Application: ${e.application}`:""}
${e.constraints?`Constraints: ${e.constraints.join(", ")}`:""}
${e.budget?`Budget consideration: $${e.budget}`:""}

Please recommend 3-5 specific fastener/component options with:
1. Component type
2. Recommended material
3. Applicable standard (ISO, DIN, ANSI, etc.)
4. Brief reasoning
5. Confidence level (0-1)

Also suggest 2-3 alternative options to consider.

Respond in JSON format:
{
  "recommendations": [
    {
      "type": "hex bolt",
      "material": "stainless steel 316",
      "standard": "ISO 4017",
      "reasoning": "Corrosion resistance for marine application",
      "confidence": 0.9
    }
  ],
  "alternativeOptions": ["option1", "option2"]
}
`;try{let e=await a().chat.completions.create({model:"gpt-4",messages:[{role:"user",content:t}],temperature:.4,max_tokens:800}),r=e.choices[0]?.message?.content;if(!r)throw Error("No response from OpenAI");return JSON.parse(r)}catch(e){return console.error("Error getting recommendations:",e),{recommendations:[],alternativeOptions:[]}}}},19631:(e,t,r)=>{r.d(t,{_:()=>o});let n=require("@prisma/client"),o=globalThis.prisma??new n.PrismaClient({log:["query"],datasources:{db:{url:process.env.DATABASE_URL}}})}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[638,830],()=>r(26334));module.exports=n})();